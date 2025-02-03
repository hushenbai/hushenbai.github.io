// 示例JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    console.log('网页加载完成！');
});


/* 作品卡片 ---------------------------------------------*/
/* 作品卡片 ---------------------------------------------*/

// 生成作品卡片的HTML
function generateArtworkCard(artwork, groupId) {
    const titleKey = artwork.title['data-lang'];
    return `
        <article class="card">
            <div class="card-image" onclick="goToDetail('${groupId}', '${artwork.serialnumber}')">
                <img src="${artwork.image}" alt="${translations[currentLang][titleKey]}">
            </div>
            <div class="card-content">
                <p2 data-lang="${titleKey}">${translations[currentLang][titleKey]}</p2>
                <p3 class="year">${artwork.year}</p3>
            </div>
        </article>
    `;
}

// 生成卡片的函数
function createCards() {
    Object.keys(groupedArtworks).forEach(groupId => {
        const container = document.querySelector(`#${groupId} .container`);
        if (!container) return;
        
        const cardsHTML = groupedArtworks[groupId].map(artwork => {
            return generateArtworkCard(artwork, groupId);
        }).join('');
        
        container.innerHTML = cardsHTML;
    });
}

// 分别监听不同功能的初始化
document.addEventListener('DOMContentLoaded', createCards);

// 在需要使用的页面中
document.addEventListener('DOMContentLoaded', () => {
    // 检查当前页面
    if (!window.location.pathname.includes('rsm.html')) {
        // 只在非 RSM 页面初始化 3D 动画
        const hoverElement = document.querySelector('.hover-animation');
        if (hoverElement && window.animation3D) {
            animation3D.initTypeA(hoverElement);
        }

        const globalElement = document.querySelector('.global-animation');
        if (globalElement && window.animation3D) {
            animation3D.initTypeB(globalElement);
        }
    }
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

// 通用功能函数
function goToDetail(groupId, serialnumber) {
    window.location.href = `detail.html?group=${groupId}&id=${serialnumber}`;
}

// 在现有代码基础上添加
document.addEventListener('DOMContentLoaded', () => {
    // 检查当前页面
    const isRSMPage = window.location.pathname.includes('./rsm/rsm.html');
    
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
    const artworks = Object.values(groupedArtworks).flat();
    
    artworks.forEach(artwork => {
        // 创建卡片的代码保持不变
        // ...
    });
}







