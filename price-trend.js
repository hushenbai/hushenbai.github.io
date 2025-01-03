document.addEventListener('DOMContentLoaded', () => {
    // 计算平均系数
    const allProjects = Object.values(groupedProjects).flat();
    const coefficients = allProjects.map(project => 
        getProjectCoefficient(project.serialnumber)
    );
    const averageCoefficient = coefficients.reduce((a, b) => a + b, 0) / coefficients.length;
    
    // 更新平均系数显示
    document.getElementById('average-coefficient').textContent = 
        averageCoefficient.toFixed(1);

    // 获取每个项目的最新系数和最新更新时间
    const projectsWithCoefficient = allProjects.map(project => {
        // 获取该项目的最新价格事件
        const latestEvent = priceEvents
            .filter(event => event.serialnumber === project.serialnumber)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        return {
            ...project,
            currentCoefficient: getProjectCoefficient(project.serialnumber),
            price: (project.width + project.height) * getProjectCoefficient(project.serialnumber),
            lastUpdateDate: latestEvent ? new Date(latestEvent.date) : new Date('1970-01-01')
        };
    });

    // 按最新更新时间排序
    const latestSorted = [...projectsWithCoefficient]
        .sort((a, b) => b.lastUpdateDate - a.lastUpdateDate)
        .slice(0, 5);

    // 按系数高低排序
    const highestSorted = [...projectsWithCoefficient]
        .sort((a, b) => b.currentCoefficient - a.currentCoefficient)
        .slice(0, 5);

    // 确保 goToDetail 函数使用正确的 URL 格式
    function goToDetail(groupId, serialnumber) {
        window.location.href = `detail.html?group=group${groupId}&id=${serialnumber}`;
    }

    // 生成列表HTML
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
                    <p2 class="project-title">${project.title['data-lang']}</p2>
                    <p2 class="project-serialnumber">${project.serialnumber}</p2>
                    <p2 class="project-serialnumber">${project.currentCoefficient}</p2>
                    <p2 class="project-serialnumber">${Math.round(project.price)}</p2>
                </div>
            </div>
        `;
    }

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
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: projectData.map(project => ({
                label: project.serialnumber,
                data: project.data,
                borderColor: '#000000',
                fill: false,
                tension: 0,
                image: allProjects.find(p => p.serialnumber === project.serialnumber).image.replace('/TCM/', '/TCM-small/'),
                pointRadius: 0,
                borderWidth: 2.5,
                pointHoverRadius: 5,
                pointHitRadius: 20,
                lastPriceChange: priceEvents
                    .filter(event => event.serialnumber === project.serialnumber)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date || '1970-01-01'
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: {
                    min: 50,
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
                    display: false
                },
                tooltip: {
                    enabled: false,
                    external: function(context) {
                        // 获取或创建 tooltip 元素
                        let tooltipEl = document.getElementById('chartjs-tooltip');
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            document.body.appendChild(tooltipEl);
                        }

                        // 如果没有数据点，隐藏 tooltip
                        if (!context.tooltip || !context.tooltip.dataPoints || !context.tooltip.dataPoints.length) {
                            tooltipEl.style.opacity = 0;
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

                        // 简单的位置调整
                        const positionY = context.chart.canvas.offsetTop + context.tooltip.caretY - 10;
                        const positionX = context.chart.canvas.offsetLeft + context.tooltip.caretX;

                        // 设置 tooltip 位置和样式
                        Object.assign(tooltipEl.style, {
                            opacity: 1,
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