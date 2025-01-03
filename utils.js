function getProjectCoefficient(serialnumber) {
    // 从 priceEvents 中找到该项目的最新系数
    const projectEvents = priceEvents.filter(event => event.serialnumber === serialnumber);
    
    if (projectEvents.length > 0) {
        // 按日期排序，获取最新的系数
        const latestEvent = projectEvents.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        // 返回最新的系数
        return latestEvent.coefficient;
    }
    
    // 如果没有找到事件，从原始数据中获取默认系数
    const project = allProjects.find(p => p.serialnumber === serialnumber);
    return project ? project.coefficient : 1;
}