// 配置 PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5;

// 获取 Canvas 元素
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

// 加载 PDF
function loadPDF(url) {
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count').textContent = pdfDoc.numPages;
        renderPage(pageNum);
    }).catch(function(error) {
        console.error('PDF 加载错误:', error);
        // 显示错误信息给用户
        document.querySelector('.page-container').innerHTML = `
            <div style="color: white; padding: 20px; text-align: center;">
                <p>PDF 加载失败</p>
                <p>请确保文件路径正确且文件存在</p>
            </div>
        `;
    });
}

function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({scale: scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
            pageRendering = false;
            document.getElementById('page-num').textContent = num;
            
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function prevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
    
    // 添加翻页动画
    const container = document.querySelector('.page-container');
    container.style.transform = 'translateX(-20px)';
    setTimeout(() => {
        container.style.transform = 'translateX(0)';
    }, 300);
}

function nextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
    
    // 添加翻页动画
    const container = document.querySelector('.page-container');
    container.style.transform = 'translateX(20px)';
    setTimeout(() => {
        container.style.transform = 'translateX(0)';
    }, 300);
}

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevPage();
    } else if (e.key === 'ArrowRight') {
        nextPage();
    }
});

// 加载 PDF 文件
document.addEventListener('DOMContentLoaded', () => {
    // 使用相对路径
    loadPDF('assets/invoice.pdf');
}); 