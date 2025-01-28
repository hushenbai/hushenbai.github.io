// 3D 转动动画管理器
class Animation3DManager {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 动画类型 A：仅在 hover 时跟随转动
    initTypeA(element, options = {}) {
        if (!element) return;
        
        let wrapper = element;
        const {
            perspective = 1200,    // 透视深度
            scale = 1,            // 缩放比例
            maxRotation = 25      // 最大旋转角度
        } = options;
        
        // 设置透视深度
        wrapper.style.perspective = `${perspective}px`;

        // 回正动画
        const resetPosition = () => {
            wrapper.style.transition = 'transform 2s ease-out';
            wrapper.style.transform = `
                perspective(${perspective}px)
                scale(${scale})
                rotateX(0deg)
                rotateY(0deg)
                translateZ(0)
            `;
        };

        // 移动端处理
        if (this.isMobile) {
            this._initMobileEvents(wrapper, resetPosition);
        } 
        // 桌面端处理
        else {
            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);
                
                const rotateY = deltaX * maxRotation;
                const rotateX = -deltaY * maxRotation;
                
                wrapper.style.transition = 'transform 0.5s ease-out';
                wrapper.style.transform = `
                    perspective(${perspective}px)
                    scale(${scale})
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(0)
                `;
            });

            wrapper.addEventListener('mouseleave', resetPosition);
        }

        this._initCommonEvents(wrapper);
    }

    // 动画类型 B：全局跟随转动
    initTypeB(element, options = {}) {
        if (!element) return;
        
        let wrapper = element;
        const {
            perspective = 3500,
            scale = 1,
            maxRotation = 25,
            translateZ = 0
        } = options;
        
        wrapper.style.perspective = `${perspective}px`;

        // 回正动画
        const resetPosition = () => {
            wrapper.style.transition = 'transform 1s ease-out';
            wrapper.style.transform = `
                perspective(${perspective}px)
                scale(${scale})
                rotateX(0deg)
                rotateY(0deg)
                translateZ(${translateZ}px)
            `;
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.1s ease';
            }, 500);
        };

        // 移动端处理
        if (this.isMobile) {
            this._initMobileEvents(wrapper, resetPosition);
        } 
        // 桌面端处理
        else {
            document.addEventListener('mousemove', (e) => {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                const deltaX = (e.clientX - centerX) / centerX;
                const deltaY = (e.clientY - centerY) / centerY;
                
                const rotateY = deltaX * maxRotation;
                const rotateX = -deltaY * maxRotation;
                
                wrapper.style.transition = 'transform 0.8s ease-out';
                wrapper.style.transform = `
                    perspective(${perspective}px)
                    scale(${scale})
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(0)
                `;
            });

            document.addEventListener('mouseleave', resetPosition);
        }

        this._initCommonEvents(wrapper);
    }

    // 移动端事件处理
    _initMobileEvents(wrapper, resetPosition) {
        let isDragging = false;
        let startX, startY, lastX = 0, lastY = 0;
        let rotationX = 0, rotationY = 0;

        const preventScroll = (e) => e.preventDefault();

        const startDragging = (e) => {
            isDragging = true;
            wrapper.classList.add('dragging', 'touching');
            wrapper.style.transition = 'transform 0.8s ease';
            const touch = e.touches[0];
            startX = touch.clientX - lastX;
            startY = touch.clientY - lastY;
            document.addEventListener('touchmove', preventScroll, { passive: false });
        };

        const drag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            rotationY = (touch.clientX - startX) * 0.5;
            rotationX = -(touch.clientY - startY) * 0.5;
            
            rotationX = Math.max(-25, Math.min(25, rotationX));
            rotationY = Math.max(-25, Math.min(25, rotationY));
            
            wrapper.style.transform = `translateZ(0) scale(0.95) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            
            lastX = touch.clientX - startX;
            lastY = touch.clientY - startY;
        };

        const stopDragging = () => {
            isDragging = false;
            wrapper.classList.remove('dragging', 'touching');
            resetPosition();
            document.removeEventListener('touchmove', preventScroll);
        };

        wrapper.addEventListener('touchstart', startDragging);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', stopDragging);
    }

    // 通用事件处理（禁用拖拽等）
    _initCommonEvents(wrapper) {
        const img = wrapper.querySelector('img');
        if (img) {
            img.addEventListener('dragstart', e => e.preventDefault());
            img.addEventListener('contextmenu', e => e.preventDefault());
            img.addEventListener('touchstart', e => e.preventDefault());
            img.addEventListener('copy', e => e.preventDefault());
        }
    }
}

// 导出单例实例
const animation3D = new Animation3DManager(); 

// 在需要使用的页面中
document.addEventListener('DOMContentLoaded', () => {
    // 类型 A：仅 hover 时跟随
    const hoverElement = document.querySelector('.hover-animation');
    animation3D.initTypeA(hoverElement);

    // 类型 B：全局跟随
    const globalElement = document.querySelector('.global-animation');
    animation3D.initTypeB(globalElement);
});