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
        window.location.href = 'tcm.html';
    }
}

// ===============================
// 页面初始化
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // 从 URL 获取参数
    const params = new URLSearchParams(window.location.search);
    const serialnumber = params.get('id');
    
    // 查找作品所属的组
    let artworkGroup = 'group1';
    for (const [groupKey, artworks] of Object.entries(groupedArtworks)) {
        if (artworks.find(a => a.serialnumber === serialnumber)) {
            artworkGroup = groupKey;
            break;
        }
    }
    
    // 更新 section 的 ID
    const groupSection = document.querySelector('section.group');
    if (artworkGroup === 'group1') {
        groupSection.style.display = 'none';
    } else {
        groupSection.id = artworkGroup;
        groupSection.style.display = 'block';
        
        // 更新组标题
        const groupTitle = groupSection.querySelector('.group-title');
        if (groupTitle) {
            const titleKey = (typeof TCM_GROUP_META !== 'undefined' && TCM_GROUP_META[artworkGroup])
                ? TCM_GROUP_META[artworkGroup].titleKey
                : `tcm-${artworkGroup}`;
            groupTitle.setAttribute('data-lang', titleKey);
            groupTitle.textContent = translations[getCurrentLanguage()][titleKey] || groupTitle.textContent;
        }
        
        // 重新生成卡片
        createDetailCards(artworkGroup);
    }
    
    // 查找对应的项目数据
    currentArtwork = groupedArtworks[artworkGroup].find(p => p.serialnumber === serialnumber);
    
    if (currentArtwork) {
        // 设置页面标题
        document.getElementById('page-title').textContent = 
            (translations[getCurrentLanguage()][currentArtwork.title['data-lang']] || '良药') + '-Shenbai';
        
        const img = document.getElementById('artwork-image');
        const imageWrapper = document.querySelector('.image-wrapper');
        
        // 设置图片加载完成的处理
        img.onload = function() {
            imageWrapper.classList.add('loaded');
            this.classList.add('loaded');
        };
        
        // 设置图片源
        img.src = currentArtwork.image.replace('assets/TCM/', 'assets/TCM-big/');

        // 更新基本信息
        document.getElementById('detail-serialnumber').textContent = currentArtwork.serialnumber;
        document.getElementById('detail-size').textContent = currentArtwork.size;
        document.getElementById('detail-weight').textContent = currentArtwork.weight;
        document.getElementById('detail-year').textContent = currentArtwork.year;
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

        // 获取作品的展览历史
        function getArtworkExhibits(serialnumber) {
            return exhibitEvents
                .filter(event => event.artworks.includes(serialnumber))
                .sort((a, b) => {
                    const timeA = a.time.split('.').join('');
                    const timeB = b.time.split('.').join('');
                    return timeB - timeA;
                });
        }

        // 检查展览数据并处理展览区域显示
        const exhibitsSection = document.querySelector('.exhibits');
        const exhibitsList = document.getElementById('exhibits-list');
        const exhibits = getArtworkExhibits(currentArtwork.serialnumber);
        
        // 如果没有展览数据，隐藏整个展览区域
        if (!exhibits || exhibits.length === 0) {
            exhibitsSection.style.display = 'none';
        } else {
            exhibitsSection.style.display = 'block';
            
            // 现有的展览列表渲染代码
            if (exhibitsList) {
                exhibitsList.innerHTML = '';
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
                    
                    // 创建展览信息元素
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
        }

        // 使用全局语言设置更新内容
        updateLanguage();
    }

    // 初始化 3D 动画
    const hoverElement = document.querySelector('.hover-animation');
    if (hoverElement) {
        animation3D.initTypeA(hoverElement);
    }

    const globalElement = document.querySelector('.global-animation');
    if (globalElement) {
        animation3D.initTypeB(globalElement);
    }
});

// 获取当前作品在数组中的位置
function getCurrentArtworkIndex() {
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('group');
    const serialnumber = params.get('id');
    
    const artworks = groupedArtworks[groupId];
    return artworks.findIndex(artwork => artwork.serialnumber === serialnumber);
}

// 获取上一个或下一个作品的URL
function getNavigationURL(direction) {
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('group');
    const artworks = groupedArtworks[groupId];
    const currentIndex = getCurrentArtworkIndex();
    
    let newIndex;
    if (direction === 'prev') {
        // 如果是第一个作品，跳转到最后一个
        newIndex = currentIndex <= 0 ? artworks.length - 1 : currentIndex - 1;
    } else {
        // 如果是最后一个作品，跳转到第一个
        newIndex = currentIndex >= artworks.length - 1 ? 0 : currentIndex + 1;
    }
    
    return `detail.html?group=${groupId}&id=${artworks[newIndex].serialnumber}`;
}

// 在 DOMContentLoaded 事件中添加导航按钮事件监听
document.addEventListener('DOMContentLoaded', () => {
    // ... 现有的 DOMContentLoaded 代码 ...
    
    // 添加导航按钮事件监听（为所有按钮绑定事件，包括桌面版和移动版）
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');

    // 为所有前一个按钮绑定事件
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = getNavigationURL('prev');
        });
    });

    // 为所有下一个按钮绑定事件
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = getNavigationURL('next');
        });
    });

    // 添加键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            window.location.href = getNavigationURL('prev');
        } else if (e.key === 'ArrowRight') {
            window.location.href = getNavigationURL('next');
        }
    });
});

// 生成作品卡片的HTML
function generateArtworkCard(artwork, groupId) {
    const titleKey = artwork.title['data-lang'];
    const imagePath = artwork.image.replace('assets/TCM/', 'assets/TCM/');
    return `
        <article class="card visible">
            <div class="card-image" onclick="goToDetail('${groupId}', '${artwork.serialnumber}')">
                <img src="${imagePath}" alt="${translations[getCurrentLanguage()][titleKey]}">
            </div>
        </article>
    `;
}

// 生成卡片的函数
function createDetailCards(groupId) {
    const container = document.querySelector(`#${groupId} .container`);
    if (!container) return;
    
    const cardsHTML = groupedArtworks[groupId].map(artwork => {
        return generateArtworkCard(artwork, groupId);
    }).join('');
    
    container.innerHTML = cardsHTML;
}



