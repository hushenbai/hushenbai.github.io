// 存储所有卡片数据
const groupedArtworks = {
    group1: [
        {
            image: 'assets/TCM/TCMFW1白陶碗盛药图.jpg',
            title: {'data-lang': '白陶碗盛药图'},
            title2: {'data-lang': '白陶碗<br>盛药图'},
            serialnumber: 'TCMFW1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW2金叶纹铜碗盛药图.jpg',
            title: {'data-lang': '金叶纹铜碗盛药图'},
            title2: {'data-lang': '金叶纹铜碗<br>盛药图'},
            serialnumber: 'TCMFW2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW3柔形白瓷碗盛药图.jpg',
            title: {'data-lang': '柔形白瓷碗盛药图'},
            title2: {'data-lang': '柔形白瓷碗<br>盛药图'},
            serialnumber: 'TCMFW3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW4金边天蓝釉瓷碗盛药图.jpg',
            title: {
                'data-lang': '金边天蓝釉瓷碗盛药图'
            },
            title2: {
                'data-lang': '金边天蓝釉<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW5枯草地白瓷碗盛药图.jpg',
            title: {
                'data-lang': '枯草地白瓷碗盛药图'
            },
            title2: {
                'data-lang': '枯草地<br>白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW5',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW6金环白瓷盘盛药图.jpg',
            title: {
                'data-lang': '金环白瓷盘盛药图'
            },
            title2: {
                'data-lang': '金环白瓷盘<br>盛药图'
            },
            serialnumber: 'TCMFW6',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW7紫地高足白瓷碗盛药图.jpg',
            title: {
                'data-lang': '紫地高足白瓷碗盛药图'
            },
            title2: {
                'data-lang': '紫地<br>高足白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW7',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW8金边黑釉扁陶碗盛药图.jpg',
            title: {
                'data-lang': '金边黑釉扁陶碗盛药图'
            },
            title2: {
                'data-lang': '金边黑釉<br>扁陶碗<br>盛药图'
            },
            serialnumber: 'TCMFW8',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW9金边墨蓝釉陶碗盛药图.jpg',
            title: {
                'data-lang': '金边墨蓝釉陶碗盛药图'
            },
            title2: {
                'data-lang': '金边墨蓝釉<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMFW9',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW10素青瓷碗盛药图.jpg',
            title: {
                'data-lang': '素青瓷碗盛药图'
            },
            title2: {
                'data-lang': '素青瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW10',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW11大玻璃碗盛药图.jpg',
            title: {
                'data-lang': '大玻璃碗盛药图'
            },
            title2: {
                'data-lang': '大玻璃碗<br>盛药图'
            },
            serialnumber: 'TCMFW11',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW12冰蓝釉褐边厚碗盛药图.jpg',
            title: {
                'data-lang': '冰蓝釉褐边厚碗盛药图'
            },
            title2: {
                'data-lang': '冰蓝釉褐边<br>厚碗<br>盛药图'
            },
            serialnumber: 'TCMFW12',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW13金地黑边灰土碗盛药图.jpg',
            title: {
                'data-lang': '金地黑边灰土碗盛药图'
            },
            title2: {
                'data-lang': '金地<br>黑边灰土碗<br>盛药图'
            },
            serialnumber: 'TCMFW13',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW14黄釉喇叭瓷盘盛药图.jpg',
            title: {
                'data-lang': '黄釉喇叭瓷盘盛药图'
            },
            title2: {
                'data-lang': '黄釉<br>喇叭瓷盘<br>盛药图'
            },
            serialnumber: 'TCMFW14',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW15糯玉瓷碗盛药图.jpg',
            title: {
                'data-lang': '糯玉瓷碗盛药图'
            },
            title2: {
                'data-lang': '糯玉瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW15',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW16绿铁碗盛药图.jpg',
            title: {
                'data-lang': '绿铁碗盛药图'
            },
            title2: {
                'data-lang': '绿铁碗<br>盛药图'
            },
            serialnumber: 'TCMFW16',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW17草地金斑黑瓷碗盛药图.jpg',
            title: {
                'data-lang': '草地金斑黑瓷碗盛药图'
            },
            title2: {
                'data-lang': '草地<br>金斑黑瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW17',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW18碎绿地白瓷碗盛药图.jpg',
            title: {
                'data-lang': '碎绿地白瓷碗盛药图'
            },
            title2: {
                'data-lang': '碎绿地<br>白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW18',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 2,
            exhibits: [
                {
                     "city": {
                        "data-lang": "成都"
                    },
                    "name": {
                        "data-lang": "One's 咖啡店"
                    },
                    "time": "2025.01",
                },
                {
                    "name": {
                        "data-lang": "申白工作室"
                    },
                    "time": "2024.12",
                    "city": {
                        "data-lang": "成都"
                    }
                },
            ]
        },

        {
            image: 'assets/TCM/TCMFW19淤血白瓷碗盛药图.jpg',
            title: {
                'data-lang': '淤血白瓷碗盛药图'
            },
            title2: {
                'data-lang': '淤血白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMFW19',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMFW20淤花纹蓝底钵盛药图.jpg',
            title: {
                'data-lang': '淤花纹蓝底钵盛药图'
            },
            title2: {
                'data-lang': '淤花纹<br>蓝底钵<br>盛药图'
            },
            serialnumber: 'TCMFW20',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMHM1裂纹青黄手捏陶碗盛药图.jpg',
            title: {
                'data-lang': '裂纹青黄手捏陶碗盛药图'
            },
            title2: {
                'data-lang': '裂纹青黄<br>手捏陶碗<br>盛药图'
            },
            serialnumber: 'TCMHM1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2025-04-17',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMHM2红纭手捏陶碗盛药图.jpg',
            title: {
                'data-lang': '红纭手捏陶碗盛药图'
            },
            title2: {
                'data-lang': '红纭<br>手捏陶碗<br>盛药图'
            },
            serialnumber: 'TCMHM2',
            series: {'data-lang': '传统中药'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2025-04-17',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMHM3缺口墨斑纹手捏陶碗盛药图.jpg',
            title: {
                'data-lang': '缺口墨斑纹手捏陶碗盛药图'
            },
            title2: {
                'data-lang': '缺口墨斑纹<br>手捏陶碗<br>盛药图'
            },
            serialnumber: 'TCMHM3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2025-04-17',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMHM4墨纭手捏陶碗盛药图.jpg',
            title: {
                'data-lang': '墨纭手捏陶碗盛药图'
            },
            title2: {
                'data-lang': '墨纭<br>手捏陶碗<br>盛药图'
            },
            serialnumber: 'TCMHM4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2025-04-17',
            state: 0,
            
        },

        // 第一组的更多项目...
    ],

    group2: [
        {
            image: 'assets/TCM/TCMCSCT1之字白瓷碗盛药图.jpg',
            title: {
                'data-lang': '之字白瓷碗盛药图'
            },
            title2: {
                'data-lang': '之字<br>白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCT2乎字白瓷碗盛药图.jpg',
            title: {
                'data-lang': '乎字白瓷碗盛药图'
            },
            title2: {
                'data-lang': '乎字<br>白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCT3者字白瓷碗盛药图.jpg',
            title: {
                'data-lang': '者字白瓷碗盛药图'
            },
            title2: {
                'data-lang': '者字<br>白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCT4也字白瓷碗盛药图.jpg',
            title: {
                'data-lang': '也字白瓷碗盛药图'
            },
            title2: {
                'data-lang': '也字<br>白瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        // 第二组的更多项目...
    ],

    group3: [
        {
            image: 'assets/TCM/TCMCSCT5回字第一形陶碗盛药图.jpg',
            title: {
                'data-lang': '回字第一形陶碗盛药图'
            },
            title2: {
                'data-lang': '回字第一形<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT5',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCT6回字第二形陶碗盛药图.jpg',
            title: {
                'data-lang': '回字第二形陶碗盛药图'
            },
            title2: {
                'data-lang': '回字第二形<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT6',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCT7回字第三形陶碗盛药图.jpg',
            title: {
                'data-lang': '回字第三形陶碗盛药图'
            },
            title2: {
                'data-lang': '回字第三形<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT7',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCT8回字第四形陶碗盛药图.jpg',
            title: {
                'data-lang': '回字第四形陶碗盛药图'
            },
            title2: {
                'data-lang': '回字第四形<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCSCT8',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        // 第二组的更多项目...
    ],

    group4: [
        {
            image: 'assets/TCM/TCMCSCW1天字红碗盛药图.jpg',
            title: {
                'data-lang': '天字红碗盛药图'
            },
            title2: {
                'data-lang': '天字<br>红碗<br>盛药图'
            },
            serialnumber: 'TCMCSCW1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCW2地字红碗盛药图.jpg',
            title: {
                'data-lang': '地字红碗盛药图'
            },
            title2: {
                'data-lang': '地字<br>红碗<br>盛药图'
            },
            serialnumber: 'TCMCSCW2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCW3君字红碗盛药图.jpg',
            title: {
                'data-lang': '君字红碗盛药图'
            },
            title2: {
                'data-lang': '君字<br>红碗<br>盛药图'
            },
            serialnumber: 'TCMCSCW3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCW4亲字红碗盛药图.jpg',
            title: {
                'data-lang': '亲字红碗盛药图'
            },
            title2: {
                'data-lang': '亲字<br>红碗<br>盛药图'
            },
            serialnumber: 'TCMCSCW4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSCW5师字红碗盛药图.jpg',
            title: {
                'data-lang': '师字红碗盛药图'
            },
            title2: {
                'data-lang': '师字<br>红碗<br>盛药图'
            },
            serialnumber: 'TCMCSCW5',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        // 第二组的更多项目...
    ],

    group5: [
        {
            image: 'assets/TCM/TCMCS3G1秭归紫釉碗盛药图.jpg',
            title: {
                'data-lang': '秭归紫釉碗盛药图'
            },
            title2: {
                'data-lang': '秭归<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G2兴山紫釉碗盛药图.jpg',
            title: {
                'data-lang': '兴山紫釉碗盛药图'
            },
            title2: {
                'data-lang': '兴山<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G3巴东紫釉碗盛药图.jpg',
            title: {
                'data-lang': '巴东紫釉碗盛药图'
            },
            title2: {
                'data-lang': '巴东<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G4巫山紫釉碗盛药图.jpg',
            title: {
                'data-lang': '巫山紫釉碗盛药图'
            },
            title2: {
                'data-lang': '巫山<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G5奉节紫釉碗盛药图.jpg',
            title: {
                'data-lang': '奉节紫釉碗盛药图'
            },
            title2: {
                'data-lang': '奉节<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G5',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G6万县紫釉碗盛药图.jpg',
            title: {
                'data-lang': '万县紫釉碗盛药图'
            },
            title2: {
                'data-lang': '万县<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G6',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G7开县紫釉碗盛药图.jpg',
            title: {
                'data-lang': '开县紫釉碗盛药图'
            },
            title2: {
                'data-lang': '开县<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G7',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G8丰都紫釉碗盛药图.jpg',
            title: {
                'data-lang': '丰都紫釉碗盛药图'
            },
            title2: {
                'data-lang': '丰都<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G8',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMCS3G9云阳紫釉碗盛药图.jpg',
            title: {
                'data-lang': '云阳紫釉碗盛药图'
            },
            title2: {
                'data-lang': '云阳<br>紫釉碗<br>盛药图'
            },
            serialnumber: 'TCMCS3G9',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        
    ],
    group6: [
        {
            image: 'assets/TCM/TCMES1花招娣白衣搪瓷碗盛药图.jpg',
            title: {
                'data-lang': '花招娣白衣搪瓷碗盛药图'
            },
            title2: {
                'data-lang': '花招娣<br>白衣搪瓷碗<br>盛药图'
            },
            serialnumber: 'TCMES1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMES2花迎娣黄衣搪瓷碗盛药图.jpg',
            title: {
                'data-lang': '花迎娣黄衣搪瓷碗盛药图'
            },
            title2: {
                'data-lang': '花迎娣<br>黄衣搪瓷碗<br>盛药图'
            },
            serialnumber: 'TCMES2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMES3花念娣粉衣搪瓷碗盛药图.jpg',
            title: {
                'data-lang': '花念娣粉衣搪瓷碗盛药图'
            },
            title2: {
                'data-lang': '花念娣<br>粉衣搪瓷碗<br>盛药图'
            },
            serialnumber: 'TCMES3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMES4花盼娣青衣搪瓷碗盛药图.jpg',
            title: {
                'data-lang': '花盼娣青衣搪瓷碗盛药图'
            },
            title2: {
                'data-lang': '花盼娣<br>青衣搪瓷碗<br>盛药图'
            },
            serialnumber: 'TCMES4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
    ],
    group7: [
        {
            image: 'assets/TCM/TCMNN1娘惹绿粉瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹绿粉瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>绿粉瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN2娘惹黄蓝瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹黄蓝瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>黄蓝瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN3娘惹黄绿瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹黄绿瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>黄绿瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN4娘惹黄罗瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹黄罗瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>黄罗瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN5娘惹蓝绿瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹蓝绿瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>蓝绿瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN5',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN6娘惹粉罗瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹粉罗瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>粉罗瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN6',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN7娘惹土粉瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹土粉瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>土粉瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN7',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN8娘惹酱绿瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹酱绿瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>酱绿瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN8',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
        {
            image: 'assets/TCM/TCMNN9娘惹红黄瓷碗盛药图.jpg',
            title: {
                'data-lang': '娘惹红黄瓷碗盛药图'
            },
            title2: {
                'data-lang': '娘惹<br>红黄瓷碗<br>盛药图'
            },
            serialnumber: 'TCMNN9',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2024,
            date: '2024-11-20',
            state: 0,
            
        },
    ],

    group8: [
        {
            image: 'assets/TCM/TCMCSSF1金山大埠瓷碗盛药图.jpg',
            title: {
                'data-lang': '金山大埠瓷碗盛药图'
            },
            title2: {
                'data-lang': '金山大埠<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSSF1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
        },

        {
            image: 'assets/TCM/TCMCSSF2金山二埠瓷碗盛药图.jpg',
            title: {
                'data-lang': '金山二埠瓷碗盛药图'
            },
            title2: {
                'data-lang': '金山二埠<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSSF2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
        },

        {
            image: 'assets/TCM/TCMCSSF3金山三埠瓷碗盛药图.jpg',
            title: {
                'data-lang': '金山三埠瓷碗盛药图'
            },
            title2: {
                'data-lang': '金山三埠<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSSF3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCSSF4金山埠仔瓷碗盛药图.jpg',
            title: {
                'data-lang': '金山埠仔瓷碗盛药图'
            },
            title2: {
                'data-lang': '金山埠仔<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSSF4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
        },
        // 第二组的更多项目...
    ],

    group9: [
        {
            image: 'assets/TCM/TCMCSBC1卑诗大埠瓷碗盛药图.jpg',
            title: {
                'data-lang': '卑诗大埠瓷碗盛药图'
            },
            title2: {
                'data-lang': '卑诗大埠<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSBC1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
        },

        {
            image: 'assets/TCM/TCMCSBC2卑诗二埠瓷碗盛药图.jpg',
            title: {
                'data-lang': '卑诗二埠瓷碗盛药图'
            },
            title2: {
                'data-lang': '卑诗二埠<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSBC2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
        },

        {
            image: 'assets/TCM/TCMCSBC3卑诗咸水埠瓷碗盛药图.jpg',
            title: {
                'data-lang': '卑诗咸水埠瓷碗盛药图'
            },
            title2: {
                'data-lang': '卑诗咸水埠<br>瓷碗<br>盛药图'
            },
            serialnumber: 'TCMCSBC3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-12',
            state: 0,
        },
        // 第二组的更多项目...
    ],

    group10: [
        {
            image: 'assets/TCM/TCMCS4B1恻隐陶碗盛药图.jpg',
            title: {
                'data-lang': '恻隐陶碗盛药图'
            },
            title2: {
                'data-lang': '恻隐<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCS4B1',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-14',
            state: 0,
        },

        {
            image: 'assets/TCM/TCMCS4B2羞恶陶碗盛药图.jpg',
            title: {
                'data-lang': '羞恶陶碗盛药图'
            },
            title2: {
                'data-lang': '羞恶<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCS4B2',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-14',
            state: 0,
        },

        {
            image: 'assets/TCM/TCMCS4B3辞让陶碗盛药图.jpg',
            title: {
                'data-lang': '辞让陶碗盛药图'
            },
            title2: {
                'data-lang': '辞让<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCS4B3',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-14',
            state: 0,
            
        },

        {
            image: 'assets/TCM/TCMCS4B4是非陶碗盛药图.jpg',
            title: {
                'data-lang': '是非陶碗盛药图'
            },
            title2: {
                'data-lang': '是非<br>陶碗<br>盛药图'
            },
            serialnumber: 'TCMCS4B4',
            series: {'data-lang': '传统中药'},
            media: {'data-lang': '木板油彩'},
            width: 20,
            height: 20,
            depth: 2.3,
            coefficient: 60,
            weight: '250 g',
            year: 2025,
            date: '2025-04-14',
            state: 0,
        },
        // 第二组的更多项目...
    ],    
    // 可以添加更多组...
};



