# Ackow's Homepage

这是一个使用原生HTML、CSS和JavaScript构建的个人主页项目。

## 项目结构

```
.
├── index.html                      # 主页
├── assets/                         # 资源文件
│   ├── pages/                          # 页面文件
│   ├── css/                        # 样式文件
│   │   ├── main.css                # 主要样式
│   │   ├── works.css               # 作品展示样式
│   │   ├── tech.css                # 技术栈样式
│   │   └── contact.css             # 联系页面样式
│   │   └── article.css             # 文章页面样式
│   ├── js/                         # JavaScript文件
│   │   ├── main.js                 # 主要脚本
│   │   ├── data/                   # 数据文件
│   │   │   └── works.js            # 作品数据
│   │   └── modules/                # 模块文件
│   │       ├── carousel.js         # 轮播模块
│   │       ├── renderWorks.js      # 文章列表渲染模块
│   │       ├── contactModule.js    # 留言模块
│   │       └── techCloud.js        # 技术栈词云模块
│   ├── icons/                      # 图标文件
│   └── images/                     # 图片资源
│       ├── background_day.jpg      # 日间背景
│       ├── background_night.jpg    # 夜间背景
│       └── works/                  # 作品图片
│       └── article/                # 文章图片
│       └── avatars/                # 头像图片
```

## 特性

- 响应式设计，适配各种屏幕尺寸
- 深色/浅色主题切换
- 中英文语言切换
- 动态作品展示轮播
- 技术栈词云动态展示
- 毛玻璃效果背景

## 构建步骤

1. 克隆项目
```bash
git clone https://github.com/Ackow/Ackow-s-Homepage.git
cd your-repo
```

2. 安装依赖
本项目使用原生技术栈，无需安装依赖。只需要一个静态文件服务器来运行项目。

3. 本地开发
可以使用任何静态文件服务器，例如：

使用 Python：
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

使用 Node.js：
```bash
# 全局安装 http-server
npm install -g http-server
# 运行服务器
http-server
```

4. 访问网站
打开浏览器访问 `http://localhost:8000`

## 部署

### 方法一：GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到仓库
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
3. 在仓库设置中启用 GitHub Pages

### 方法二：静态托管服务

可以使用以下任一服务部署：
- Netlify
- Vercel
- Cloudflare Pages

只需要连接 GitHub 仓库，这些平台会自动部署你的网站。

### 方法三：传统虚拟主机

1. 购买虚拟主机服务
2. 使用 FTP 工具上传所有文件到服务器

## 自定义

### 修改内容

1. 作品展示
编辑 `assets/js/data/works.js` 文件：
```javascript
const worksData = [
    {
        id: 1,
        title: '项目名称',
        description: '项目描述',
        image: '图片路径',
        tags: ['标签1', '标签2']
    },
    // ...
];
```

2. 技术栈
编辑 `assets/js/modules/techCloud.js` 文件：
```javascript
const techData = [
    { text: '技术名称', color: '颜色代码', size: 大小 },
    // ...
];
```

3. 个人信息
编辑相应的 HTML 文件中的内容。

### 修改样式

1. 主题颜色
编辑 `assets/css/main.css` 中的 CSS 变量：
```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #333333;
    // ...
}
```

2. 响应式断点
可以在各个 CSS 文件中修改媒体查询的断点值。

## 注意事项

1. 图片优化
- 压缩图片以提高加载速度
- 使用适当的图片格式（jpg用于照片，png用于图标）
- 考虑添加图片的懒加载

2. 性能优化
- 压缩 CSS 和 JavaScript 文件
- 使用 CDN 加载字体和图标
- 添加适当的缓存策略

3. SEO 优化
- 添加 meta 标签
- 使用语义化 HTML 标签
- 添加 sitemap.xml 和 robots.txt

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License