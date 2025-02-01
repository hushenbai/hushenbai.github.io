function generateRSMGallery() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;
    
    Object.entries(groupedArtworks).forEach(([groupId, artworks]) => {
        artworks.forEach((artwork, index) => {
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
            
            const info = document.createElement('div');
            info.className = 'gallery-info';
            
            const title = document.createElement('p2');
            const titleKey = artwork.title['data-lang'];
            title.setAttribute('data-lang', titleKey);
            title.innerHTML = translations[getCurrentLanguage()][titleKey] || titleKey;
            
            const time = document.createElement('p3');
            time.textContent = artwork.year;
            
            info.appendChild(title);
            info.appendChild(time);
            item.appendChild(img);
            item.appendChild(info);
            container.appendChild(item);
        });
    });
}

// 在页面加载时调用
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('rsm.html')) {
        generateRSMGallery();
    }
});

document.querySelector('.scroll-container').addEventListener('animationend', function() {
    this.style.animation = 'none';
    this.offsetHeight; // 触发回流
    this.style.animation = 'scroll 60s linear infinite';
});