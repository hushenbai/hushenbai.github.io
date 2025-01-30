// 声明全局变量
let latestSorted = [];
let highestSorted = [];

// 添加全局跳转函数
function goToDetail(groupId, serialnumber) {
    window.location.href = `../detail.html?group=group${groupId}&id=${serialnumber}`;
}

// 返回上一页函数
function goBack() {
    // 直接尝试返回上一页
    window.history.back();
    
    // 如果 300ms 后还在同一个页面，说明返回失败，则跳转到首页
    setTimeout(() => {
        if (window.location.href.includes('art-trading.html')) {
            window.location.href = 'index.html';
        }
    }, 300);
}

// 生成列表HTML的函数
function generateArtworkHTML(artwork) {
    // 从 groupedArtworks 中找到项目所属的 group
    let groupId = '1';
    for (const [group, artworks] of Object.entries(groupedArtworks)) {
        if (artworks.some(p => p.serialnumber === artwork.serialnumber)) {
            groupId = group.replace('group', '');
            break;
        }
    }

    return `
        <div class="artwork-item" onclick="window.location.href='../detail.html?group=group${groupId}&id=${artwork.serialnumber}'" style="cursor: pointer;">
            <img class="artwork-image" src="${artwork.image.replace('assets/TCM/', '../assets/TCM-small/')}" alt="${artwork.title['data-lang']}">
            <div class="artwork-info">
                <p2 class="artwork-serialnumber">${artwork.serialnumber}</p2>
                <p2 class="artwork-serialnumber">${artwork.currentCoefficient}</p2>
                <p2 class="artwork-serialnumber">${Math.round(artwork.price)}</p2>
            </div>
        </div>
    `;
}

// 获取所有项目中的最高系数
function getHighestCoefficient() {
    const allCoefficients = Object.values(groupedArtworks)
        .flat()
        .map(artwork => {
            // 获取最新的价格事件系数，如果没有则使用原始系数
            const latestCoeff = getLatestCoefficient(artwork.serialnumber);
            return latestCoeff !== null ? latestCoeff : artwork.coefficient;
        });
    
    return Math.max(...allCoefficients);
}

// 更新页面上的最高系数显示
function updateHighestCoefficient() {
    document.getElementById('highest-coefficient').textContent = getHighestCoefficient();
}

document.addEventListener('DOMContentLoaded', () => {
    // 现有的初始化代码...
    updateHighestCoefficient();
    // 其他现有的初始化代码...
});

document.addEventListener('DOMContentLoaded', () => {

    // 获取所有项目
    const allArtworks = Object.values(groupedArtworks).flat();
    const coefficients = allArtworks.map(artwork => {
        const latestCoeff = getLatestCoefficient(artwork.serialnumber);
        return latestCoeff !== null ? latestCoeff : artwork.coefficient;
    });
    const averageCoefficient = coefficients.reduce((a, b) => a + b, 0) / coefficients.length;
    
    // 计算平均系数（排除系数为0的项目）
    const validCoefficients = allArtworks
        .map(artwork => {
            const latestCoeff = getLatestCoefficient(artwork.serialnumber);
            return latestCoeff !== null ? latestCoeff : artwork.coefficient;
        })
        .filter(coefficient => coefficient > 0);  // 排除系数为0的项目

    // 计算并更新平均值显示
    document.getElementById('average-coefficient').textContent = 
        (validCoefficients.length > 0
            ? (validCoefficients.reduce((sum, coeff) => sum + coeff, 0) / validCoefficients.length)
            : 0
        ).toFixed(1);

    // 获取每个项目的最新系数和最新更新时间
    const artworksWithCoefficient = allArtworks.map(artwork => {
        const latestCoefficient = getLatestCoefficient(artwork.serialnumber);
        return {
            ...artwork,
            currentCoefficient: latestCoefficient !== null ? latestCoefficient : artwork.coefficient,
            price: (artwork.width + artwork.height) * (latestCoefficient !== null ? latestCoefficient : artwork.coefficient),
            lastUpdateDate: priceEvents
                .filter(event => event.serialnumber === artwork.serialnumber)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date || '1970-01-01'
        };
    });

    // 只获取有更新的项目并按最新更新时间排序
    latestSorted = [...artworksWithCoefficient]
        .filter(artwork => {
            // 只保留有价格事件更新的项目
            return priceEvents.some(event => event.serialnumber === artwork.serialnumber);
        })
        .map(artwork => {
            // 找到对应的价格事件，并按日期排序获取最新的
            const latestEvent = priceEvents
                .filter(event => event.serialnumber === artwork.serialnumber)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            
            const dealcoefficient = latestEvent?.dealcoefficient || artwork.currentCoefficient;
            return {
                ...artwork,
                currentCoefficient: dealcoefficient,
                lastUpdateDate: latestEvent?.date || artwork.lastUpdateDate, // 使用价格事件的日期
                price: (artwork.width + artwork.height) * dealcoefficient,
            };
        })
        .sort((a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate))
        .slice(0, 5);

    // 按系数高低排序
    highestSorted = [...artworksWithCoefficient]
        .filter(artwork => {
            // 检查原始状态
            if (artwork.state === '2' || artwork.state === '3' || artwork.state === '4') {
                return false;
            }
            // 检查更新后的状态（如果有价格事件）
            const latestEvent = priceEvents.find(event => event.serialnumber === artwork.serialnumber);
            if (latestEvent && (latestEvent.state === '2' || latestEvent.state === '3' || latestEvent.state === '4')) {
                return false;
            }
            return true;
        })
        .sort((a, b) => b.currentCoefficient - a.currentCoefficient)
        .slice(0, 5);


    // 渲染列表
    document.getElementById('latest-list').innerHTML = 
        latestSorted.map(generateArtworkHTML).join('');
    document.getElementById('highest-list').innerHTML = 
        highestSorted.map(generateArtworkHTML).join('');
        

    // 获取当前日期并设置为当天开始时间
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // 生成过去3个月到未来1个月的日期数组
    const totalDays = 60;  // 约4个月
    const dates = Array.from({length: totalDays}, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - (53 - i));  // 90天前到30天后
        return date.toISOString().split('T')[0];
    });

    // 为每个项目生成价格数据
    const artworkData = allArtworks.map(artwork => {
        const data = dates.map(date => {
            const dateObj = new Date(date);
            dateObj.setHours(0, 0, 0, 0);
            
            if (dateObj > currentDate) {
                return null;
            }

            // 获取作品当前状态
            const artworkState = getLatestState(artwork.serialnumber) || '0';

            // 获取所有相关的价格事件
            const relevantEvents = priceEvents
                .filter(event => {
                    // 匹配具体作品的事件
                    if (event.serialnumber === artwork.serialnumber) return true;
                    
                    // 匹配全局事件
                    if (event.serialnumber === 'all') return true;
                    
                    // 匹配特定状态的全局事件
                    if (event.serialnumber === 'all0' && artworkState === '0') return true;
                    
                    return false;
                })
                .filter(event => new Date(event.date) <= dateObj)
                .sort((a, b) => new Date(b.date) - new Date(a.date));

            // 如果有相关事件，返回最新的系数
            if (relevantEvents.length > 0) {
                return relevantEvents[0].coefficient;
            }

            // 如果没有事件，返回原始系数
            return artwork.coefficient;
        });

        return {
            serialnumber: artwork.serialnumber,
            title: artwork.title['data-lang'],
            data
        };
    });


    // 创建图表
    const ctx = document.getElementById('priceChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                // 过滤掉系数为0的项目
                ...artworkData
                    .filter(artwork => {
                        // 获取最新系数
                        const latestCoeff = getLatestCoefficient(artwork.serialnumber);
                        // 获取原始系数
                        const originalArtwork = allArtworks.find(p => p.serialnumber === artwork.serialnumber);
                        const originalCoeff = originalArtwork ? originalArtwork.coefficient : 0;
                        
                        // 检查当前使用的系数
                        const currentCoeff = latestCoeff !== null ? latestCoeff : originalCoeff;
                        return currentCoeff > 0;
                    })
                    .map(artwork => ({
                        label: artwork.serialnumber,
                        data: artwork.data,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        fill: false,
                        image: allArtworks
                            .find(p => p.serialnumber === artwork.serialnumber)
                            .image
                            .replace('assets/TCM/', '../assets/TCM-small/'),
                        pointRadius: 0,
                        borderWidth: 4,
                        pointHoverRadius: 5,
                        pointHitRadius: 20,
                        lastPriceChange: priceEvents
                            .filter(event => event.serialnumber === artwork.serialnumber)
                            .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date || '1970-01-01'
                    }))
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: {
                    min: 55,
                    max: 100,
                    title: {
                        display: false,
                        text: 'Coefficient',
                        font: {
                            size: 10  // p0 字号
                        }
                    },
                    grid: {
                        display: true
                    }
                },
                x: {
                    title: {
                        display: false,
                        text: 'Date',
                        font: {
                            size: 10  // p0 字号
                        }
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            if (index % 10 !== 0) {
                                return '';
                            }
                            
                            const date = new Date(dates[index]);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            
                            if (date.toDateString() === today.toDateString()) {
                                return 'Today';
                            }
                            
                            return `${date.getMonth() + 1}-${date.getDate()}`;
                        },
                        maxRotation: 0,
                        autoSkip: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false  // 隐藏图例
                },
                tooltip: {
                    enabled: false,
                    external: function(context) {
                        let tooltipEl = document.getElementById('chartjs-tooltip');
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            document.body.appendChild(tooltipEl);
                        }

                        if (!context.tooltip || !context.tooltip.dataPoints || !context.tooltip.dataPoints.length) {
                            tooltipEl.style.opacity = 0;
                            tooltipEl.style.display = 'none';
                            return;
                        }

                        const dataPoints = context.tooltip.dataPoints;
                        const firstPoint = dataPoints[0];

                        // 获取同一点上的所有项目
                        const sameValuePoints = dataPoints.filter(item => 
                            item.parsed.y === firstPoint.parsed.y
                        );

                        // 按最新价格更新时间排序并取前3个
                        const displayPoints = sameValuePoints
                            .sort((a, b) => 
                                new Date(b.dataset.lastPriceChange) - new Date(a.dataset.lastPriceChange)
                            )
                            .slice(0, 3);

                        // 生成 HTML 内容
                        tooltipEl.innerHTML = `
                            <div>
                                <div style="display: flex; flex-direction: column; gap: 2px;">
                                    <p2>
                                    ${sameValuePoints.length}个作品系数为${firstPoint.parsed.y}
                                    </p2>
                                    ${displayPoints.map(point => `
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <img src="${point.dataset.image}" style="width: 20px; height: 20px; object-fit: cover; border-radius: 4px;">
                                            <p2>${point.dataset.label}</p2>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;

                        // 显示 tooltip
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.display = 'block';
                        
                        // 获取图表容器的位置
                        const chartContainer = context.chart.canvas.getBoundingClientRect();
                        
                        // 计算相对于视口的位置
                        const positionY = chartContainer.top + context.tooltip.caretY + window.scrollY - 10;
                        const positionX = chartContainer.left + context.tooltip.caretX;

                        Object.assign(tooltipEl.style, {
                            position: 'absolute',
                            left: positionX + 'px',
                            top: positionY + 'px',
                            transform: 'translate(-50%, -100%)',
                            pointerEvents: 'none',
                            zIndex: 1000
                        });
                    }
                }
            }
        }
    });

    // 添加全局事件监听
    document.addEventListener('mousemove', (event) => {
        const tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) return;

        // 获取图表元素
        const chartElement = document.getElementById('priceChart');
        if (!chartElement) return;

        // 检查鼠标是否在图表区域内
        const rect = chartElement.getBoundingClientRect();
        const isOverChart = (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
        );

        // 如果鼠标不在图表区域内，隐藏 tooltip
        if (!isOverChart) {
            tooltipEl.style.opacity = 0;
            tooltipEl.style.display = 'none';
        }
    });

    // 获取所有价格事件中最高的 dealcoefficient
    let highestDealCoefficient = 0;
    
    const allDealCoefficients = priceEvents
        .map(event => event.dealcoefficient)
        .filter(coefficient => !isNaN(coefficient) && coefficient !== null);

    if (allDealCoefficients.length > 0) {
        highestDealCoefficient = Math.max(...allDealCoefficients);
    }

    // 更新 DOM
    document.getElementById('highest-deal-coefficient').textContent = 
        highestDealCoefficient;
});

// 更新 data.js 中的 coefficient 值
function updateArtworkCoefficients() {
    allArtworks.forEach(artwork => {
        const latestEvent = priceEvents
            .filter(event => event.serialnumber === artwork.serialnumber)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        if (latestEvent) {
            artwork.coefficient = latestEvent.coefficient;
        }
    });
}

document.addEventListener('languageChanged', () => {
    // 重新渲染列表
    document.getElementById('latest-list').innerHTML = 
        latestSorted.map(generateArtworkHTML).join('');
    document.getElementById('highest-list').innerHTML = 
        highestSorted.map(generateArtworkHTML).join('');
});

// 获取特定作品的所有价格事件（包括全局事件）
function getArtworkPriceEvents(serialnumber) {
    return priceEvents
        .filter(event => event.serialnumber === serialnumber || event.serialnumber === 'all')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// 创建图表
function createChart(serialnumber) {
    const events = getArtworkPriceEvents(serialnumber);
    
    // 准备图表数据
    const chartData = {
        labels: events.map(event => event.date),
        datasets: [{
            label: '系数',
            data: events.map(event => event.coefficient),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    // ... 其他图表配置代码 ...
}

// 更新图表
function updateChart(serialnumber) {
    const events = getArtworkPriceEvents(serialnumber);
    
    // 更新图表数据
    myChart.data.labels = events.map(event => event.date);
    myChart.data.datasets[0].data = events.map(event => event.coefficient);
    myChart.update();
}

