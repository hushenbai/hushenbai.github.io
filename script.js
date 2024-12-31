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
    window.location.href = `Detail.html?${params.toString()}`;
}

// 在现有代码基础上添加
document.addEventListener('DOMContentLoaded', () => {
    // 检查当前页面
    const isDetailPage = window.location.pathname.includes('detail.html');
    const isRSMPage = window.location.pathname.includes('rsm.html');
    
    // 根据页面类型生成不同的卡片
    if (isRSMPage) {
        generateCards('RSM');
    } else {
        generateCards('TCM');
    }
});

// 修改 generateCards 函数以支持不同类型
function generateCards(type) {
    const container = document.querySelector('.grid-container');
    if (!container) return;
    
    // 根据类型选择对应的数据
    const projects = Object.values(groupedProjects).flat();
    
    projects.forEach(project => {
        // 创建卡片的代码保持不变
        // ...
    });
}

function generateRSMGallery() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    const projects = Object.values(groupedProjects).flat();
    
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.className = 'gallery-image';
        img.src = project.image;
        img.alt = project.title['data-lang'];
        
        const info = document.createElement('div');
        info.className = 'gallery-info';
        
        const title = document.createElement('p1');
        title.setAttribute('data-lang', project.title['data-lang']);
        
        const time = document.createElement('p2');
        time.textContent = project.year;
        
        info.appendChild(title);
        info.appendChild(time);
        
        item.appendChild(img);
        item.appendChild(info);
        container.appendChild(item);
    });
    
    // 更新语言
    changeLanguage(currentLang);
}

// 在页面加载时调用
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('rsm.html')) {
        generateRSMGallery();
    }
});


