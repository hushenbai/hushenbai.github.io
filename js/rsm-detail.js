// 全局变量存储当前项目数据
let currentArtwork = null;
let currentGroupId = null;

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
    // 获取URL参数
    const params = new URLSearchParams(window.location.search);
    currentGroupId = params.get('group') || 'group1';
    const serialnumber = params.get('id');

    // 确保数据存在
    if (!groupedArtworks || !groupedArtworks[currentGroupId]) return;

    // 获取当前作品
    currentArtwork = groupedArtworks[currentGroupId].find(p => p.serialnumber === serialnumber);
    
    // 设置导航按钮
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.onclick = () => {
            const artworks = [...groupedArtworks[currentGroupId]].reverse();
            const currentIndex = artworks.findIndex(a => a.serialnumber === currentArtwork.serialnumber);
            const newIndex = currentIndex <= 0 ? artworks.length - 1 : currentIndex - 1;
            const nextArtwork = artworks[newIndex];
            window.location.href = `rsm-detail.html?group=${currentGroupId}&id=${nextArtwork.serialnumber}`;
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            const artworks = [...groupedArtworks[currentGroupId]].reverse();
            const currentIndex = artworks.findIndex(a => a.serialnumber === currentArtwork.serialnumber);
            const newIndex = currentIndex >= artworks.length - 1 ? 0 : currentIndex + 1;
            const nextArtwork = artworks[newIndex];
            window.location.href = `rsm-detail.html?group=${currentGroupId}&id=${nextArtwork.serialnumber}`;
        };
    }

    // 获取当前作品
    currentArtwork = groupedArtworks[currentGroupId].find(p => p.serialnumber === serialnumber);
    console.log('Current artwork:', currentArtwork);
    
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
        img.src = currentArtwork.image;
        
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
        const detailIntro = document.querySelector('.artwork-intro');
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

        // 检查展览数据并处理展览区域显示
        const exhibitsSection = document.querySelector('.exhibits');
        const exhibitsList = document.getElementById('exhibits-list');
        
        if (currentArtwork) {
            const exhibits = getArtworkExhibits(currentArtwork.serialnumber);
            
            // 如果没有展览数据，隐藏整个展览区域
            if (!exhibits || exhibits.length === 0) {
                exhibitsSection.style.display = 'none';
            } else {
                exhibitsSection.style.display = 'block';
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

    // 音频播放器逻辑
    const players = document.querySelectorAll('.audio-player');
    let currentlyPlaying = null;

    // 检查是否存在音频播放器
    if (!players || players.length === 0) return;

    players.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');
        const audio = player.querySelector('audio');
        const remainingTime = player.querySelector('.remaining-time');

        // 检查必要的元素是否都存在
        if (!playBtn || !playIcon || !pauseIcon || !audio || !remainingTime) return;

        // 设置初始进度
        player.style.setProperty('--progress', '0%');

        // 格式化时间显示
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        // 暂停当前播放的音频
        function pauseCurrentlyPlaying() {
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                const previousPlayer = currentlyPlaying.closest('.audio-player');
                const previousPlayIcon = previousPlayer.querySelector('.play-icon');
                const previousPauseIcon = previousPlayer.querySelector('.pause-icon');
                previousPlayIcon.style.display = 'block';
                previousPauseIcon.style.display = 'none';
            }
        }

        // 播放按钮点击事件
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                pauseCurrentlyPlaying();
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                currentlyPlaying = audio;
            } else {
                audio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                currentlyPlaying = null;
            }
        });

        // 更新进度和时间
        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            player.style.setProperty('--progress', `${percent}%`);
            
            // 更新倒计时
            const remaining = audio.duration - audio.currentTime;
            remainingTime.textContent = formatTime(remaining);
        });

        // 音频结束时重置
        audio.addEventListener('ended', () => {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            currentlyPlaying = null;
            player.style.setProperty('--progress', '0%');
        });

        // 加载完成后显示总时长
        audio.addEventListener('loadedmetadata', () => {
            remainingTime.textContent = formatTime(audio.duration);
        });
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
        const introText = document.querySelector('.artwork-intro .intro-text');
        if (introText) {
            introText.innerHTML = currentArtwork.intro[currentLang];
        }
    }
}

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

document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirmButton');
    const submitButton = document.getElementById('submitButton');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector('textarea');

    // 初始状态
    submitButton.disabled = true;
    confirmButton.disabled = false;

    // 确认按钮点击事件
    confirmButton.addEventListener('click', function() {
        submitButton.disabled = false;
        this.disabled = true;
    });

    // 监听输入变化
    function disableSubmit() {
        submitButton.disabled = true;
        confirmButton.disabled = false;
    }

    emailInput.addEventListener('input', disableSubmit);
    messageInput.addEventListener('input', disableSubmit);
});


document.addEventListener('DOMContentLoaded', function() {
    const mathInput = document.getElementById('mathAnswer');
    const submitButton = document.getElementById('submitButton');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.getElementById('messageInput');
    let correctAnswer;

    // 生成随机数学题
    function generateMathQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '-', '×'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        
        let answer;
        switch(operator) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '×': answer = num1 * num2; break;
        }
        
        const question = `${num1} ${operator} ${num2} = ?`;
        mathInput.setAttribute('data-question', question);
        mathInput.placeholder = question;
        return answer;
    }

    // 初始化数学题
    correctAnswer = generateMathQuestion();

    // 检查答案
    mathInput.addEventListener('input', function() {
        if (this.value === '') {
            this.placeholder = mathInput.getAttribute('data-question');
        } else {
            this.placeholder = '';
        }
        const userAnswer = parseInt(this.value);
        submitButton.disabled = userAnswer !== correctAnswer;
    });

    // 在邮箱或内容输入完成后更新数学题
    emailInput.addEventListener('blur', () => {
        if (emailInput.value) {
            submitButton.disabled = true;
            mathInput.value = '';
            correctAnswer = generateMathQuestion();
        }
    });

    messageInput.addEventListener('blur', () => {
        if (messageInput.value) {
            submitButton.disabled = true;
            mathInput.value = '';
            correctAnswer = generateMathQuestion();
        }
    });

    // 当数学题答错时，保持当前题目不变
    mathInput.addEventListener('input', function() {
        const userAnswer = parseInt(this.value);
        submitButton.disabled = userAnswer !== correctAnswer;
    });
});
