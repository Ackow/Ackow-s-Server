import { worksData } from '../data/works.js';

export function renderWorks() {
    const section = document.querySelector('.article-list');
    if (!section) return;

    section.innerHTML = ''; // 清空旧内容

    worksData.forEach(work => {
        const article = document.createElement('a');
        article.classList.add('article-link');
        article.href = work.link;

        article.innerHTML = `
            <article class="article-card">
                <div class="article-image">
                    <img src="${work.image}" alt="${work.title}">
                </div>
                <div class="article-content">
                    <h2 class="article-title">${work.title}</h2>
                    <p class="article-text">${work.description}</p>
                    <div class="article-tags">
                        ${work.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
        section.appendChild(article);
    });
}
