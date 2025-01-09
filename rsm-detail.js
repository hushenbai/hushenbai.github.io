// 全局变量存储当前项目数据
let currentArtwork = null;

// 返回上一页函数
function goBack() {
    // 直接尝试返回上一页
    window.history.back();
    
    // 如果 300ms 后还在同一个页面，说明返回失败，则跳转到首页
    setTimeout(() => {
        if (window.location.href.includes('rsm-detail.html')) {
            window.location.href = 'index.html';
        }
    }, 300);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 从 URL 获取参数
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('group');
    const serialnumber = params.get('id');
    
    // 查找对应的项目数据
    currentArtwork = groupedArtworks[groupId].find(p => p.serialnumber === serialnumber);
    
    if (currentArtwork) {
        const img = document.getElementById('detail-img');
        const imageWrapper = document.querySelector('.image-wrapper');

        // 设置页面标题
        document.getElementById('page-title').textContent = 
            (translations[getCurrentLanguage()][currentArtwork.title['data-lang']] || '重圆镜') + '-Shenbai';
        
        // 设置图片加载完成的处理
        img.onload = function() {
            imageWrapper.classList.add('loaded');
            this.classList.add('loaded');
        };
        
        // 设置图片源
        img.src = currentArtwork.image.replace('/RSM/', '/RSM-big/');
        
        // 更新基本信息
        document.getElementById('detail-serialnumber').textContent = currentArtwork.serialnumber;
        document.getElementById('detail-size').textContent = currentArtwork.size;
        document.getElementById('detail-weight').textContent = currentArtwork.weight;
        document.getElementById('detail-year').textContent = currentArtwork.year;
        
        // 设置需要翻译的元素
        const titleElement = document.getElementById('detail-title');
        titleElement.setAttribute('data-lang', currentArtwork.title['data-lang']);
        titleElement.innerHTML = translations[getCurrentLanguage()][currentArtwork.title['data-lang']];

        const seriesElement = document.getElementById('detail-series');
        seriesElement.setAttribute('data-lang', currentArtwork.series['data-lang']);
        seriesElement.innerHTML = translations[getCurrentLanguage()][currentArtwork.series['data-lang']];

        const mediaElement = document.getElementById('detail-media');
        mediaElement.setAttribute('data-lang', currentArtwork.media['data-lang']);
        mediaElement.innerHTML = translations[getCurrentLanguage()][currentArtwork.media['data-lang']];
        
        // 格式化尺寸显示
        const sizeElement = document.getElementById('detail-size');
        if (currentArtwork.width && currentArtwork.height && currentArtwork.depth) {
            sizeElement.textContent = `${currentArtwork.width} × ${currentArtwork.height} × ${currentArtwork.depth} cm`;
        }
        
        // 获取作品的展览历史
        function getArtworkExhibits(serialnumber) {
            return exhibitEvents
                .filter(event => event.artworks.includes(serialnumber))
                .sort((a, b) => {
                    // 将时间字符串转换为可比较的格式
                    const timeA = a.time.split('.').join('');
                    const timeB = b.time.split('.').join('');
                    return timeB - timeA; // 降序排列，最新的在前
                });
        }

        // 处理展览信息
        const exhibitsList = document.getElementById('exhibits-list');
        if (exhibitsList) {
            exhibitsList.innerHTML = '';
            
            const exhibits = getArtworkExhibits(currentArtwork.serialnumber);
            
            exhibits.forEach((exhibit, index) => {
                const exhibitItem = document.createElement('div');
                exhibitItem.className = 'exhibit-item';
                
                // 创建 new 标签容器
                const newTagContainer = document.createElement('span');
                newTagContainer.className = 'new-tag-container';
                if (index === 0) {
                    const newTag = document.createElement('span');
                    newTag.className = 'new-tag';
                    newTag.textContent = 'NEW';
                    newTagContainer.appendChild(newTag);
                }
                
                const exhibitCity = document.createElement('span');
                exhibitCity.className = 'exhibit-city';
                const cityText = document.createElement('span');
                cityText.setAttribute('data-lang', exhibit.city['data-lang']);
                cityText.innerHTML = translations[getCurrentLanguage()][exhibit.city['data-lang']];
                exhibitCity.appendChild(cityText);
                
                const exhibitName = document.createElement('span');
                exhibitName.className = 'exhibit-name';
                exhibitName.setAttribute('data-lang', exhibit.name['data-lang']);
                exhibitName.innerHTML = translations[getCurrentLanguage()][exhibit.name['data-lang']];
                
                const exhibitTime = document.createElement('span');
                exhibitTime.className = 'exhibit-time';
                exhibitTime.textContent = exhibit.time;
                
                // 添加所有元素
                exhibitItem.appendChild(newTagContainer);
                exhibitItem.appendChild(exhibitCity);
                exhibitItem.appendChild(exhibitName);
                exhibitItem.appendChild(exhibitTime);
                
                exhibitsList.appendChild(exhibitItem);
            });
        }
    
        // 使用全局语言设置更新内容
        updateLanguage();

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

document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.querySelector('.detail-container');
    const scrollSpeed = 0.4;
    let lastScrollPosition = window.scrollY;
    let ticking = false;
    
    function updatePosition() {
        // 只在桌面端应用滚动效果
        if (window.innerWidth > 800) {
            detailContainer.style.transform = `translateY(${lastScrollPosition * scrollSpeed}px)`;
        }
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
    }, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.querySelector('.detail-container');
    const scrollSpeed = 0.3;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        detailContainer.style.transform = `translateY(${scrollPosition * scrollSpeed}px)`;
    });
});

// 在需要使用的页面中
document.addEventListener('DOMContentLoaded', () => {
    // 类型 A：仅 hover 时跟随
    const hoverElement = document.querySelector('.hover-animation');
    animation3D.initTypeA(hoverElement);

    // 类型 B：全局跟随
    const globalElement = document.querySelector('.global-animation');
    animation3D.initTypeB(globalElement);
});
