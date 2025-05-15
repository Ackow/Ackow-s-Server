const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // 新增 axios
const Message = require('./models/Message');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const AVATAR_COUNT = 5;

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
    const messages = await Message.find().sort({ createdAt: 1 });
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

  // 获取 IP 地址
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  ip = ip.replace('::ffff:', ''); // IPv4 映射格式

  let location = '';

  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
    const data = response.data;

    if (data.status === 'success') {
      const country = data.country || '';
      const regionName = data.regionName || '';
      const city = data.city || '';

      if (country === '中国') {
        // 中国用户只显示省或市
        location = city || regionName || '中国';
      } else {
        // 外国用户显示 国家·城市
        location = city ? `${country}·${city}` : country;
      }
    } else {
      location = '未知';
    }
  } catch (error) {
    console.error('IP 位置获取失败:', error.message);
    location = '未知';
  }

  try {
    const newMessage = await Message.create({
      message,
      avatarIndex,
      createdAt: new Date(),
      location,
    });

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
