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
                        <p2 data-lang="${titleKey}">${translations[currentLang][titleKey]}</p2>
                        <p3 class="year">${project.year}</p3>
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

// 在现有代码基础上添加
document.addEventListener('DOMContentLoaded', () => {
    // 检查当前页面
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
    
    Object.entries(groupedProjects).forEach(([groupId, projects]) => {
        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            // 添加延迟动画
            item.style.animationDelay = `${index * 0.2}s`;  // 每个项目延迟 0.2 秒
            
            item.onclick = () => {
                window.location.href = `detailrsm.html?group=${groupId}&id=${project.serialnumber}`;
            };
            
            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.src = project.image;
            img.alt = project.title['data-lang'];
            
            const info = document.createElement('div');
            info.className = 'gallery-info';
            
            const title = document.createElement('p2');
            title.setAttribute('data-lang', project.title['data-lang']);
            title.textContent = project.title[getCurrentLanguage()] || project.title['data-lang'];
            
            const time = document.createElement('p3');
            time.textContent = project.year;
            
            info.appendChild(title);
            info.appendChild(time);
            item.appendChild(img);
            item.appendChild(info);
            container.appendChild(item);
        });
    });
}

// 更新语言
changeLanguage(currentLang);

// 在页面加载时调用
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('rsm.html')) {
        generateRSMGallery();
    }
});

// 添加滚动监听
let lastScrollTop = 0;
const nav = document.querySelector('.nav-background');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 向下滚动时隐藏
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        nav.classList.add('hidden');
    } 
    // 向上滚动时显示
    else {
        nav.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh';
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    updateLanguage(newLang);
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    updateLanguage(currentLang);
});

document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.querySelector('.detail-container');
    const scrollSpeed = 0.7;
    let lastScrollPosition = window.scrollY;
    let ticking = false;
    
    // 使用 requestAnimationFrame 优化滚动性能
    function updatePosition() {
        detailContainer.style.transform = `translateY(${lastScrollPosition * scrollSpeed}px)`;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        lastScrollPosition = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updatePosition();
            });
            ticking = true;
        }
    }, {
        passive: true  // 提示浏览器这是一个被动事件监听器
    });
});

