function generateRSMGallery() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    Object.entries(groupedArtworks).forEach(([groupId, artworks]) => {
        // 创建数组副本并倒序
        const reversedArtworks = [...artworks].reverse();
        
        reversedArtworks.forEach((artwork, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            // 添加延迟动画
            item.style.animationDelay = `${index * 0.2}s`;  // 每个项目延迟 0.2 秒
            
            item.onclick = () => {
                window.location.href = `rsm-detail.html?group=${groupId}&id=${artwork.serialnumber}`;
            };
            
            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.src = artwork.image;
            img.alt = artwork.title['data-lang'];
            
            item.appendChild(img);
            container.appendChild(item);
        });
    });
}

// 在页面加载时调用
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('rsm.html')) {
        // 创建观察器监控 RSMGallery 区域
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    generateRSMGallery();
                    // 触发一次后取消观察
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.3 // 当 RSMGallery 区域 30% 可见时触发
        });

        // 开始观察 RSMGallery 区域
        const gallerySection = document.querySelector('.rsm-gallery');
        if (gallerySection) {
            observer.observe(gallerySection);
        }
    }
});

const container = document.querySelector('.scroll-container');

// 显示意愿卡片
function showWilling() {
    const card = document.getElementById('willing');
    const content = card.querySelector('.Willing-card');
    
    // 确保初始状态
    content.style.transform = 'translateY(900px)';
    
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

document.addEventListener('DOMContentLoaded', function() {
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const priceDisplay = document.getElementById('calculated-custprice');
    const coefficient = 100;

    // 计算价格的函数
    function calculatePrice() {
        const width = parseInt(widthInput.value) || 0;
        const height = parseInt(heightInput.value) || 0;
        const price = (width + height) * coefficient;
        priceDisplay.textContent = Math.round(price);
    }

    // 限制输入为整数
    function handleInput(e) {
        let value = e.target.value;
        
        // 移除任何非数字字符
        value = value.replace(/[^\d]/g, '');
        
        // 确保值不为空
        if (value === '') {
            value = '0';
        } else {
            // 移除前导零
            value = parseInt(value).toString();
        }
        
        // 更新输入框的值
        e.target.value = value;
        
        // 计算新价格
        calculatePrice();
    }

    // 添加事件监听器
    widthInput.addEventListener('input', handleInput);
    heightInput.addEventListener('input', handleInput);

    // 初始计算
    calculatePrice();
});

function createArtworkCard(artwork) {
    return `
        <div class="artwork-card" onclick="window.location.href='rsm-detail.html?id=${artwork.serialnumber}'">
            <div class="artwork-image">
                <img src="${artwork.image}" alt="${artwork.title}">
            </div>
        </div>
    `;
}
