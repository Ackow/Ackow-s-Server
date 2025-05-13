// 根据当前页面决定是否导入轮播功能
const currentPage = window.location.pathname;
if (currentPage.includes('index.html') || currentPage == '/' || currentPage == '/index.html') {
    // 导入并初始化轮播
    import('./modules/carousel.js').then(module => {
        const { WorksCarousel } = module;
        try {
            const worksSection = document.querySelector('.works-section');
            if (worksSection) {
                worksSection.classList.add('visible');
            }
            
            const carousel = new WorksCarousel();
            console.log('Carousel initialized:', carousel);
        } catch (error) {
            console.error('Error initializing carousel:', error);
        }
    }).catch(error => {
        console.error('Error loading carousel module:', error);
    });

    // 导入并初始化技术栈词云
    import('./modules/techCloud.js').then(module => {
        const { TechCloud } = module;
        try {
            const techCloud = new TechCloud();
            console.log('Tech cloud initialized:', techCloud);
        } catch (error) {
            console.error('Error initializing tech cloud:', error);
        }
    }).catch(error => {
        console.error('Error loading tech cloud module:', error);
    });
}

// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {   
    // console.log(currentPage);
    
    const themeSwitch = document.querySelector('.theme-switch');
    const body = document.body;
    const header = document.querySelector('header');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeSwitch.querySelector('.material-icons-round');
        if (icon) {
            icon.textContent = 'dark_mode';
        }
    }
    
    // 主题切换事件
    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = themeSwitch.querySelector('.material-icons-round');
        if (icon) {
            icon.textContent = isDark ? 'dark_mode' : 'light_mode';
        }
    });
    
    // 语言切换功能
    const languageSwitch = document.querySelector('.language-switch');
    const currentLang = languageSwitch?.querySelector('.current-lang');
    
    // 检查本地存储中的语言设置
    const savedLang = localStorage.getItem('language') || 'zh';
    if (currentLang) {
        currentLang.textContent = savedLang === 'zh' ? '中' : 'En';
    }
    
    // 初始化页面文本
    updatePageText(savedLang);
    
    // 语言切换事件
    if (languageSwitch) {
        languageSwitch.addEventListener('click', () => {
            console.log('Language switch clicked');
            const newLang = currentLang.textContent === '中' ? 'en' : 'zh';
            currentLang.textContent = newLang === 'zh' ? '中' : 'En';
            localStorage.setItem('language', newLang);
            
            // 更新页面文本
            updatePageText(newLang);
        });
    }

    // 监听滚动事件，实现导航栏背景透明度渐变
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = 300; // 最大滚动距离
        const opacity = Math.min(scrollPosition / maxScroll, 1); // 计算透明度
        
        if (body.classList.contains('dark-theme')) {
            // 深色主题
            header.style.backgroundColor = `rgba(40, 40, 40, ${0.4 + opacity * 0.6})`;
        } else {
            // 浅色主题
            header.style.backgroundColor = `rgba(255, 255, 255, ${0.4 + opacity * 0.6})`;
        }
    });

    if (currentPage.includes('works') || currentPage == '/assets/pages/works.html') {
        import('./modules/renderWorks.js').then(module => {
            module.renderWorks();
            // console.log('脚本加载成功')
        }).catch(error => {
            console.error('Failed to load renderWorks:', error);
        });
    }
    // 检查是否为联系页面
    if (currentPage.includes('contact') || currentPage == '/assets/pages/contact.html') {
        import('./modules/contactModule.js').then(module => {
            module.initContact();
            console.log('Contact module initialized');
        }).catch(error => {
            console.error('Error loading contact module:', error);
        });
    }
});

// 更新页面文本
function updatePageText(lang) {
    console.log('Updating page text to:', lang);
    
    const translations = {
        zh: {
            'nav.home': '首页',
            'nav.works': '作品介绍',
            'nav.blog': '博客',
            'nav.contact': '联系',
            'hero.title': 'Ackow',
            'hero.subtitle': '用代码构建未来',
            'works.title': '作品展示',
            'works.headline': '作品介绍',
            'contact.headline': '联系',
            'tech.title': '技术栈',
            'footer.copyright': '© 2025 Ackow. 保留所有权利。',
            'contact.message_title':'留言列表',
            'contact.send_button':'发送',
            'contact.input_placeholder':'请输入留言内容',
        },
        en: {
            'nav.home': 'Home',
            'nav.works': 'Works',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact',
            'hero.title': 'Ackow',
            'hero.subtitle': 'Building Future with Code',
            'works.title': 'Works',
            'works.headline': 'Works Introduction',
            'contact.headline': 'Contact',
            'tech.title': 'Tech Stack',
            'footer.copyright': '© 2025 Ackow. All rights reserved.',
            'contact.message_title':'Message List',
            'contact.send_button':'Send',
            'contact.input_placeholder':'Please enter your message',
        }
    };
    
    // 更新所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'TITLE') {
                document.title = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}