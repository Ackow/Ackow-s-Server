const techData = [
    { text: 'Unity', color: '#61DAFB', size: 4 },
    { text: 'C#', color: '#41B883', size: 4 },
    { text: 'JavaScript', color: '#F7DF1E', size: 1 },
    { text: 'C/C++', color: '#3178C6', size: 3.5 },
    { text: 'HTML5', color: '#E34F26', size: 1.6 },
    { text: 'CSS3', color: '#1572B6', size: 1.4 },
    { text: 'Python', color: '#764ABC', size: 2.5 },
    { text: 'Git', color: '#F05032', size: 1.4 },
    { text: 'Java', color: '#007396', size: 1.5 },
    { text: 'Andriod Studio', color: '#F89820', size: 1.3 },
    { text: 'Photoshop', color: '#D00000', size: 3 },
    { text: 'Premiere', color: '#00A98F', size: 1.6 },
    { text: 'Blender', color: '#F7B93E', size: 3 },
    { text: '3D Max', color: '#F7B93E', size: 2 }
];

export class TechCloud {
    constructor() {
        this.container = document.querySelector('.tech-list');
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        this.generateCloud();
        // 添加窗口大小变化监听
        window.addEventListener('resize', () => this.generateCloud());
    }
    
    generateCloud() {
        if (!this.container) return;
        
        // 清空容器
        this.container.innerHTML = '';
        
        // 生成技术标签
        techData.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-text';
            span.textContent = tech.text;
            
            // 随机旋转角度
            const rotation = (Math.random() * 6 - 3); // -3 到 3 度之间
            
            // 设置样式
            span.style.setProperty('--color', tech.color);
            span.style.setProperty('--original-size', tech.size);
            span.style.setProperty('--size', `${tech.size}rem`);
            span.style.setProperty('--weight', tech.size > 2 ? '600' : '400');
            span.style.setProperty('--opacity', tech.size > 2 ? '1' : '0.8');
            span.style.setProperty('--rotate', `${rotation}deg`);
            
            this.container.appendChild(span);
        });
    }
} 