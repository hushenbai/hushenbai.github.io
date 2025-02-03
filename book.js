let currentSpread = 0;
let pages = [];
let isMobile = window.innerWidth <= 768;

function initializePages() {
    pages = [];
    
    const paragraphs = bookContent.split('\n\n').filter(p => p.trim());
    console.log('总段落数:', paragraphs.length);
    
    const PARAGRAPHS_PER_PAGE = 4;
    
    for (let i = 0; i < paragraphs.length; i += PARAGRAPHS_PER_PAGE) {
        const pageContent = paragraphs.slice(i, i + PARAGRAPHS_PER_PAGE);
        pages.push(pageContent);
    }
    
    console.log('总页数:', pages.length);
    updatePages();
}

function updatePages() {
    const leftPage = document.querySelector('.page.left');
    const rightPage = document.querySelector('.page.right');
    
    // 移动端和桌面端使用不同的页面索引计算方式
    let currentPageIndex;
    if (isMobile) {
        currentPageIndex = currentSpread; // 移动端每次只显示一页
    } else {
        currentPageIndex = currentSpread * 2; // 桌面端显示两页
    }
    
    // 清空现有内容
    leftPage.innerHTML = '';
    rightPage.innerHTML = '';
    
    // 更新页面内容
    if (pages[currentPageIndex]) {
        leftPage.innerHTML = pages[currentPageIndex].map(p => `<p>${p}</p>`).join('');
    }
    
    // 仅在桌面端更新右页
    if (!isMobile && pages[currentPageIndex + 1]) {
        rightPage.innerHTML = pages[currentPageIndex + 1].map(p => `<p>${p}</p>`).join('');
    }

    // 更新导航按钮状态
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    if (isMobile) {
        prevButton.style.visibility = currentSpread > 0 ? 'visible' : 'hidden';
        nextButton.style.visibility = currentSpread < pages.length - 1 ? 'visible' : 'hidden';
    } else {
        prevButton.style.visibility = currentSpread > 0 ? 'visible' : 'hidden';
        nextButton.style.visibility = (currentSpread * 2 + 2) < pages.length ? 'visible' : 'hidden';
    }
}

function prevPage() {
    if (currentSpread > 0) {
        currentSpread--;
        updatePages();
    }
}

function nextPage() {
    if (isMobile) {
        if (currentSpread < pages.length - 1) {
            currentSpread++;
            updatePages();
        }
    } else {
        if ((currentSpread * 2 + 2) < pages.length) {
            currentSpread++;
            updatePages();
        }
    }
}

// 检测设备类型
function checkDevice() {
    isMobile = window.innerWidth <= 768;
    currentSpread = 0; // 重置页码
    updatePages();
}

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevPage();
    } else if (e.key === 'ArrowRight') {
        nextPage();
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    checkDevice();
    initializePages();
});

// 禁用滚动
document.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// 响应式处理
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        checkDevice();
        initializePages();
    }, 250);
}); 