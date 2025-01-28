// 价格变动事件记录
const priceEvents = [

    {
        serialnumber: 'TCMFW18',
        coefficient: 60,
        dealcoefficient: 60,
        state: '2',
        date: '2024-12-23'
    },
    {
        serialnumber: 'TCMFW17',
        coefficient: 60,
        dealcoefficient: 60,
        state: '2',
        date: '2025-01-05'
    },
    {
        serialnumber: 'TCMES4',
        coefficient: 65,
        dealcoefficient: 60,
        state: '1',
        date: '2025-01-06'
    },
    {
        serialnumber: 'all0',
        coefficient: 70,
        date: '2025-01-20'
    },

    // 更多事件...
]; 

// 获取项目的最新系数
function getLatestCoefficient(serialnumber) {
    // 先获取当前状态
    const currentState = getLatestState(serialnumber) || '0';
    
    // 获取所有相关的价格事件
    const artworkEvents = priceEvents.filter(event => {
        // 匹配具体作品的事件
        if (event.serialnumber === serialnumber) return true;
        
        // 匹配全局事件
        if (event.serialnumber === 'all') return true;
        
        // 匹配特定状态的全局事件
        if (event.serialnumber === 'all0' && currentState === '0') return true;
        
        return false;
    });
    
    if (artworkEvents.length > 0) {
        // 按日期排序获取最新事件
        const latestEvent = artworkEvents.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        return latestEvent.coefficient;
    }
    
    return null;
}

// 获取项目的最新状态
function getLatestState(serialnumber) {
    // 获取所有相关的价格事件
    const artworkEvents = priceEvents.filter(event => {
        // 匹配具体作品的事件
        if (event.serialnumber === serialnumber) return true;
        
        // 匹配全局事件
        if (event.serialnumber === 'all') return true;
        
        // 对于状态查询，我们不考虑 all0 事件，因为它依赖于状态
        return false;
    });
    
    if (artworkEvents.length > 0) {
        // 按日期排序获取最新事件
        const latestEvent = artworkEvents.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        return latestEvent.state;
    }
    
    return null;
}

// 更新项目系数（用于 detail 页面）
function updateArtworkCoefficient(artwork) {
    if (!artwork) return;
    
    const latestCoefficient = getLatestCoefficient(artwork.serialnumber);
    if (latestCoefficient !== null) {
        artwork.coefficient = latestCoefficient;
    }
} 
