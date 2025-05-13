import { worksData } from '../data/works.js';

export class WorksCarousel {
    constructor() {
        this.container = document.querySelector('.works-container');
        if (!this.container) return;
        
        this.currentIndex = 0;
        this.displayIndex = 0; // 用于追踪当前显示的作品索引
        this.cardWidth = 350;
        this.gap = 30;
        this.autoPlayInterval = 3000;
        this.isAutoPlaying = true;
        this.visibleCards = 3; // 可见卡片数量
        
        this.init();
    }
    
    init() {
        this.renderCards();
        this.startAutoPlay();
    }
    
    renderCards() {
        if (!this.container) return;
        
        // 清空容器
        this.container.innerHTML = '';
        
        // 创建初始可见卡片
        for (let i = 0; i < this.visibleCards; i++) {
            const workIndex = (this.displayIndex + i) % worksData.length;
            const work = worksData[workIndex];
            const card = this.createCard(work, workIndex);
            this.container.appendChild(card);
        }
        
        // 设置初始状态
        this.updateCarousel();
    }
    
    createCard(work, workIndex) {
        const card = document.createElement('div');
        card.className = 'work-card';
        card.dataset.workIndex = workIndex.toString();
        
        const card2 = document.createElement('div');
        card2.className = 'card2';
        
        card2.innerHTML = `
            <div class="work-image">
                <img src="${work.image}" alt="${work.title}">
            </div>
            <div class="work-info work-text">
                <h3>${work.title}</h3>
                <p>${work.description}</p>
                <div class="work-tags">
                    ${work.tags.map(tag => `<span class="tag work-text">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        card.appendChild(card2);
        return card;
    }
    
    updateCarousel() {
        if (!this.container) return;
        
        const cards = this.container.querySelectorAll('.work-card');
        
        // 计算偏移量
        const offset = -(this.currentIndex * (this.cardWidth + this.gap));
        this.container.style.transform = `translateX(${offset}px)`;
        
        // 当第一个卡片移出视图时，删除它并在末尾添加新卡片
        if (this.currentIndex > 0) {
            const firstCard = cards[0];
            if (firstCard) {
                // 在删除第一个卡片之前，先添加新卡片
                // 更新显示索引
                this.displayIndex = (this.displayIndex + 1) % worksData.length;
                
                // 在末尾添加新卡片
                const nextWorkIndex = (this.displayIndex + this.visibleCards - 1) % worksData.length;
                const newWork = worksData[nextWorkIndex];
                const newCard = this.createCard(newWork, nextWorkIndex);
                this.container.appendChild(newCard);
                
                // 现在删除第一个卡片
                firstCard.remove();
                
                // 重置位置
                this.currentIndex = 0;
                this.container.style.transition = 'none';
                this.container.style.transform = 'translateX(0)';
                
                // 更新激活状态
                setTimeout(() => {
                    this.container.style.transition = 'transform 0.5s ease';
                    // 确保中间卡片始终处于激活状态
                    const updatedCards = this.container.querySelectorAll('.work-card');
                    updatedCards.forEach((card, index) => {
                        card.classList.remove('active');
                        if (index === 1) {
                            card.classList.add('active');
                        }
                    });
                }, 50);
            }
        } else {
            // 正常更新激活状态
            cards.forEach((card, index) => {
                card.classList.remove('active');
                if (index === 1) {
                    card.classList.add('active');
                }
            });
        }
    }
    
    startAutoPlay() {
        if (!this.container) return;
        
        setInterval(() => {
            this.currentIndex++;
            this.updateCarousel();
        }, this.autoPlayInterval);
    }
}