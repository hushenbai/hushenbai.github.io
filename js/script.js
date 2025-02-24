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
    const isRSMPage = window.location.pathname.includes('./rsm.html');
    
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

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    // 检查是否为移动端
    function isMobile() {
        return window.innerWidth <= 560;
    }
    
    // 获取正确的路径
    function getAboutMePath() {
        return 'aboutme.html';
    }

    // 检测是否是微信浏览器
    function isWechat() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    }

    // 如果在微信浏览器中，替换视频为静态图片
    if (isWechat()) {
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground) {
            videoBackground.innerHTML = `
                <div class="gif-background" style="
                    width: 100%;
                    height: 100%;
                    background-color: #323232;
                    background-image: url('assets/aboutme.gif');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                ">
                <div class="video-overlay"></div>
                </div>
            `;
        }
    } else {
        // 非微信浏览器处理视频自动播放
        const video = document.querySelector('.video-background video');
        if (video) {
            // 设置视频属性
            video.defaultMuted = true;
            video.muted = true;
            video.playsInline = true;
            
            // 尝试播放视频
            const playVideo = function() {
                video.play().catch(function(error) {
                    console.log("视频自动播放失败:", error);
                });
            };

            // 在多个事件中尝试播放
            playVideo();
            video.addEventListener('loadedmetadata', playVideo);
            window.addEventListener('load', playVideo);
            document.addEventListener('click', playVideo, { once: true });
        }
    }

    // 如果是微信浏览器，给 body 添加 wechat 类
    if (isWechat()) {
        document.body.classList.add('wechat');
    }
});

// 控制底部导航栏的显示和隐藏
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    let lastScrollY = window.scrollY;
    let ticking = false;

    // 检查是否接近页面底部
    function isNearBottom() {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = document.documentElement.clientHeight;
        const distanceToBottom = scrollHeight - scrollTop - clientHeight;
        
        return distanceToBottom <= 100; // 距离底部100px以内
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // 如果接近底部，保持隐藏状态
                if (isNearBottom()) {
                    mobileMenu.classList.remove('hidden');
                } else {
                    // 正常的滚动逻辑
                    if (window.scrollY < lastScrollY) {
                        mobileMenu.classList.remove('hidden');
                    } else {
                        const scrollDifference = Math.abs(window.scrollY - lastScrollY);
                        if (scrollDifference >= 800) {
                            mobileMenu.classList.add('hidden');
                            lastScrollY = window.scrollY;
                        }
                    }
                }
                
                // 向上滚动时更新 lastScrollY
                if (window.scrollY < lastScrollY) {
                    lastScrollY = window.scrollY;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
});

// 设置当前页面的导航按钮标识
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        // 移除所有 current-page 类
        button.classList.remove('current-page');
        
        // 获取按钮的链接地址
        const href = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        // 如果当前路径包含按钮的链接地址，添加 current-page 类
        if (currentPath.includes(href)) {
            button.classList.add('current-page');
        }
    });
});







