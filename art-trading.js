// 声明全局变量
let latestSorted = [];
let highestSorted = [];

// 生成列表HTML的函数
function generateProjectHTML(project) {
    // 从 groupedProjects 中找到项目所属的 group
    let groupId = '1';
    Object.entries(groupedProjects).forEach(([group, projects]) => {
        if (projects.some(p => p.serialnumber === project.serialnumber)) {
            groupId = group.replace('group', '');
        }
    });

    return `
        <div class="project-item" onclick="goToDetail('${groupId}', '${project.serialnumber}')" style="cursor: pointer;">
            <img class="project-image" src="${project.image.replace('/TCM/', '/TCM-small/')}" alt="${project.title['data-lang']}">
            <div class="project-info">
                
                <p2 class="project-serialnumber">${project.serialnumber}</p2>
                <p2 class="project-serialnumber">${project.currentCoefficient}</p2>
                <p2 class="project-serialnumber">${Math.round(project.price)}</p2>
            </div>
        </div>
    `;
}

// 添加滚动监听
let lastScrollTop = 0;
const nav = document.querySelector('.nav-background');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 向下滚动时隐藏
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        nav.classList.add('hidden');
    } 
    // 向上滚动时显示
    else {
        nav.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// 获取所有项目中的最高系数
function getHighestCoefficient() {
    const allCoefficients = Object.values(groupedProjects)
        .flat()
        .map(project => {
            // 获取最新的价格事件系数，如果没有则使用原始系数
            const latestCoeff = getLatestCoefficient(project.serialnumber);
            return latestCoeff !== null ? latestCoeff : project.coefficient;
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
    const allProjects = Object.values(groupedProjects).flat();
    const coefficients = allProjects.map(project => {
        const latestCoeff = getLatestCoefficient(project.serialnumber);
        return latestCoeff !== null ? latestCoeff : project.coefficient;
    });
    const averageCoefficient = coefficients.reduce((a, b) => a + b, 0) / coefficients.length;
    
    // 计算平均系数（排除系数为0的项目）
    const validCoefficients = allProjects
        .map(project => {
            const latestCoeff = getLatestCoefficient(project.serialnumber);
            return latestCoeff !== null ? latestCoeff : project.coefficient;
        })
        .filter(coefficient => coefficient > 0);  // 排除系数为0的项目

    // 计算并更新平均值显示
    document.getElementById('average-coefficient').textContent = 
        (validCoefficients.length > 0
            ? (validCoefficients.reduce((sum, coeff) => sum + coeff, 0) / validCoefficients.length)
            : 0
        ).toFixed(1);

    // 获取每个项目的最新系数和最新更新时间
    const projectsWithCoefficient = allProjects.map(project => {
        const latestCoefficient = getLatestCoefficient(project.serialnumber);
        return {
            ...project,
            currentCoefficient: latestCoefficient !== null ? latestCoefficient : project.coefficient,
            price: (project.width + project.height) * (latestCoefficient !== null ? latestCoefficient : project.coefficient),
            lastUpdateDate: priceEvents
                .filter(event => event.serialnumber === project.serialnumber)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date || '1970-01-01'
        };
    });

    // 通用功能函数
    function goToDetail(groupId, serialnumber) {
    window.location.href = `detail.html?group=${groupId}&id=${serialnumber}`;
    }

    // 只获取有更新的项目并按最新更新时间排序
    latestSorted = [...projectsWithCoefficient]
        .filter(project => {
            // 只保留有价格事件更新的项目
            return priceEvents.some(event => event.serialnumber === project.serialnumber);
        })
        .sort((a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate))
        .slice(0, 10);

    // 按系数高低排序
    highestSorted = [...projectsWithCoefficient]
        .sort((a, b) => b.currentCoefficient - a.currentCoefficient)
        .slice(0, 10);


    // 渲染列表
    document.getElementById('latest-list').innerHTML = 
        latestSorted.map(generateProjectHTML).join('');
    document.getElementById('highest-list').innerHTML = 
        highestSorted.map(generateProjectHTML).join('');
        

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
    const projectData = allProjects.map(project => {
        const data = dates.map(date => {
            const dateObj = new Date(date);
            dateObj.setHours(0, 0, 0, 0);
            
            if (dateObj > currentDate) {
                return null;
            }

            return getProjectCoefficient(project.serialnumber, dateObj);
        });

        return {
            serialnumber: project.serialnumber,
            title: project.title['data-lang'],
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
                ...projectData
                    .filter(project => {
                        // 获取最新系数
                        const latestCoeff = getLatestCoefficient(project.serialnumber);
                        // 获取原始系数
                        const originalProject = allProjects.find(p => p.serialnumber === project.serialnumber);
                        const originalCoeff = originalProject ? originalProject.coefficient : 0;
                        
                        // 检查当前使用的系数
                        const currentCoeff = latestCoeff !== null ? latestCoeff : originalCoeff;
                        return currentCoeff > 0;
                    })
                    .map(project => ({
                        label: project.serialnumber,
                        data: project.data,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        fill: false,
                        image: allProjects.find(p => p.serialnumber === project.serialnumber).image.replace('/TCM/', '/TCM-small/'),
                        pointRadius: 0,
                        borderWidth: 4,
                        pointHoverRadius: 5,
                        pointHitRadius: 20,
                        lastPriceChange: priceEvents
                            .filter(event => event.serialnumber === project.serialnumber)
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
                        
                        // 设置位置
                        const positionY = context.chart.canvas.offsetTop + context.tooltip.caretY - 10;
                        const positionX = context.chart.canvas.offsetLeft + context.tooltip.caretX;

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
});

// 更新 data.js 中的 coefficient 值
function updateProjectCoefficients() {
    allProjects.forEach(project => {
        const latestEvent = priceEvents
            .filter(event => event.serialnumber === project.serialnumber)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        if (latestEvent) {
            project.coefficient = latestEvent.coefficient;
        }
    });
}

document.addEventListener('languageChanged', () => {
    // 重新渲染列表
    document.getElementById('latest-list').innerHTML = 
        latestSorted.map(generateProjectHTML).join('');
    document.getElementById('highest-list').innerHTML = 
        highestSorted.map(generateProjectHTML).join('');
});