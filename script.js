// 示例JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    console.log('网页加载完成！');
});

// 生成卡片的函数
function createCards() {
    Object.keys(groupedProjects).forEach(groupId => {
        const container = document.querySelector(`#${groupId} .container`);
        if (!container) return;
        
        const cardsHTML = groupedProjects[groupId].map(project => {
            const titleKey = project.title['data-lang'];
            return `
                <article class="card" onclick="goToDetail('${groupId}', '${project.serialnumber}')">
                    <div class="card-image">
                        <img src="${project.image}" alt="${translations[currentLang][titleKey]}">
                    </div>
                    <div class="card-content">
                        <p1 data-lang="${titleKey}">${translations[currentLang][titleKey]}</p1>
                        <p2 class="year">${project.year}</p2>
                    </div>
                </article>
            `;
        }).join('');
        
        container.innerHTML = cardsHTML;
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    createCards();
});

// 添加滚动监听和动画逻辑
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有卡片
    const cards = document.querySelectorAll('.card');
    
    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟，实现逐个显示效果
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50); // 每个卡片延迟100ms
                
                // 卡片显示后，取消对它的观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 当卡片出现10%时触发
    });

    // 观察所有卡片
    cards.forEach(card => {
        observer.observe(card);
    });
});

// 如果有动态添加的内容，可以创建一个辅助函数
function translateElement(element, key) {
    if (translations[currentLang][key]) {
        element.textContent = translations[currentLang][key];
    }
}

// 使用示例
function addNewContent() {
    const newElement = document.createElement('div');
    newElement.setAttribute('data-lang', 'new-content');
    translateElement(newElement, 'new-content');
    document.body.appendChild(newElement);
}

function goToDetail(groupId, serialnumber) {
    // 将数据存储到 URL 参数中
    const params = new URLSearchParams();
    params.set('group', groupId);
    params.set('id', serialnumber);
    window.location.href = `detail.html?${params.toString()}`;
}



