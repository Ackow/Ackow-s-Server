const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./models/Message');  // 确保你已经创建了这个模型
require('dotenv').config();
const geoip = require('geoip-lite');


const app = express();
const port = process.env.PORT || 3000;
const AVATAR_COUNT = 5;

console.log(process.env.MONGODB_URI);  // 查看是否正确加载了 MONGODB_URI


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('已连接到 MongoDB');
  })
  .catch(err => {
    console.error('连接 MongoDB 失败:', err);
  });

app.use(cors());
app.use(bodyParser.json());

// 获取所有留言
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 }); // 按时间升序排序
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: '获取留言失败' });
    }
});

// 添加留言
app.post('/messages', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: '留言内容不能为空' });
    }

    const avatarIndex = Math.floor(Math.random() * AVATAR_COUNT) + 1;

    // 获取客户端 IP，取第一个有效 IP
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    if (ip.includes(',')) {
        ip = ip.split(',')[0].trim();
    }
    if (ip === '::1' || ip === '127.0.0.1') {
        ip = '123.125.71.38'; // 北京 IP 测试用
    }

    const geo = geoip.lookup(ip);
    let location = '';

    if (geo) {
        const country = geo.country || '';
        const city = geo.city || '';

        if (!country) {
            location = '';
        } else if (country === 'CN') {
            location = city || '中国';
        } else {
            location = city ? `${country}·${city}` : country;
        }
    } else {
        location = '未知位置';
    }

    console.log(location);

    try {
        const newMessage = await Message.create({
            message,
            avatarIndex,
            createdAt: new Date(),
            location // 保存位置信息
        });

        console.log(newMessage);

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: '保存留言失败' });
    }
});


// 删除留言
app.delete('/messages/:id', async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: '未找到该留言' });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: '删除失败' });
    }
});

app.listen(port, () => {
    console.log(`留言板服务器运行在 http://localhost:${port}`);
});
