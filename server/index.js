const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
const DATA_FILE = './messages.json';
const AVATAR_COUNT = 5; // 假设你有5个本地头像

app.use(cors());
app.use(bodyParser.json());

let messages = [];

// 读取本地 JSON 文件（如存在）
if (fs.existsSync(DATA_FILE)) {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        messages = JSON.parse(data);
        console.log('已加载留言数据');
    } catch (err) {
        console.error('读取留言数据失败:', err);
    }
}

// 保存留言数据到 JSON 文件
function saveMessagesToFile() {
    fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), err => {
        if (err) console.error('保存留言数据失败:', err);
    });
}

// 获取所有留言
app.get('/messages', (req, res) => {
    res.json(messages);
});

// 添加留言
app.post('/messages', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: '留言内容不能为空' });
    }

    // 随机分配一个头像编号
    const avatarIndex = Math.floor(Math.random() * AVATAR_COUNT) + 1;

    const newMessage = {
        id: Date.now(),
        message,
        avatarIndex,
        createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    saveMessagesToFile();
    res.status(201).json(newMessage);
});

// 删除留言
app.delete('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = messages.findIndex(msg => msg.id === id);
    if (index === -1) {
        return res.status(404).json({ error: '未找到该留言' });
    }

    messages.splice(index, 1);
    saveMessagesToFile();
    res.sendStatus(204);
});

// 启动服务器
app.listen(port, () => {
    console.log(`留言板服务器运行在 http://localhost:${port}`);
});
