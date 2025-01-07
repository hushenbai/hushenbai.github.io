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

    // 更多事件...
]; 

// 获取项目的最新系数
function getLatestCoefficient(serialnumber) {
    // 检索该项目的所有价格事件
    const artworkEvents = priceEvents.filter(event => event.serialnumber === serialnumber);
    
    if (artworkEvents.length > 0) {
        // 按日期排序获取最新事件
        const latestEvent = artworkEvents.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        return latestEvent.coefficient;
    }
    
    // 如果没有价格事件，返回 null
    return null;
}

// 获取项目的最新状态
function getLatestState(serialnumber) {
    // 检索该项目的所有价格事件
    const artworkEvents = priceEvents.filter(event => event.serialnumber === serialnumber);
    
    if (artworkEvents.length > 0) {
        // 按日期排序获取最新事件
        const latestEvent = artworkEvents.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        return latestEvent.state;
    }
    
    // 如果没有价格事件，返回 null
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
