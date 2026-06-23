
document.addEventListener('DOMContentLoaded', function() {
    console.log('网页加载完成！');
});


/* 作品卡片 ---------------------------------------------*/

function generateArtworkCard(artwork, groupId) {
    const titleKey = artwork.title2['data-lang'];
    const titleKeyForName = artwork.title2['data-lang'];
    const artworkName = translations[currentLang][titleKeyForName] || artwork.title2['data-lang'];

    return `
        <article class="card">
            <div class="card-image" onclick="goToDetail('${groupId}', '${artwork.serialnumber}')">
                <img src="${artwork.image}" alt="${translations[currentLang][titleKey]}">
            </div>
            <div class="card-price">
                <span class="card-price-name" data-lang="${titleKeyForName}">${artworkName}</span>
            </div>
        </article>
    `;
}

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

document.addEventListener('DOMContentLoaded', createCards);

document.addEventListener('DOMContentLoaded', () => {
    const hoverElement = document.querySelector('.hover-animation');
    if (hoverElement && window.animation3D) {
        animation3D.initTypeA(hoverElement);
    }

    const globalElement = document.querySelector('.global-animation');
    if (globalElement && window.animation3D) {
        animation3D.initTypeB(globalElement);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});

function goToDetail(groupId, serialnumber) {
    window.location.href = `detail.html?group=${groupId}&id=${serialnumber}`;
}

document.addEventListener('DOMContentLoaded', function() {
    function isWechat() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == "micromessenger";
    }

    if (isWechat()) {
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground) {
            videoBackground.innerHTML = `
                <div class="gif-background" style="
                    width: 100%;
                    height: 100%;
                    background-color: rgb(0, 0, 0);
                    background-image: url('assets/aboutme.gif');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                ">
                </div>
            `;
        }
    } else {
        const video = document.querySelector('.video-background video');
        if (video) {
            video.defaultMuted = true;
            video.muted = true;
            video.playsInline = true;

            const playVideo = function() {
                video.play().catch(function(error) {
                    console.log("视频自动播放失败:", error);
                });
            };

            playVideo();
            video.addEventListener('loadedmetadata', playVideo);
            window.addEventListener('load', playVideo);
            document.addEventListener('click', playVideo, { once: true });
        }
    }

    if (isWechat()) {
        const videoBackground = document.querySelector('.video-background-tcm');
        if (videoBackground) {
            videoBackground.innerHTML = `
                <div class="gif-background-tcm" style="
                    width: 100%;
                    height: 100%;
                    background-color: rgb(0, 0, 0);
                    background-image: url('assets/tcmvideo.gif');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                ">
                </div>
            `;
        }
    } else {
        const video = document.querySelector('.video-background-tcm video');
        if (video) {
            video.defaultMuted = true;
            video.muted = true;
            video.playsInline = true;

            const playVideo = function() {
                video.play().catch(function(error) {
                    console.log("视频自动播放失败:", error);
                });
            };

            playVideo();
            video.addEventListener('loadedmetadata', playVideo);
            window.addEventListener('load', playVideo);
            document.addEventListener('click', playVideo, { once: true });
        }
    }

    if (isWechat()) {
        document.body.classList.add('wechat');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.classList.remove('current-page');

        const onclick = button.getAttribute('onclick');
        if (!onclick) return;

        const href = onclick.match(/'([^']+)'/)[1];
        const isHome = href === '/' || href === 'index.html' || href === 'aboutme.html';
        const onHome = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/aboutme.html');

        if (isHome && onHome) {
            button.classList.add('current-page');
        } else if (!isHome && currentPath.includes(href)) {
            button.classList.add('current-page');
        }
    });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > window.innerHeight) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});
