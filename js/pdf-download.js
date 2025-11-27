// PDF下载功能，包含防恶意下载保护
class PDFDownloadManager {
    constructor() {
        this.downloadCount = 0;
        this.lastDownloadTime = 0;
        this.maxDownloadsPerHour = 80; // 每小时最大下载次数
        this.downloadCooldown = 10000; // 下载间隔（毫秒）
        this.downloadHistory = JSON.parse(localStorage.getItem('pdfDownloadHistory') || '[]');
        this.cleanOldHistory();
        
        this.init();
    }

    init() {
        this.createDownloadButton();
        this.bindEvents();
    }

    createDownloadButton() {
        const downloadContainer = document.querySelector('.pdf-download');
        if (!downloadContainer) return;

        downloadContainer.innerHTML = `
            <div class="pdf-download-container">
                <div class="download-info">
                    <h3 data-lang="pdf-title">申白作品集</h3>
                    <p2 data-lang="pdf-description">包含直到2025年6月系列作品</p2>
                </div>
                <button class="download-btn" id="pdfDownloadBtn" data-lang="download-pdf">
                    <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span data-lang="download-text">下载PDF</span>
                </button>
            </div>
        `;
    }

    bindEvents() {
        const downloadBtn = document.getElementById('pdfDownloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDownload();
            });
        }
    }

    handleDownload() {
        const now = Date.now();
        const downloadBtn = document.getElementById('pdfDownloadBtn');

        // 检查下载频率限制
        if (!this.canDownload(now)) {
            return;
        }

        // 检查每小时限制
        if (this.getDownloadsInLastHour() >= this.maxDownloadsPerHour) {
            return;
        }

        // 记录下载
        this.recordDownload(now);

        // 禁用按钮防止重复点击
        downloadBtn.disabled = true;

        // 执行下载
        this.performDownload();
        
        // 1秒后重新启用按钮
        setTimeout(() => {
            downloadBtn.disabled = false;
        }, 1000);
    }

    canDownload(currentTime) {
        return currentTime - this.lastDownloadTime >= this.downloadCooldown;
    }

    getDownloadsInLastHour() {
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        return this.downloadHistory.filter(time => time > oneHourAgo).length;
    }

    recordDownload(timestamp) {
        this.lastDownloadTime = timestamp;
        this.downloadHistory.push(timestamp);
        this.downloadCount++;
        
        // 保存到localStorage
        localStorage.setItem('pdfDownloadHistory', JSON.stringify(this.downloadHistory));
    }

    performDownload() {
        try {
            // 方法1：使用fetch和Blob强制下载（推荐）
            this.downloadWithFetch();
        } catch (error) {
            console.error('下载失败:', error);
            // 方法2：备用下载方法
            this.downloadWithLink();
        }
    }

    async downloadWithFetch() {
        try {
            const response = await fetch('assets/Shenbai_24_06_2025.pdf');
            if (!response.ok) {
                throw new Error('文件不存在');
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Shenbai_24_06_2025.pdf';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 清理URL对象
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Fetch下载失败:', error);
            // 如果fetch失败，尝试传统方法
            this.downloadWithLink();
        }
    }

    downloadWithLink() {
        try {
            // 创建下载链接
            const link = document.createElement('a');
            link.href = 'assets/Shenbai_24_06_2025.pdf';
            link.download = 'Shenbai_24_06_2025.pdf';
            
            // 添加时间戳防止缓存
            link.href += '?t=' + Date.now();
            
            // 设置下载属性，强制下载而不是在浏览器中打开
            link.setAttribute('download', 'Shenbai_24_06_2025.pdf');
            
            // 对于某些浏览器，需要设置正确的MIME类型
            link.setAttribute('type', 'application/pdf');
            
            // 触发下载
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('链接下载失败:', error);
        }
    }

    cleanOldHistory() {
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        this.downloadHistory = this.downloadHistory.filter(time => time > oneDayAgo);
        localStorage.setItem('pdfDownloadHistory', JSON.stringify(this.downloadHistory));
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new PDFDownloadManager();
});

// 每小时清理一次历史记录
setInterval(() => {
    const manager = window.pdfDownloadManager;
    if (manager) {
        manager.cleanOldHistory();
    }
}, 60 * 60 * 1000); 