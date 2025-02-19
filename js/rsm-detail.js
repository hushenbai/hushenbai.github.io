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
        const img = document.getElementById('artwork-image');
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

        // 处理 intro 内容
        const detailIntro = document.querySelector('.detail-intro');
        const introText = detailIntro.querySelector('.intro-text');
        
        if (currentArtwork.intro) {
            const language = getSystemLanguage();
            introText.innerHTML = currentArtwork.intro[language];
            detailIntro.style.display = 'block';
        } else {
            detailIntro.style.display = 'none';
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

    // 音频播放器控制
    const audio = document.getElementById('audio-element');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const progressBar = document.querySelector('.progress-bar');
    const progressCurrent = document.querySelector('.progress-current');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');

    // 播放/暂停切换
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // 格式化时间
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // 更新进度条
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressCurrent.style.width = `${progress}%`;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    // 音频加载完成后显示总时长
    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    // 点击进度条跳转
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    // 音频结束时重置播放按钮
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progressCurrent.style.width = '0%';
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
            newIndex = currentIndex <= 0 ? artworks.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex >= artworks.length - 1 ? 0 : currentIndex + 1;
        }
        
        return `rsm-detail.html?group=${groupId}&id=${artworks[newIndex].serialnumber}`;
    }

    // 添加导航按钮事件监听
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            window.location.href = getNavigationURL('prev');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            window.location.href = getNavigationURL('next');
        });
    }

    // 添加键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            window.location.href = getNavigationURL('prev');
        } else if (e.key === 'ArrowRight') {
            window.location.href = getNavigationURL('next');
        }
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

// 获取系统语言
function getSystemLanguage() {
    return document.documentElement.lang || 'zh';
}

// 更新语言时同时更新 intro
function updateLanguage() {
    // 获取当前语言
    const currentLang = getCurrentLanguage();
    
    // 更新所有带有 data-lang 属性的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });

    // 更新 intro 内容（如果存在）
    if (currentArtwork && currentArtwork.intro) {
        const introText = document.querySelector('.detail-intro .intro-text');
        if (introText) {
            introText.innerHTML = currentArtwork.intro[currentLang];
        }
    }
}
