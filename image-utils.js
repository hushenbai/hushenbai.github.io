// 可以创建一个图片工具函数文件
const imageUtils = {
    // 获取图片路径
    getImagePath: (group, filename) => {
        return `./assets/images/${group}/${filename}`;
    },
    
    // 图片预加载
    preloadImages: (images) => {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
};