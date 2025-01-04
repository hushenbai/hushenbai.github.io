function getProjectCoefficient(serialnumber, date) {
    // 如果提供了日期，获取该日期之前的最新系数
    if (date) {
        const eventsBeforeDate = priceEvents.filter(event => 
            event.serialnumber === serialnumber && 
            new Date(event.date) <= date
        );
        
        if (eventsBeforeDate.length > 0) {
            const latestEvent = eventsBeforeDate.sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            )[0];
            return latestEvent.coefficient;
        }
    }
    
    // 如果没有日期或没有找到事件，从原始数据中获取默认系数
    const allProjects = Object.values(groupedProjects).flat();
    const project = allProjects.find(p => p.serialnumber === serialnumber);
    return project ? project.coefficient : 1;
}