// 全局变量存储当前项目数据
let currentProject = null;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 从 URL 获取参数
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('group');
    const serialnumber = params.get('id');
    
    // 查找对应的项目数据
    currentProject = groupedProjects[groupId].find(p => p.serialnumber === serialnumber);
    
    if (currentProject) {
        const img = document.getElementById('detailtcm-img');
        const imageWrapper = document.querySelector('.image-wrapper');
        
        // 设置图片加载完成的处理
        img.onload = function() {
            imageWrapper.classList.add('loaded');
            this.classList.add('loaded');
        };
        
        // 设置图片源
        img.src = currentProject.image.replace('/TCM/', '/tcm-big/');
        
        // 更新基本信息
        document.getElementById('detailtcm-serialnumber').textContent = currentProject.serialnumber;
        document.getElementById('detailtcm-size').textContent = currentProject.size;
        document.getElementById('detailtcm-weight').textContent = currentProject.weight;
        document.getElementById('detailtcm-year').textContent = currentProject.year;
        
        // 设置需要翻译的元素
        document.getElementById('detailtcm-title').setAttribute('data-lang', currentProject.title2['data-lang']);
        document.getElementById('detailtcm-media').setAttribute('data-lang', currentProject.media['data-lang']);
        document.getElementById('detailtcm-state').setAttribute('data-lang', currentProject.state['data-lang']);
        
        // 处理展览信息
        const exhibitsList = document.getElementById('exhibits-list');
        if (currentProject.exhibits && exhibitsList) {
            exhibitsList.innerHTML = '';
            
            currentProject.exhibits.forEach((exhibit, index) => {
                const exhibitItem = document.createElement('div');
                exhibitItem.className = 'exhibit-item';
                
                // 创建 new 标签容器（始终创建以保持布局一致）
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
                exhibitCity.appendChild(cityText);
                
                const exhibitName = document.createElement('span');
                exhibitName.className = 'exhibit-name';
                exhibitName.setAttribute('data-lang', exhibit.name['data-lang']);
                
                const exhibitTime = document.createElement('span');
                exhibitTime.className = 'exhibit-time';
                exhibitTime.textContent = exhibit.time;
                
                // 按新顺序添加元素
                exhibitItem.appendChild(newTagContainer);
                exhibitItem.appendChild(exhibitCity);
                exhibitItem.appendChild(exhibitName);
                exhibitItem.appendChild(exhibitTime);
                
                exhibitsList.appendChild(exhibitItem);
            });
        }
        
        // 使用全局语言设置更新内容
        changeLanguage(currentLang);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.image-wrapper');
    
    if (wrapper) {
        let isDragging = false;
        let startX, startY;
        let rotationX = 0, rotationY = 0;
        let lastX = 0, lastY = 0;

        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // 禁用页面滚动
        const preventScroll = (e) => {
            e.preventDefault();
        };

        // 回正动画函数
        const resetPosition = () => {
            wrapper.style.transition = 'transform 1s ease-out';
            wrapper.style.transform = 'translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)';
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.1s ease';
            }, 500);
        };

        if (isMobile) {
            const startDragging = (e) => {
                isDragging = true;
                wrapper.classList.add('dragging');
                wrapper.classList.add('touching');
                wrapper.style.transition = 'transform 0.1s ease';
                const touch = e.touches[0];
                startX = touch.clientX - lastX;
                startY = touch.clientY - lastY;

                // 禁用页面滚动
                document.addEventListener('touchmove', preventScroll, { passive: false });
            };

            const drag = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                
                const touch = e.touches[0];
                rotationY = (touch.clientX - startX) * 0.5;
                rotationX = -(touch.clientY - startY) * 0.5;
                
                // 限制旋转角度
                rotationX = Math.max(-30, Math.min(30, rotationX));
                rotationY = Math.max(-30, Math.min(30, rotationY));
                
                // 合并缩放和旋转变换
                wrapper.style.transform = `translateZ(0) scale(0.9) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                
                lastX = touch.clientX - startX;
                lastY = touch.clientY - startY;
            };

            const stopDragging = () => {
                isDragging = false;
                wrapper.classList.remove('dragging');
                wrapper.classList.remove('touching');
                resetPosition();

                // 恢复页面滚动
                document.removeEventListener('touchmove', preventScroll);
            };

            // 添加触摸事件监听
            wrapper.addEventListener('touchstart', startDragging);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('touchend', stopDragging);
        } else {
            // 桌面端：光标跟随
            document.addEventListener('mousemove', (e) => {
                // 获取页面中心点
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                // 计算光标距离中心点的偏移
                const deltaX = (e.clientX - centerX) / centerX;
                const deltaY = (e.clientY - centerY) / centerY;
                
                // 计算旋转角度（最大20度）
                const rotateY = deltaX * 35;
                const rotateX = -deltaY * 35;
                
                // 应用平滑过渡
                wrapper.style.transition = 'transform 0.8s ease-out';
                wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // 鼠标离开页面时回到原位
            document.addEventListener('mouseleave', resetPosition);
        }

        // 禁用图片拖动
        const img = wrapper.querySelector('img');
        if (img) {
            // 禁止拖拽
            img.addEventListener('dragstart', (e) => e.preventDefault());
            
            // 禁止上下文菜单（右键菜单）
            img.addEventListener('contextmenu', (e) => e.preventDefault());
            
            // 禁止长按菜单
            img.addEventListener('touchstart', (e) => e.preventDefault());
            
            // 禁止复制
            img.addEventListener('copy', (e) => e.preventDefault());
        }
    }
}); 