// ===============================
// 全局变量
// ===============================
let currentArtwork = null;

// 返回上一页函数
function goBack() {
    // 如果有上一页历史记录，则返回上一页
    if (window.history.length > 1 && document.referrer) {
        window.history.back();
    } else {
        // 如果没有上一页，则返回首页
        window.location.href = 'index.html';
    }
}

// ===============================
// 页面初始化
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // 从 URL 获取参数
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('group');
    const serialnumber = params.get('id');
    
    // 查找对应的项目数据
    currentArtwork = groupedArtworks[groupId].find(p => p.serialnumber === serialnumber);
    
    if (currentArtwork) {
        // 设置页面标题
        document.getElementById('page-title').textContent = 
            (translations[getCurrentLanguage()][currentArtwork.title['data-lang']] || '明珠薏苡') + '-Shenbai';
        
        const img = document.getElementById('detail-img');
        const imageWrapper = document.querySelector('.image-wrapper');
        
        // 设置图片加载完成的处理
        img.onload = function() {
            imageWrapper.classList.add('loaded');
            this.classList.add('loaded');
        };
        
        // 设置图片源
        img.src = currentArtwork.image.replace('/TCM/', '/TCM-big/');

        // 获取每个项目的最新系数和最新更新时间
        const latestCoefficient = getLatestCoefficient(currentArtwork.serialnumber);
        if (latestCoefficient !== null) {
            currentArtwork.coefficient = latestCoefficient;  
        }
        const latestState = getLatestState(currentArtwork.serialnumber);
        if (latestState !== null) {
            currentArtwork.state = latestState;
        }
        
        // 更新基本信息
        document.getElementById('detail-serialnumber').textContent = currentArtwork.serialnumber;
        document.getElementById('detail-size').textContent = currentArtwork.size;
        document.getElementById('detail-weight').textContent = currentArtwork.weight;
        document.getElementById('detail-year').textContent = currentArtwork.year;
        // 更新公式中的值
        document.getElementById('detail-width').textContent = currentArtwork.width;
        document.getElementById('detail-height').textContent = currentArtwork.height;
        document.getElementById('detail-coefficient').textContent = currentArtwork.coefficient;
        document.getElementById('detail-coefficient-1').textContent = currentArtwork.coefficient;
        // 设置需要翻译的元素
        const titleElement = document.getElementById('detail-title');
        titleElement.setAttribute('data-lang', currentArtwork.title2['data-lang']);
        titleElement.innerHTML = translations[getCurrentLanguage()][currentArtwork.title2['data-lang']];

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

        // 处理展览信息
        const exhibitsList = document.getElementById('exhibits-list');
        if (currentArtwork.exhibits && exhibitsList) {
            exhibitsList.innerHTML = '';
            
            currentArtwork.exhibits.forEach((exhibit, index) => {
                const exhibitItem = document.createElement('div');
                exhibitItem.className = 'exhibit-item';
                
                // 创建 new 标签容器（始终创建以保持布局一致）
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
                
                // 按新顺序添加元素
                exhibitItem.appendChild(newTagContainer);
                exhibitItem.appendChild(exhibitCity);
                exhibitItem.appendChild(exhibitName);
                exhibitItem.appendChild(exhibitTime);
                exhibitsList.appendChild(exhibitItem);
            });
        }

        // 计算价格：(宽 + 高) × 系数
        const price = (currentArtwork.width + currentArtwork.height) * currentArtwork.coefficient;
        document.getElementById('calculated-price').textContent = Math.round(price);

        // 使用全局语言设置更新内容
        updateLanguage();
        
        updateProductStatus();


    }
});

// ===============================
// 图片转动
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.image-wrapper');
    
    // 图片转动
    if (wrapper) {
        let isDragging = false;
        let startX, startY;
        let rotationX = 0, rotationY = 0;
        let lastX = 0, lastY = 0;

        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // 禁用页面滚动
        const preventScroll = (e) => {
            e.preventDefault();
        };

        // 回正动画函数
        const resetPosition = () => {
            wrapper.style.transition = 'transform 1s ease-out';
            wrapper.style.transform = 'translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)';
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.1s ease';
            }, 500);
        };

        // 移动端
        if (isMobile) {
            const startDragging = (e) => {
                isDragging = true;
                wrapper.classList.add('dragging');
                wrapper.classList.add('touching');
                wrapper.style.transition = 'transform 0.1s ease';
                const touch = e.touches[0];
                startX = touch.clientX - lastX;
                startY = touch.clientY - lastY;

                // 禁用页面滚动
                document.addEventListener('touchmove', preventScroll, { passive: false });
            };

            // 拖动
            const drag = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                
                const touch = e.touches[0];
                rotationY = (touch.clientX - startX) * 0.5;
                rotationX = -(touch.clientY - startY) * 0.5;
                
                // 限制旋转角度
                rotationX = Math.max(-30, Math.min(30, rotationX));
                rotationY = Math.max(-30, Math.min(30, rotationY));
                
                // 合并缩放和旋转变换
                wrapper.style.transform = `translateZ(0) scale(0.9) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                
                lastX = touch.clientX - startX;
                lastY = touch.clientY - startY;
            };

            // 停止拖动
            const stopDragging = () => {
                isDragging = false;
                wrapper.classList.remove('dragging');
                wrapper.classList.remove('touching');
                resetPosition();

                // 恢复页面滚动
                document.removeEventListener('touchmove', preventScroll);
            };

            // 添加触摸事件监听
            wrapper.addEventListener('touchstart', startDragging);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('touchend', stopDragging);
        } else {
            // 桌面端：光标跟随
            document.addEventListener('mousemove', (e) => {
                // 获取页面中心点
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                // 计算光标距离中心点的偏移
                const deltaX = (e.clientX - centerX) / centerX;
                const deltaY = (e.clientY - centerY) / centerY;
                
                // 计算旋转角度（最大20度）
                const rotateY = deltaX * 35;
                const rotateX = -deltaY * 35;
                
                // 应用平滑过渡
                wrapper.style.transition = 'transform 0.8s ease-out';
                wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // 鼠标离开页面时回到原位
            document.addEventListener('mouseleave', resetPosition);
        }

        // 禁用图片拖动
        const img = wrapper.querySelector('img');
        if (img) {
            // 禁止拖拽
            img.addEventListener('dragstart', (e) => e.preventDefault());
            
            // 禁止上下文菜单（右键菜单）
            img.addEventListener('contextmenu', (e) => e.preventDefault());
            
            // 禁止长按菜单
            img.addEventListener('touchstart', (e) => e.preventDefault());
            
            // 禁止复制
            img.addEventListener('copy', (e) => e.preventDefault());
        }
    }
}); 

// ===============================
// 滚动监听
// ===============================
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


// ===============================
// 视差滚动
// ===============================
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

// ===============================
// 处理项目状态显示
// ===============================
function updateProductStatus() {
    // 确保 currentArtwork 存在且有 state 值
    if (currentArtwork && typeof currentArtwork.state !== 'undefined') {
        const state = currentArtwork.state;
        console.log('Current state:', state); // 添加调试日志
        
        // 获取显示元素
        const textElement = document.querySelector('.styled-button');
        const descElement = document.querySelector('.productstate-desc');
        const willingToppart = document.querySelector('.willing-toppart');
        
        if (textElement && descElement) {
            // 根据 state 设置对应的翻译键
            textElement.setAttribute('data-lang', `productstate-${state}`);
            descElement.setAttribute('data-lang', `productstate-button-${state}`);
            
            // 根据 state 控制 willing-toppart 的显示
            if (willingToppart) {
                if ([2, 3, 4].includes(Number(state))) {
                    willingToppart.classList.add('hidden');
                } else {
                    willingToppart.classList.remove('hidden');
                }
            }
            
            // 使用全局语言设置更新内容
            updateLanguage();
        }
    }
}

// 在页面加载完成时更新项目状态
document.addEventListener('DOMContentLoaded', updateProductStatus);

// 页面加载完成后初始化意愿卡片状态
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('willing');
    const content = card.querySelector('.Willing-card');
    
    // 设置初始状态
    content.style.transform = 'translateY(700px)';
});

// 显示意愿卡片
function showWilling() {
    const card = document.getElementById('willing');
    const content = card.querySelector('.Willing-card');
    
    // 确保初始状态
    content.style.transform = 'translateY(700px)';
    
    // 先显示卡片容器
    card.classList.add('show');
    
    // 强制重绘
    void content.offsetWidth;
    
    // 触发动画
    requestAnimationFrame(() => {
        content.style.transform = 'translateY(0)';
    });
    
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
}
// 隐藏意愿卡片
function hideWilling() {
    const card = document.getElementById('willing');
    const content = card.querySelector('.Willing-card');
    
    // 重置动画状态
    content.style.transform = 'translateY(700px)';
    
    // 等待动画完成后隐藏卡片
    setTimeout(() => {
        card.classList.remove('show');
        // 恢复背景滚动
        document.body.style.overflow = '';
    }, 400); // 与 CSS transition 时间匹配
}
// 点击背景关闭卡片
document.getElementById('willing').addEventListener('click', (e) => {
    if (e.target.id === 'willing') {
        hideWilling();
    }
});
// ESC 键关闭卡片
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideWilling();
    }
});


