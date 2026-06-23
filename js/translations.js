// 获取用户的首选语言
function getPreferredLanguage() {
    // 1. 首先检查localStorage是否已有语言设置
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        return savedLang;
    }

    // 2. 检查浏览器语言设置
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 3. 检查系统语言
    const systemLang = navigator.languages ? navigator.languages[0] : browserLang;
    
    // 4. 将获取到的语言代码转换为我们支持的格式（zh 或 en）
    const lang = (systemLang || 'en').toLowerCase();
    
    // 5. 如果是中文（包括简体和繁体），返回 'zh'，否则返回 'en'
    return lang.startsWith('zh') ? 'zh' : 'en';
}

// 初始化语言设置
let currentLang = getPreferredLanguage();
localStorage.setItem('language', currentLang);

// 获取当前语言
function getCurrentLanguage() {
    // 始终从 localStorage 获取最新值
    return localStorage.getItem('language') || 'en';
}

// 切换语言
function toggleLanguage() {
    // 切换语言
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('language', currentLang);
    
    // 更新页面文本
    updateLanguage();
    
    // 更新语言切换图标
    const langIcon = document.querySelector('.mobile-menu-item[onclick="toggleLanguage()"] img');
    if (langIcon) {
        if (currentLang === 'zh') {
            langIcon.src = 'assets/enicon.svg';
            langIcon.alt = 'English';
        } else {
            langIcon.src = 'assets/zhicon.svg';
            langIcon.alt = '中文';
        }
    }
    
    // 触发语言改变事件
    document.dispatchEvent(new Event('languageChanged'));
}

// 更新页面语言
function updateLanguage() {
    const lang = getCurrentLanguage();
    document.documentElement.lang = lang; // 更新 HTML lang 属性
    
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            const translationText = translations[lang][key];
            const hasHTML = /<[^>]+>/.test(translationText); // 检查是否包含 HTML 标签（如 <br>）
            
            // 如果元素的父元素是 h6，且翻译文本不包含 HTML，只更新文本内容以保留结构
            const parent = element.parentElement;
            if (parent && parent.tagName === 'h6' && !hasHTML) {
                element.textContent = translationText;
            } else if (element.querySelector('h6')) {
                // 如果元素内部有 h6 标签，跳过此元素的更新
                // 让内部的子元素自己更新，以保留 HTML 结构（如 <h6><span data-lang>...</span></h6>）
                return;
            } else if (element.children.length > 0 && !hasHTML) {
                // 如果元素有子元素且翻译文本不包含 HTML，只更新文本内容，保留 HTML 结构
                element.textContent = translationText;
            } else {
                // 如果翻译文本包含 HTML（如 <br>）或没有子元素，使用 innerHTML 以正确解析 HTML
                element.innerHTML = translationText;
            }
        }
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 确保使用 localStorage 中的语言设置
    currentLang = getCurrentLanguage();
    updateLanguage();
    
    // 设置初始图标
    const langIcon = document.querySelector('.mobile-menu-item[onclick="toggleLanguage()"] img');
    if (langIcon) {
        if (currentLang === 'zh') {
            langIcon.src = 'assets/enicon.svg';
            langIcon.alt = 'English';
        } else {
            langIcon.src = 'assets/zhicon.svg';
            langIcon.alt = '中文';
        }
    }
});

// 翻译内容
const translations = {
    'zh': {
        'title': '良药',
        'subtitle': 'MedicineBowl',
        'name': '名称',
        'back': '返回',
        'listpage': '列表页',
        'switch-lang': 'English',
        'switch-lang2': 'ENG',
        'Repetition': '重复',
        'Gaze': '凝视',
        'shenbai': '胡申白',
        'tcm-title': '良药',
        'tcm-title-mobile': '良药',
        'tcm-slogan': '华人的生活记忆',
        'tcm-words': '一条大河，十亿小碗',
        'abm-title': '胡申白',
        'site-title': 'SHENBAI',
        'nav-works': '作品',
        'works-slogan': '华人生活记忆的河流',
        'about-name': '胡申白<br>Hu Shenbai',
        'about-intro': '<br><br>观众主义艺术家。工作基于哈贝马斯的公共领域与交往理性概念，用艺术呈现并抵达更好的社会关系。',
        'about-bio': '<br><br>个人经历<br><br>毕业于 四川大学艺术学院。<br>前腾讯（深圳）视觉设计师。<br>前虾皮（新加坡）用户体验设计师、品牌设计师。',
        'about-exhibitions': '<br><br>展览经历<br><br>2025，成都空舟美术馆，东方草木 联展<br>2025，拉脱维亚，香味艺术节 联展<br>2026，成都时髦茶事，仍然有效 双人展',
        'nav-prev': '前一幅',
        'nav-next': '后一幅',
        '404-heading': '404',
        '404-message': '抱歉，你访问的页面不存在。但我可以请你喝药。',
        '404-back': '返回首页',
        'serialnumber': '编号',
        '木板油彩': '木板油彩',
        '帆布油彩': '帆布油彩',
        'work': '作品',
        '已收藏': '已收藏',
        '申白持有': '申白持有',

        "之乎者也": "之乎者也",
        "之乎者也-description": "良药项目是艺术家在全球化语境下对民族身份的回应。然而，任何被挑选出来的民族符号都可能压缩复杂现实，甚至沦为带有殖民凝视的装饰性意象。因此，他采用“堆砌”的方法，以象征个体经验的小碗为基本单位，让多元、细碎的生活记忆汇聚成关于民族的大河，从而避免单一符号对身份的简化。",


        "儒家": "儒家",
        "儒家-description": "“天地君亲师”是传统儒家伦理中界定华人社会秩序的层级框架，用以确立人与宇宙、政治与家庭之间的权威关系。“自我”在这套序列五者之下，反映了个体被压低的存在感与主体性。",
        "孔乙己": "孔乙己",
        "孔乙己-heading": "孔乙己<br>回字的四种写法",
        "孔乙己-description": "当传统文化以遗产形式被传递时，人们面临如何将其内化为自身生命姿态的问题，同时也需要思考，在与他人的交往中，是否应当遵循这些文化规范。这引发了对这些文化规范是否应该在日常生活中遵循的疑问。", 
        "移民": "移民",
        "移民-description": "近代中国沿海民众因生计压力与社会动荡而大量赴海外，从而形成分布于东南亚的华侨群体；同时，也有劳工在契约招募或强迫贩运下被送往美洲参与铁路、矿业等劳作。这些移民以中文为其落足点命名，构筑了海外华人社群的共同记忆与文化坐标。",
        "女性": "女性",
        "女性-description": "陵容碗盛药图系列以电视剧《甄嬛传》中安陵容的九套服饰为碗面纹样。艺术家借由这些服饰象征她在不同人生阶段中不断调适、试图解决处境的努力。然而这种持续的自我消耗并未换来真正的幸福与自由，最终她认为自己的人生是疲惫的。",

        "detail-TCMmain": "良药项目是重复画画的行为。<br>我向观世音菩萨发愿画十亿碗药与华人度苦厄。人离难，难离身，一切心痛化为明珠、薏苡、沙粒入河。<br>行小碗波罗蜜多。",
        'loading': '加载中...',
        'exhibitions': '追踪',
        '申白工作室': '申白工作室',
        'One\'s 咖啡店': 'One\'s 咖啡店',
        '成都': '成都',

        '推荐': '推荐',
        '表达': '表达',
        '判断': '判断',    
        '烤火': '烤火',
        '尝试': '尝试',
        '抓握': '抓握',
        '介绍': '介绍',
        '聊天': '聊天',
        '等待': '等待',
        '留意': '留意',

        '明珠薏苡': '明珠薏苡系列',
        '四川女人': '四川女人系列',
        'tcm-group2': '文言四字碗盛药图',
        'tcm-group3': '四回字碗盛药图',
        'tcm-group4': '儒家祭祀五字碗盛药图',
        'tcm-group5': '三峡九乡碗盛药图',
        'tcm-group6': '姐娣碗盛药图',
        'tcm-group7': '南洋娘惹碗盛药图',
        'tcm-group8': '旧金山华乡碗盛药图',
        'tcm-group9': '卑诗华乡碗盛药图',
        'tcm-group10': '儒家四端碗盛药图',
        'tcm-group11': '南洋华乡碗盛药图',
        'tcm-group12': '陵容碗盛药图',
        'tcm-group13': '珊瑚碗盛水图',
        'tcm-group14': '苔藓碗盛水图',
        'tcm-group15': '釉彩碗盛水图',
        'ones-coffee-shop': "One's 咖啡店",
        '白陶碗盛药图': '白陶碗盛药图',
        '金叶纹铜碗盛药图': '金叶纹铜碗盛药图',
        '柔形白瓷碗盛药图': '柔形白瓷碗盛药图',
        '金边天蓝釉瓷碗盛药图': '金边天蓝釉瓷碗盛药图',
        '枯草地白瓷碗盛药图': '枯草地白瓷碗盛药图',
        '金环白瓷盘盛药图': '金环白瓷盘盛药图',
        '紫地高足白瓷碗盛药图': '紫地高足白瓷碗盛药图',
        '金边黑釉扁陶碗盛药图': '金边黑釉扁陶碗盛药图',
        '金边墨蓝釉陶碗盛药图': '金边墨蓝釉陶碗盛药图',
        '素青瓷碗盛药图': '素青瓷碗盛药图',
        '大玻璃碗盛药图': '大玻璃碗盛药图',
        '冰蓝釉褐边厚碗盛药图': '冰蓝釉褐边厚碗盛药图',
        '金地黑边灰土碗盛药图': '金地黑边灰土碗盛药图',
        '黄釉喇叭瓷盘盛药图': '黄釉喇叭瓷盘盛药图',
        '糯玉瓷碗盛药图': '糯玉瓷碗盛药图',
        '绿铁碗盛药图': '绿铁碗盛药图',
        '草地金斑黑瓷碗盛药图': '草地金斑黑瓷碗盛药图',
        '碎绿地白瓷碗盛药图': '碎绿地白瓷碗盛药图',
        '淤血白瓷碗盛药图': '淤血白瓷碗盛药图',
        '淤花纹蓝底钵盛药图': '淤花纹蓝底钵盛药图',
        '勾边白花蓝碗盛药图': '勾边白花蓝碗盛药图',
        '墨蓝深杯盛药图': '墨蓝深杯盛药图',
        '青碟盛药图': '青碟盛药图',
        '勾边青碟盛药图': '勾边青碟盛药图',
        '百褶蓝碗盛药图': '百褶蓝碗盛药图',
        '之字白瓷碗盛药图': '之字白瓷碗盛药图',
        '乎字白瓷碗盛药图': '乎字白瓷碗盛药图',
        '者字白瓷碗盛药图': '者字白瓷碗盛药图',
        '也字白瓷碗盛药图': '也字白瓷碗盛药图',
        '回字第一形陶碗盛药图': '回字第一形陶碗盛药图',
        '回字第二形陶碗盛药图': '回字第二形陶碗盛药图',
        '回字第三形陶碗盛药图': '回字第三形陶碗盛药图',
        '回字第四形陶碗盛药图': '回字第四形陶碗盛药图',
        '天字红碗盛药图': '天字红碗盛药图',
        '地字红碗盛药图': '地字红碗盛药图',
        '君字红碗盛药图': '君字红碗盛药图',
        '亲字红碗盛药图': '亲字红碗盛药图',
        '师字红碗盛药图': '师字红碗盛药图',
        '秭归紫釉碗盛药图': '秭归紫釉碗盛药图',
        '兴山紫釉碗盛药图': '兴山紫釉碗盛药图',
        '巴东紫釉碗盛药图': '巴东紫釉碗盛药图',
        '巫山紫釉碗盛药图': '巫山紫釉碗盛药图',
        '奉节紫釉碗盛药图': '奉节紫釉碗盛药图',
        '万县紫釉碗盛药图': '万县紫釉碗盛药图',
        '开县紫釉碗盛药图': '开县紫釉碗盛药图',
        '丰都紫釉碗盛药图': '丰都紫釉碗盛药图',
        '云阳紫釉碗盛药图': '云阳紫釉碗盛药图',
        '花招娣白衣搪瓷碗盛药图': '花招娣白衣搪瓷碗盛药图',
        '花迎娣黄衣搪瓷碗盛药图': '花迎娣黄衣搪瓷碗盛药图',
        '花念娣粉衣搪瓷碗盛药图': '花念娣粉衣搪瓷碗盛药图',
        '花盼娣青衣搪瓷碗盛药图': '花盼娣青衣搪瓷碗盛药图',
        '娘惹绿粉瓷碗盛药图': '娘惹绿粉瓷碗盛药图',
        '娘惹黄蓝瓷碗盛药图': '娘惹黄蓝瓷碗盛药图',
        '娘惹黄绿瓷碗盛药图': '娘惹黄绿瓷碗盛药图',
        '娘惹黄罗瓷碗盛药图': '娘惹黄罗瓷碗盛药图',
        '娘惹蓝绿瓷碗盛药图': '娘惹蓝绿瓷碗盛药图',
        '娘惹粉罗瓷碗盛药图': '娘惹粉罗瓷碗盛药图',
        '娘惹土粉瓷碗盛药图': '娘惹土粉瓷碗盛药图',
        '娘惹酱绿瓷碗盛药图': '娘惹酱绿瓷碗盛药图',
        '娘惹红黄瓷碗盛药图': '娘惹红黄瓷碗盛药图',
        '金山大埠瓷碗盛药图': '金山大埠瓷碗盛药图',
        '金山二埠瓷碗盛药图': '金山二埠瓷碗盛药图',
        '金山三埠瓷碗盛药图': '金山三埠瓷碗盛药图',
        '金山埠仔瓷碗盛药图': '金山埠仔瓷碗盛药图',
        '卑诗大埠瓷碗盛药图': '卑诗大埠瓷碗盛药图',
        '卑诗二埠瓷碗盛药图': '卑诗二埠瓷碗盛药图',
        '卑诗咸水埠瓷碗盛药图':'卑诗咸水埠瓷碗盛药图',
        '恻隐陶碗盛药图':'恻隐陶碗盛药图',
        '羞恶陶碗盛药图':'羞恶陶碗盛药图',
        '辞让陶碗盛药图':'辞让陶碗盛药图',
        '是非陶碗盛药图':'是非陶碗盛药图',
        '裂纹青黄手捏陶碗盛药图':'裂纹青黄手捏陶碗盛药图',
        '红纭手捏陶碗盛药图':'红纭手捏陶碗盛药图',
        '缺口墨斑纹手捏陶碗盛药图':'缺口墨斑纹手捏陶碗盛药图',
        '墨纭手捏陶碗盛药图':'墨纭手捏陶碗盛药图',
        '北海瓷碗盛药图':'北海瓷碗盛药图',
        '太平瓷碗盛药图':'太平瓷碗盛药图',
        '泗水瓷碗盛药图':'泗水瓷碗盛药图',
        '新山瓷碗盛药图':'新山瓷碗盛药图',
        '槟榔屿瓷碗盛药图':'槟榔屿瓷碗盛药图',
        '牡丹粉旗衣瓷碗盛药图':'牡丹粉旗衣瓷碗盛药图',
        '黄衣瓷碗盛药图':'黄衣瓷碗盛药图',
        '荷花粉旗衣瓷碗盛药图':'荷花粉旗衣瓷碗盛药图',
        '荷花紫旗衣瓷碗盛药图':'荷花紫旗衣瓷碗盛药图',
        '荷叶青旗衣瓷碗盛药图':'荷叶青旗衣瓷碗盛药图',
        '梅花红旗衣瓷碗盛药图':'梅花红旗衣瓷碗盛药图',
        '牡丹绿旗衣瓷碗盛药图':'牡丹绿旗衣瓷碗盛药图',
        '梅花紫旗衣瓷碗盛药图':'梅花紫旗衣瓷碗盛药图',
        '蓝边白旗衣瓷碗盛药图':'蓝边白旗衣瓷碗盛药图',
        '珊瑚碗盛水图':'珊瑚碗盛水图',
        '珊瑚橙碗盛水图':'珊瑚橙碗盛水图',
        '珊瑚青荷碗盛水图':'珊瑚青荷碗盛水图',
        '珊瑚红碗盛水图':'珊瑚红碗盛水图',
        '珊瑚蓝碗盛水图':'珊瑚蓝碗盛水图',
        '珊瑚素青碗盛水图':'珊瑚素青碗盛水图',
        '珊瑚黄碗盛水图':'珊瑚黄碗盛水图',
        '珊瑚墨蓝碗盛水图':'珊瑚墨蓝碗盛水图',
        '珊瑚青碗盛水图':'珊瑚青碗盛水图',
        '苔藓碗盛水图':'苔藓碗盛水图',
        '红釉桃子素碗盛水图':'红釉桃子素碗盛水图',
        '红釉大花素碗盛水图':'红釉大花素碗盛水图',

        '白陶碗<br>盛药图': '白陶碗<br>盛药图',
        '金叶纹铜碗<br>盛药图': '金叶纹铜碗<br>盛药图',
        '柔形白瓷碗<br>盛药图': '柔形白瓷碗<br>盛药图',
        '金边天蓝釉<br>瓷碗<br>盛药图': '金边天蓝釉<br>瓷碗<br>盛药图',
        '枯草地<br>白瓷碗<br>盛药图': '枯草地<br>白瓷碗<br>盛药图',
        '金环白瓷盘<br>盛药图': '金环白瓷盘<br>盛药图', 
        '紫地<br>高足白瓷碗<br>盛药图': '紫地<br>高足白瓷碗<br>盛药图', 
        '金边黑釉<br>扁陶碗<br>盛药图': '金边黑釉<br>扁陶碗<br>盛药图', 
        '金边墨蓝釉<br>陶碗<br>盛药图': '金边墨蓝釉<br>陶碗<br>盛药图',
        '素青瓷碗<br>盛药图': '素青瓷碗<br>盛药图',
        '大玻璃碗<br>盛药图': '大玻璃碗<br>盛药图', 
        '冰蓝釉褐边<br>厚碗<br>盛药图': '冰蓝釉褐边<br>厚碗<br>盛药图',
        '金地<br>黑边灰土碗<br>盛药图': '金地<br>黑边灰土碗<br>盛药图',
        '黄釉<br>喇叭瓷盘<br>盛药图': '黄釉<br>喇叭瓷盘<br>盛药图',
        '糯玉瓷碗<br>盛药图': '糯玉瓷碗<br>盛药图',
        '绿铁碗<br>盛药图': '绿铁碗<br>盛药图',
        '草地<br>金斑黑瓷碗<br>盛药图': '草地<br>金斑黑瓷碗<br>盛药图',
        '碎绿地<br>白瓷碗<br>盛药图': '碎绿地<br>白瓷碗<br>盛药图',
        '淤血白瓷碗<br>盛药图': '淤血白瓷碗<br>盛药图',
        '淤花纹<br>蓝底钵<br>盛药图': '淤花纹<br>蓝底钵<br>盛药图',
        '勾边<br>白花蓝碗<br>盛药图': '勾边<br>白花蓝碗<br>盛药图',
        '墨蓝深杯<br>盛药图': '墨蓝深杯<br>盛药图',
        '青碟<br>盛药图': '青碟<br>盛药图',
        '勾边青碟<br>盛药图': '勾边青碟<br>盛药图',
        '百褶蓝碗<br>盛药图': '百褶蓝碗<br>盛药图',
        '之字<br>白瓷碗<br>盛药图': '之字<br>白瓷碗<br>盛药图',
        '乎字<br>白瓷碗<br>盛药图': '乎字<br>白瓷碗<br>盛药图',
        '者字<br>白瓷碗<br>盛药图': '者字<br>白瓷碗<br>盛药图',
        '也字<br>白瓷碗<br>盛药图': '也字<br>白瓷碗<br>盛药图',
        '回字第一形<br>陶碗<br>盛药图': '回字第一形<br>陶碗<br>盛药图',
        '回字第二形<br>陶碗<br>盛药图': '回字第二形<br>陶碗<br>盛药图',
        '回字第三形<br>陶碗<br>盛药图': '回字第三形<br>陶碗<br>盛药图',
        '回字第四形<br>陶碗<br>盛药图': '回字第四形<br>陶碗<br>盛药图',
        '天字<br>红碗<br>盛药图': '天字<br>红碗<br>盛药图',
        '地字<br>红碗<br>盛药图': '地字<br>红碗<br>盛药图',
        '君字<br>红碗<br>盛药图': '君字<br>红碗<br>盛药图',
        '亲字<br>红碗<br>盛药图': '亲字<br>红碗<br>盛药图',
        '师字<br>红碗<br>盛药图': '师字<br>红碗<br>盛药图',
        '秭归<br>紫釉碗<br>盛药图': '秭归<br>紫釉碗<br>盛药图',
        '兴山<br>紫釉碗<br>盛药图': '兴山<br>紫釉碗<br>盛药图',
        '巴东<br>紫釉碗<br>盛药图': '巴东<br>紫釉碗<br>盛药图',
        '巫山<br>紫釉碗<br>盛药图': '巫山<br>紫釉碗<br>盛药图',
        '奉节<br>紫釉碗<br>盛药图': '奉节<br>紫釉碗<br>盛药图',
        '万县<br>紫釉碗<br>盛药图': '万县<br>紫釉碗<br>盛药图',
        '开县<br>紫釉碗<br>盛药图': '开县<br>紫釉碗<br>盛药图',
        '丰都<br>紫釉碗<br>盛药图': '丰都<br>紫釉碗<br>盛药图',
        '云阳<br>紫釉碗<br>盛药图': '云阳<br>紫釉碗<br>盛药图',
        '花招娣<br>白衣搪瓷碗<br>盛药图': '花招娣<br>白衣搪瓷碗<br>盛药图',
        '花迎娣<br>黄衣搪瓷碗<br>盛药图': '花迎娣<br>黄衣搪瓷碗<br>盛药图',
        '花念娣<br>粉衣搪瓷碗<br>盛药图': '花念娣<br>粉衣搪瓷碗<br>盛药图',
        '花盼娣<br>青衣搪瓷碗<br>盛药图': '花盼娣<br>青衣搪瓷碗<br>盛药图',
        '娘惹<br>绿粉瓷碗<br>盛药图': '娘惹<br>绿粉瓷碗<br>盛药图',
        '娘惹<br>黄蓝瓷碗<br>盛药图': '娘惹<br>黄蓝瓷碗<br>盛药图',
        '娘惹<br>黄绿瓷碗<br>盛药图': '娘惹<br>黄绿瓷碗<br>盛药图',
        '娘惹<br>黄罗瓷碗<br>盛药图': '娘惹<br>黄罗瓷碗<br>盛药图',
        '娘惹<br>蓝绿瓷碗<br>盛药图': '娘惹<br>蓝绿瓷碗<br>盛药图',
        '娘惹<br>粉罗瓷碗<br>盛药图': '娘惹<br>粉罗瓷碗<br>盛药图',
        '娘惹<br>土粉瓷碗<br>盛药图': '娘惹<br>土粉瓷碗<br>盛药图',
        '娘惹<br>酱绿瓷碗<br>盛药图': '娘惹<br>酱绿瓷碗<br>盛药图',
        '娘惹<br>红黄瓷碗<br>盛药图': '娘惹<br>红黄瓷碗<br>盛药图',
        '金山大埠<br>瓷碗<br>盛药图': '金山大埠<br>瓷碗<br>盛药图',
        '金山二埠<br>瓷碗<br>盛药图': '金山二埠<br>瓷碗<br>盛药图',
        '金山三埠<br>瓷碗<br>盛药图': '金山三埠<br>瓷碗<br>盛药图',
        '金山埠仔<br>瓷碗<br>盛药图': '金山埠仔<br>瓷碗<br>盛药图',
        '卑诗大埠<br>瓷碗<br>盛药图': '卑诗大埠<br>瓷碗<br>盛药图',
        '卑诗二埠<br>瓷碗<br>盛药图': '卑诗二埠<br>瓷碗<br>盛药图',
        '卑诗咸水埠<br>瓷碗<br>盛药图':'卑诗咸水埠<br>瓷碗<br>盛药图',
        '恻隐<br>陶碗<br>盛药图':'恻隐<br>陶碗<br>盛药图',
        '羞恶<br>陶碗<br>盛药图':'羞恶<br>陶碗<br>盛药图',
        '辞让<br>陶碗<br>盛药图':'辞让<br>陶碗<br>盛药图',
        '是非<br>陶碗<br>盛药图':'是非<br>陶碗<br>盛药图',
        '裂纹青黄<br>手捏陶碗<br>盛药图':'裂纹青黄<br>手捏陶碗<br>盛药图',
        '红纭<br>手捏陶碗<br>盛药图':'红纭<br>手捏陶碗<br>盛药图',
        '缺口墨斑纹<br>手捏陶碗<br>盛药图':'缺口墨斑纹<br>手捏陶碗<br>盛药图',
        '墨纭<br>手捏陶碗<br>盛药图':'墨纭<br>手捏陶碗<br>盛药图',
        '北海<br>瓷碗<br>盛药图':'北海<br>瓷碗<br>盛药图',
        '太平<br>瓷碗<br>盛药图':'太平<br>瓷碗<br>盛药图',
        '泗水<br>瓷碗<br>盛药图':'泗水<br>瓷碗<br>盛药图',
        '新山<br>瓷碗<br>盛药图':'新山<br>瓷碗<br>盛药图',
        '槟榔屿<br>瓷碗<br>盛药图':'槟榔屿<br>瓷碗<br>盛药图',
        '牡丹粉旗衣<br>瓷碗<br>盛药图':'牡丹粉旗衣<br>瓷碗<br>盛药图',
        '黄衣瓷碗<br>盛药图':'黄衣瓷碗<br>盛药图',
        '荷花粉旗衣<br>瓷碗<br>盛药图':'荷花粉旗衣<br>瓷碗<br>盛药图',
        '荷花紫旗衣<br>瓷碗<br>盛药图':'荷花紫旗衣<br>瓷碗<br>盛药图',
        '荷叶青旗衣<br>瓷碗<br>盛药图':'荷叶青旗衣<br>瓷碗<br>盛药图',
        '梅花红旗衣<br>瓷碗<br>盛药图':'梅花红旗衣<br>瓷碗<br>盛药图',
        '牡丹绿旗衣<br>瓷碗<br>盛药图':'牡丹绿旗衣<br>瓷碗<br>盛药图',
        '梅花紫旗衣<br>瓷碗<br>盛药图':'梅花紫旗衣<br>瓷碗<br>盛药图',
        '蓝边白旗衣<br>瓷碗<br>盛药图':'蓝边白旗衣<br>瓷碗<br>盛药图',
        '珊瑚碗<br>盛水图':'珊瑚碗<br>盛水图',
        '珊瑚橙碗<br>盛水图':'珊瑚橙碗<br>盛水图',
        '珊瑚青荷碗<br>盛水图':'珊瑚青荷碗<br>盛水图',
        '珊瑚红碗<br>盛水图':'珊瑚红碗<br>盛水图',
        '珊瑚蓝碗<br>盛水图':'珊瑚蓝碗<br>盛水图',
        '珊瑚素青碗<br>盛水图':'珊瑚素青碗<br>盛水图',
        '珊瑚黄碗<br>盛水图':'珊瑚黄碗<br>盛水图',
        '珊瑚墨蓝碗<br>盛水图':'珊瑚墨蓝碗<br>盛水图',
        '珊瑚青碗<br>盛水图':'珊瑚青碗<br>盛水图',
        '苔藓碗<br>盛水图':'苔藓碗<br>盛水图',
        '红釉桃子<br>素碗<br>盛水图':'红釉桃子<br>素碗<br>盛水图',
        '红釉大花<br>素碗<br>盛水图':'红釉大花<br>素碗<br>盛水图',

    },
    'en': {
        'title': 'MedicineBowl',
        'subtitle': 'MedicineBowl',
        'name': 'Name',
        'back': 'Back',
        'listpage': 'List Page',
        'switch-lang': '中文',
        'switch-lang2': '中文',
        'Repetition': 'Repetition',
        'Gaze': 'Gaze',
        'shenbai': 'Shenbai',
        'tcm-title': 'MedicineBowl',
        'abm-title': 'Shenbai',
        'site-title': 'SHENBAI',
        'nav-works': 'Works',
        'works-slogan': 'A river of Chinese life memory',
        'tcm-title-mobile': 'MedBowl',
        'tcm-slogan': 'Memories of Chinese Life',
        'tcm-words': 'One big river, billion small bowls',
        'about-name': 'Hu Shenbai',
        'about-intro': '<br><br>An audience-ism artist. His work draws on Habermas’s concepts of the public sphere and communicative rationality, using art to present and reach toward better social relations.',
        'about-bio': '<br><br>Background<br><br>Graduated from the School of Arts, Sichuan University.<br>Former visual designer at Tencent (Shenzhen).<br>Former UX and brand designer at Shopee (Singapore).',
        'about-exhibitions': '<br><br>Exhibitions<br><br>2025, Oriental Plants, Kongzhou Art Museum, Chengdu<br>2025, Scent Art Festival, Latvia<br>2026, Still work, Exquisite Tea, Chengdu',
        'nav-prev': 'Previous',
        'nav-next': 'Next',
        '404-heading': '404',
        '404-message': 'Sorry, the page you are visiting does not exist. But I invite you to take some medicine.',
        '404-back': 'Back Home',
        'work': 'Works',
        "之乎者也": "Zhi, Hu, Zhe, Ye",
        "之乎者也-description": "The MedicineBowl project explores ethnic identity in a globalized world. Instead of using one fixed symbol, the artist brings together many small bowls, each representing a personal experience. Together, they form a shared sense of identity that reflects diversity rather than a single, simplified image.",
        
        "孔乙己": "Kong Yijie",
        "孔乙己-heading": "Kong Yijie<br>Four ways to write Hui",
        "孔乙己-description": "When traditional culture is passed down as an inheritance, people face the question of how to internalize it as part of their own life stance, while also considering whether to follow these cultural norms in interactions with others. This raises the question of whether these cultural norms should be followed in daily life.",
        "移民": "Migration",
        "移民-description": "In modern times, coastal Chinese communities went abroad under economic pressure and social upheaval, forming diaspora settlements across Southeast Asia. At the same time, laborers were sent to the Americas through contract recruitment or forced transport to work on railroads and in mines. These migrants named their new settlements in Chinese, building shared memory and cultural coordinates for overseas Chinese communities.",
    
        "儒家": "Confucianism",
        "儒家-description": "Heaven, Earth, Lord, Parent, and Teacher is a traditional Confucian framework that organizes Chinese society through hierarchy, linking the cosmos, politics, and family. Within this system, the individual is positioned as subordinate, leaving little space for personal subjectivity.",
        "女性": "Women",
        "女性-description": "The Lingrong Bowls use costumes worn by Lingrong in the TV drama Zhenhuan Zhuan as bowl patterns. These costumes symbolize her efforts to adapt and cope at different stages of life. Yet this ongoing self-sacrifice does not bring her happiness or freedom, and she ultimately sees her life as one of exhaustion.",

        '木板油彩': 'Oil on wood',
        '帆布油彩': 'Oil on canvas',
        '申白持有': 'Artist Holding',
        '已收藏': 'Collected',
        'serialnumber': 'Serial No.',
        "detail-TCMmain": "The MedicineBowl is a repeat behavior art of painting Chinese medicine, which requires me to paint billion ones. I think the definition of Chinese people is a nation that takes Chinese medicine. We need many, many bowls of medicine.",
        'loading': 'Loading...',
        'exhibitions': 'Track',
        '申白工作室': 'Artist\'s workshop',
        'One\'s 咖啡店': 'One\'s Coffee',
        '成都': 'Chengdu',

        '推荐': 'Recommend',
        '表达': 'Voice',
        '判断': 'Judge',    
        '烤火': 'Heat',
        '尝试': 'Try',
        '抓握': 'Grasp',
        '介绍': 'Introduce',
        '聊天': 'Chat',
        '等待': 'Waiting',
        '留意': 'Notice',

        '明珠薏苡': 'Pearl Barley Sand series',
        '四川女人': 'Sichuan Woman series',
        'tcm-group2': 'Classical affix characters bowl with medicine',
        'tcm-group3': 'Four Hui characters bowl with medicine',
        'tcm-group4': 'Confucianism Five worship characters bowl with medicine',
        'tcm-group5': 'Three-Gorges nine villages bowl with medicine',
        'tcm-group6': 'Elder sisters bowl with medicine',
        'tcm-group7': 'Southeast Asia Nyonya bowl with medicine',
        'tcm-group8': 'San Francisco towns bowl with medicine',
        'tcm-group9': 'British Columbia towns bowl with medicine',
        'tcm-group10': 'Confucianism Four beginning characters bowl with medicine',
        'tcm-group11': 'Southeast Asia towns bowl with medicine',
        'tcm-group12': 'An Lingrong bowl with medicine',
        'tcm-group13': 'Coral bowl with water',
        'tcm-group14': 'Moss bowl with water',
        'tcm-group15': 'Glazed bowl with water',
        'ones-coffee-shop': "One's Coffee",

        '白陶碗盛药图': 'White pottery bowl with medicine',
        '金叶纹铜碗盛药图': 'Gold-leaf pattern bronze bowl with medicine',
        '柔形白瓷碗盛药图': 'Soft-body white porcelain bowl with medicine',
        '金边天蓝釉瓷碗盛药图': 'Gold-rim sky-blue glaze porcelain bowl with medicine',
        '枯草地白瓷碗盛药图': 'Drygrass ground white porcelain bowl with medicine',
        '金环白瓷盘盛药图': 'Gold-ring white porcelain plate with medicine',
        '紫地高足白瓷碗盛药图': 'Purple ground high-footed white porcelain bowl with medicine',
        '金边黑釉扁陶碗盛药图': 'Gold-rim black-glazed flat pottery bowl with medicine',
        '金边墨蓝釉陶碗盛药图': 'Gold-rim black-blue glaze pottery bowl with medicine',
        '素青瓷碗盛药图': 'Plain-blue porcelain bowl with medicine',
        '大玻璃碗盛药图': 'Large glass bowl with medicine',
        '冰蓝釉褐边厚碗盛药图': 'Ice-blue glaze brown-rim thick porcelain bowl with medicine',
        '金地黑边灰土碗盛药图': 'Gold ground black-rim gray-soil bowl with medicine',
        '黄釉喇叭瓷盘盛药图': 'Yellow glaze trumpet porcelain plate with medicine',
        '糯玉瓷碗盛药图': 'Glutinous jade porcelain bowl with medicine',
        '绿铁碗盛药图': 'Green iron bowl with medicine',
        '草地金斑黑瓷碗盛药图': 'Grass ground gold-speckle black porcelain bowl with medicine',
        '碎绿地白瓷碗盛药图': 'sprinkle green ground white porcelain bowl with medicine',
        '淤血白瓷碗盛药图': 'Bruise white porcelain bowl with medicine',
        '淤花纹蓝底钵盛药图': 'Bruise blue-bottomed bowl with medicine',
        '勾边白花蓝碗盛药图': 'Border white flower blue bowl with medicine',
        '墨蓝深杯盛药图': 'Deep blue cup with medicine',
        '青碟盛药图': 'Green plate with medicine',
        '勾边青碟盛药图': 'Border green plate with medicine',
        '百褶蓝碗盛药图': 'Hundred pleat blue bowl with medicine',
        '之字白瓷碗盛药图': 'Zi symbol white porcelain bowl with medicine',
        '乎字白瓷碗盛药图': 'Hu symbol white porcelain bowl with medicine',
        '者字白瓷碗盛药图': 'Zhe symbol white porcelain bowl with medicine',
        '也字白瓷碗盛药图': 'Ye symbol white porcelain bowl with medicine',
        '回字第一形陶碗盛药图': 'Hui symbol first-style pottery bowl with medicine',
        '回字第二形陶碗盛药图': 'Hui symbol second-style pottery bowl with medicine',
        '回字第三形陶碗盛药图': 'Hui symbol third-style pottery bowl with medicine',
        '回字第四形陶碗盛药图': 'Hui symbol fourth-style pottery bowl with medicine',
        '天字红碗盛药图': 'Sky symbol red bowl with medicine',
        '地字红碗盛药图': 'Land symbol red bowl with medicine',
        '君字红碗盛药图': 'Lord symbol red bowl with medicine',
        '亲字红碗盛药图': 'Parent symbol red bowl with medicine',
        '师字红碗盛药图': 'Master symbol red bowl with medicine',
        '秭归紫釉碗盛药图': 'Zigui purple bowl with medicine',
        '兴山紫釉碗盛药图': 'Xingshan purple bowl with medicine',
        '巴东紫釉碗盛药图': 'Badong purple bowl with medicine',
        '巫山紫釉碗盛药图': 'Wushan purple bowl with medicine',
        '奉节紫釉碗盛药图': 'Fengjie purple bowl with medicine',
        '万县紫釉碗盛药图': 'Wanxian purple bowl with medicine',
        '开县紫釉碗盛药图': 'Kaixian purple bowl with medicine',
        '丰都紫釉碗盛药图': 'Fengdu purple bowl with medicine',
        '云阳紫釉碗盛药图': 'Yunyang purple bowl with medicine',
        '花招娣白衣搪瓷碗盛药图': 'Zhaodi white enamel bowl with medicine',
        '花迎娣黄衣搪瓷碗盛药图': 'Yingdi yellow enamel bowl with medicine',
        '花念娣粉衣搪瓷碗盛药图': 'Niandi pink enamel bowl with medicine',
        '花盼娣青衣搪瓷碗盛药图': 'Pandi green enamel bowl with medicine',
        '娘惹绿粉瓷碗盛药图': 'Nyonya green pink porcelain bowl with medicine',
        '娘惹黄蓝瓷碗盛药图': 'Nyonya yellow blue porcelain bowl with medicine',
        '娘惹黄绿瓷碗盛药图': 'Nyonya yellow green porcelain bowl with medicine',
        '娘惹黄罗瓷碗盛药图': 'Nyonya yellow orchid porcelain bowl with medicine',
        '娘惹蓝绿瓷碗盛药图': 'Nyonya blue green porcelain bowl with medicine',
        '娘惹粉罗瓷碗盛药图': 'Nyonya pink orchid porcelain bowl with medicine',
        '娘惹土粉瓷碗盛药图': 'Nyonya khaki pink porcelain bowl with medicine',
        '娘惹酱绿瓷碗盛药图': 'Nyonya deep-red green porcelain bowl with medicine',
        '娘惹红黄瓷碗盛药图': 'Nyonya red yellow porcelain bowl with medicine',
        '金山大埠瓷碗盛药图': 'Dai Fow San Francisco porcelain bowl with medicine',
        '金山二埠瓷碗盛药图': 'Yee Fow San Francisco porcelain bowl with medicine',
        '金山三埠瓷碗盛药图': 'Sam Fow San Francisco porcelain bowl with medicine',
        '金山埠仔瓷碗盛药图': 'Fow Jai San Francisco porcelain bowl with medicine',
        '卑诗大埠瓷碗盛药图': 'Dai Fow British Columbia porcelain bowl with medicine',
        '卑诗二埠瓷碗盛药图': 'Yee Fow British Columbia porcelain bowl with medicine',
        '卑诗咸水埠瓷碗盛药图':'Haam-Sui Fow British Columbia porcelain bowl with medicine',
        '恻隐陶碗盛药图':'Compassion pottery bowl with medicine',
        '羞恶陶碗盛药图':'Shame-Disgust pottery bowl with medicine',
        '辞让陶碗盛药图':'Deference pottery bowl with medicine',
        '是非陶碗盛药图':'Right-Wrong pottery bowl with medicine',
        '裂纹青黄手捏陶碗盛药图':'Cracked green yellow hand-knead pottery bowl with medicine',
        '红纭手捏陶碗盛药图':'Red hand-knead pottery bowl with medicine',
        '缺口墨斑纹手捏陶碗盛药图':'Notched black spot hand-knead pottery bowl with medicine',
        '墨纭手捏陶碗盛药图':'Black hand-knead pottery bowl with medicine',
        '北海瓷碗盛药图':'Butterworth porcelain bowl with medicine',
        '太平瓷碗盛药图':'Taiping porcelain bowl with medicine',
        '泗水瓷碗盛药图':'Surabaya porcelain bowl with medicine',
        '新山瓷碗盛药图':'Johor Bahru porcelain bowl with medicine',
        '槟榔屿瓷碗盛药图':'Penang island porcelain bowl with medicine',
        '牡丹粉旗衣瓷碗盛药图':'Peony pink dress porcelain bowl with medicine',
        '黄衣瓷碗盛药图':'Yellow dress porcelain bowl with medicine',
        '荷花粉旗衣瓷碗盛药图':'Lotus pink dress porcelain bowl with medicine',
        '荷花紫旗衣瓷碗盛药图':'Lotus purple dress porcelain bowl with medicine',
        '荷叶青旗衣瓷碗盛药图':'Lotus green dress porcelain bowl with medicine',
        '梅花红旗衣瓷碗盛药图':'Plum-flower red dress porcelain bowl with medicine',
        '牡丹绿旗衣瓷碗盛药图':'Peony green dress porcelain bowl with medicine',
        '梅花紫旗衣瓷碗盛药图':'Plum-flower purple dress porcelain bowl with medicine',
        '蓝边白旗衣瓷碗盛药图':'Blue-rim white dress porcelain bowl with medicine',
        '珊瑚碗盛水图':'Coral bowl with water',
        '珊瑚橙碗盛水图':'Coral orange bowl with water',
        '珊瑚青荷碗盛水图':'Coral lotus green bowl with water',
        '珊瑚红碗盛水图':'Coral red bowl with water',
        '珊瑚蓝碗盛水图':'Coral blue bowl with water',
        '珊瑚素青碗盛水图':'Coral white-blue bowl with water',
        '珊瑚黄碗盛水图':'Coral yellow bowl with water',
        '珊瑚墨蓝碗盛水图':'Coral deep-blue bowl with water',
        '珊瑚青碗盛水图':'Coral blue-green bowl with water',
        '苔藓碗盛水图':'Moss bowl with water',
        '红釉桃子素碗盛水图':'Red glaze peach white bowl with water',
        '红釉大花素碗盛水图':'Red glaze big flower white bowl with water',

        '白陶碗<br>盛药图': 'White pottery bowl with medicine',
        '金叶纹铜碗<br>盛药图': 'Gold-leaf pattern bronze bowl with medicine',
        '柔形白瓷碗<br>盛药图': 'Soft-body white porcelain bowl with medicine',
        '金边天蓝釉<br>瓷碗<br>盛药图': 'Gold-rim skyblue porcelain bowl with medicine',
        '枯草地<br>白瓷碗<br>盛药图': 'Drygrass ground white porcelain bowl with medicine',
        '金环白瓷盘<br>盛药图': 'Gold-ring white porcelain plate with medicine',
        '紫地<br>高足白瓷碗<br>盛药图': 'Purple ground high-foot white porcelain bowl with medicine',
        '金边黑釉<br>扁陶碗<br>盛药图': 'Gold-rim black flat pottery bowl with medicine',
        '金边墨蓝釉<br>陶碗<br>盛药图': 'Gold-rim deep-blue pottery bowl with medicine',
        '素青瓷碗<br>盛药图': 'Plain blue porcelain bowl with medicine',
        '大玻璃碗<br>盛药图': 'Large glass bowl with medicine',
        '冰蓝釉褐边<br>厚碗<br>盛药图': 'Ice-blue brown-rim thick porcelain bowl with medicine',
        '金地<br>黑边灰土碗<br>盛药图': 'Gold ground black-rim gray-soil bowl with medicine',
        '黄釉<br>喇叭瓷盘<br>盛药图': 'Yellow trumpet porcelain plate with medicine',
        '糯玉瓷碗<br>盛药图': 'Glutinous jade porcelain bowl with medicine',
        '绿铁碗<br>盛药图': 'Green iron bowl with medicine',
        '草地<br>金斑黑瓷碗<br>盛药图': 'Grass ground gold-speckle black porcelain bowl with medicine',
        '碎绿地<br>白瓷碗<br>盛药图': 'Sprinkle green ground white porcelain bowl with medicine',
        '淤血白瓷碗<br>盛药图': 'Bruise white porcelain bowl with medicine',
        '淤花纹<br>蓝底钵<br>盛药图': 'Bruise blue-bottomed bowl with medicine',
        '勾边<br>白花蓝碗<br>盛药图': 'Border white flower blue bowl with medicine',
        '墨蓝深杯<br>盛药图': 'Deep blue cup with medicine',
        '青碟<br>盛药图': 'Green plate with medicine',
        '勾边青碟<br>盛药图': 'Border green plate with medicine',
        '百褶蓝碗<br>盛药图': 'Hundred pleat blue bowl with medicine',
        '之字<br>白瓷碗<br>盛药图': 'Zi symbol white porcelain bowl with medicine',
        '乎字<br>白瓷碗<br>盛药图': 'Hu symbol white porcelain bowl with medicine',
        '者字<br>白瓷碗<br>盛药图': 'Zhe symbol white porcelain bowl with medicine',
        '也字<br>白瓷碗<br>盛药图': 'Ye symbol white porcelain bowl with medicine',
        '回字第一形<br>陶碗<br>盛药图': 'Hui symbol first-style pottery bowl with medicine',
        '回字第二形<br>陶碗<br>盛药图': 'Hui symbol second-style pottery bowl with medicine',
        '回字第三形<br>陶碗<br>盛药图': 'Hui symbol third-style pottery bowl with medicine',
        '回字第四形<br>陶碗<br>盛药图': 'Hui symbol fourth-style pottery bowl with medicine',
        '天字<br>红碗<br>盛药图': 'Sky symbol red bowl with medicine',
        '地字<br>红碗<br>盛药图': 'Land symbol red bowl with medicine',
        '君字<br>红碗<br>盛药图': 'Lord symbol red bowl with medicine',
        '亲字<br>红碗<br>盛药图': 'Parent symbol red bowl with medicine',
        '师字<br>红碗<br>盛药图': 'Master symbol red bowl with medicine',
        '秭归<br>紫釉碗<br>盛药图': 'Zigui purple bowl with medicine',
        '兴山<br>紫釉碗<br>盛药图': 'Xingshan purple bowl with medicine',
        '巴东<br>紫釉碗<br>盛药图': 'Badong purple bowl with medicine',
        '巫山<br>紫釉碗<br>盛药图': 'Wushan purple bowl with medicine',
        '奉节<br>紫釉碗<br>盛药图': 'Fengjie purple bowl with medicine',
        '万县<br>紫釉碗<br>盛药图': 'Wanxian purple bowl with medicine',
        '开县<br>紫釉碗<br>盛药图': 'Kaixian purple bowl with medicine',
        '丰都<br>紫釉碗<br>盛药图': 'Fengdu purple bowl with medicine',
        '云阳<br>紫釉碗<br>盛药图': 'Yunyang purple bowl with medicine',
        '花招娣<br>白衣搪瓷碗<br>盛药图': 'Zhaodi white enamel bowl with medicine',
        '花迎娣<br>黄衣搪瓷碗<br>盛药图': 'Yingdi yellow enamel bowl with medicine',
        '花念娣<br>粉衣搪瓷碗<br>盛药图': 'Niandi pink enamel bowl with medicine',
        '花盼娣<br>青衣搪瓷碗<br>盛药图': 'Pandi green enamel bowl with medicine',
        '娘惹<br>绿粉瓷碗<br>盛药图': 'Nyonya green pink porcelain bowl with medicine',
        '娘惹<br>黄蓝瓷碗<br>盛药图': 'Nyonya yellow blue porcelain bowl with medicine',
        '娘惹<br>黄绿瓷碗<br>盛药图': 'Nyonya yellow green porcelain bowl with medicine',
        '娘惹<br>黄罗瓷碗<br>盛药图': 'Nyonya yellow orchid porcelain bowl with medicine',
        '娘惹<br>蓝绿瓷碗<br>盛药图': 'Nyonya blue green porcelain bowl with medicine',
        '娘惹<br>粉罗瓷碗<br>盛药图': 'Nyonya pink orchid porcelain bowl with medicine',
        '娘惹<br>土粉瓷碗<br>盛药图': 'Nyonya khaki pink porcelain bowl with medicine',
        '娘惹<br>酱绿瓷碗<br>盛药图': 'Nyonya deep-red green porcelain bowl with medicine',
        '娘惹<br>红黄瓷碗<br>盛药图': 'Nyonya red yellow porcelain bowl with medicine',
        '金山大埠<br>瓷碗<br>盛药图': 'Dai Fow San Francisco porcelain bowl with medicine',
        '金山二埠<br>瓷碗<br>盛药图': 'Yee Fow San Francisco porcelain bowl with medicine',
        '金山三埠<br>瓷碗<br>盛药图': 'Sam Fow San Francisco porcelain bowl with medicine',
        '金山埠仔<br>瓷碗<br>盛药图': 'Fow Jai San Francisco porcelain bowl with medicine',
        '卑诗大埠<br>瓷碗<br>盛药图': 'Dai Fow British Columbia porcelain bowl with medicine',
        '卑诗二埠<br>瓷碗<br>盛药图': 'Yee Fow British Columbia porcelain bowl with medicine',
        '卑诗咸水埠<br>瓷碗<br>盛药图':'Haam-Sui Fow British Columbia porcelain bowl with medicine',
        '恻隐<br>陶碗<br>盛药图':'Compassion pottery bowl with medicine',
        '羞恶<br>陶碗<br>盛药图':'Shame-Disgust pottery bowl with medicine',
        '辞让<br>陶碗<br>盛药图':'Deference pottery bowl with medicine',
        '是非<br>陶碗<br>盛药图':'Right-Wrong pottery bowl with medicine',
        '裂纹青黄<br>手捏陶碗<br>盛药图':'Cracked green yellow hand-knead pottery bowl with medicine',
        '红纭<br>手捏陶碗<br>盛药图':'Red hand-knead pottery bowl with medicine',
        '缺口墨斑纹<br>手捏陶碗<br>盛药图':'Notched black spot hand-knead pottery bowl with medicine',
        '墨纭<br>手捏陶碗<br>盛药图':'Black hand-knead pottery bowl with medicine',

        '北海<br>瓷碗<br>盛药图':'Butterworth porcelain bowl with medicine',
        '太平<br>瓷碗<br>盛药图':'Taiping porcelain bowl with medicine',
        '泗水<br>瓷碗<br>盛药图':'Surabaya porcelain bowl with medicine',
        '新山<br>瓷碗<br>盛药图':'Johor Bahru porcelain bowl with medicine',
        '槟榔屿<br>瓷碗<br>盛药图':'Penang island porcelain bowl with medicine',

        '牡丹粉旗衣<br>瓷碗<br>盛药图':'Peony pink dress porcelain bowl with medicine',
        '黄衣瓷碗<br>盛药图':'Yellow dress porcelain bowl with medicine',
        '荷花粉旗衣<br>瓷碗<br>盛药图':'Lotus pink dress porcelain bowl with medicine',
        '荷花紫旗衣<br>瓷碗<br>盛药图':'Lotus purple dress porcelain bowl with medicine',
        '荷叶青旗衣<br>瓷碗<br>盛药图':'Lotus green dress porcelain bowl with medicine',
        '梅花红旗衣<br>瓷碗<br>盛药图':'Plum-flower red dress porcelain bowl with medicine',
        '牡丹绿旗衣<br>瓷碗<br>盛药图':'Peony green dress porcelain bowl with medicine',
        '梅花紫旗衣<br>瓷碗<br>盛药图':'Plum-flower purple dress porcelain bowl with medicine',
        '蓝边白旗衣<br>瓷碗<br>盛药图':'Blue-rim white dress porcelain bowl with medicine',
        '珊瑚碗<br>盛水图':'Coral bowl with water',
        '珊瑚橙碗<br>盛水图':'Coral orange bowl with water',
        '珊瑚青荷碗<br>盛水图':'Coral lotus green bowl with water',
        '珊瑚红碗<br>盛水图':'Coral red bowl with water',
        '珊瑚蓝碗<br>盛水图':'Coral blue bowl with water',
        '珊瑚素青碗<br>盛水图':'Coral white-blue bowl with water',
        '珊瑚黄碗<br>盛水图':'Coral yellow bowl with water',
        '珊瑚墨蓝碗<br>盛水图':'Coral deep-blue bowl with water',
        '珊瑚青碗<br>盛水图':'Coral blue-green bowl with water',
        '苔藓碗<br>盛水图':'Moss bowl with water',
        '红釉桃子<br>素碗<br>盛水图':'Red glaze peach white bowl with water',
        '红釉大花<br>素碗<br>盛水图':'Red glaze big flower white bowl with water',

    }
}; 

// 返回上一页函数
function goBack() {
    // 如果有上一页历史记录，则返回上一页
    if (window.history.length > 1 && document.referrer) {
        window.history.back();
    } else {
        // 如果没有上一页，则返回首页
        window.location.href = '/';
    }
}