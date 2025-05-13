const API_URL = 'http://localhost:3000/messages';
const AVATAR_COUNT = 5;

// 根据头像编号生成头像路径
function getAvatarPath(index) {
    return `/assets/images/avatars/${index}.png`;
}

// 创建留言项元素
function createMessageItem(msg) {
    const li = document.createElement('li');
    li.classList.add('message-item');

    const avatarImg = document.createElement('img');
    avatarImg.src = getAvatarPath(msg.avatarIndex);  // 使用返回的头像编号
    avatarImg.alt = 'avatar';
    avatarImg.classList.add('message-avatar');

    const textSpan = document.createElement('span');
    textSpan.textContent = msg.message;

    li.appendChild(avatarImg);
    li.appendChild(textSpan);
    return li;
}

async function setupContact() {
    console.log('Contact module initialization started');

    const messageInput = document.querySelector('.message-input-area');
    const sendButton = document.querySelector('.send-button');
    const messageList = document.querySelector('.message-list-ul');
    const emojiButton = document.querySelector('.emoji-button');
    const emojiPicker = document.querySelector('.emoji-picker');

    if (!messageInput || !sendButton || !messageList || !emojiButton || !emojiPicker) {
        console.error('One or more elements not found');
        return;
    }

    // emoji 选择功能
    emojiButton.addEventListener('click', event => {
        event.stopPropagation();
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });

    emojiPicker.addEventListener('click', event => {
        const target = event.target;
        if (target && target.tagName === 'SPAN') {
            messageInput.value += target.textContent;
            emojiPicker.style.display = 'none';
        }
    });

    document.addEventListener('click', event => {
        if (!emojiButton.contains(event.target) && !emojiPicker.contains(event.target)) {
            emojiPicker.style.display = 'none';
        }
    });

    // 获取留言列表
    try {
        const response = await fetch(API_URL);
        const messages = await response.json();
        messages.forEach(msg => {
            const newLi = createMessageItem(msg);
            messageList.appendChild(newLi);
        });
    } catch (error) {
        console.error('获取留言列表失败:', error);
    }

    // 提交留言
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            const avatarIndex = Math.floor(Math.random() * AVATAR_COUNT) + 1; // 随机头像编号

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message, avatarIndex })
                });

                const newMessage = await response.json();
                const newLi = createMessageItem(newMessage);
                messageList.appendChild(newLi);
                messageInput.value = '';
            } catch (error) {
                console.error('发送留言失败:', error);
            }
        }
    });

    // 回车发送
    messageInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click();
        }
    });
}

// 导出初始化函数
export function initContact() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupContact);
    } else {
        setupContact();
    }
}
