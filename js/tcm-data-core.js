// 良药系列：数据结构与构建工具
const TCM_ARTWORK_DEFAULTS = {
    series: '明珠薏苡',
    media: '木板油彩',
    width: 20,
    height: 20,
    depth: 2.3,
    coefficient: 60,
    weight: '250 g',
    year: 2024,
    date: '2024-11-20',
    state: 0,
};

const TCM_GROUP_META = {
    "group1": {
        "titleKey": "work"
    },
    "group2": {
        "titleKey": "tcm-group2"
    },
    "group3": {
        "titleKey": "tcm-group3"
    },
    "group4": {
        "titleKey": "tcm-group4"
    },
    "group5": {
        "titleKey": "tcm-group5"
    },
    "group6": {
        "titleKey": "tcm-group6"
    },
    "group7": {
        "titleKey": "tcm-group7"
    },
    "group8": {
        "titleKey": "tcm-group8",
        "defaults": {
            "year": 2025,
            "date": "2025-04-12"
        }
    },
    "group9": {
        "titleKey": "tcm-group9",
        "defaults": {
            "year": 2025,
            "date": "2025-04-12"
        }
    },
    "group10": {
        "titleKey": "tcm-group10",
        "defaults": {
            "year": 2025,
            "date": "2025-04-14"
        }
    },
    "group11": {
        "titleKey": "tcm-group11",
        "defaults": {
            "year": 2025,
            "date": "2025-06-19"
        }
    },
    "group12": {
        "titleKey": "tcm-group12",
        "defaults": {
            "year": 2025,
            "date": "2025-06-19"
        }
    },
    "group13": {
        "titleKey": "tcm-group13",
        "defaults": {
            "year": 2025,
            "date": "2025-12-20"
        }
    },
    "group14": {
        "titleKey": "tcm-group14",
        "defaults": {
            "year": 2025,
            "date": "2025-12-20"
        }
    },
    "group15": {
        "titleKey": "tcm-group15",
        "defaults": {
            "year": 2025,
            "date": "2025-12-20"
        }
    }
};

function lang(key) {
    return { 'data-lang': key };
}

function buildArtwork({ image, serialnumber, title, title2, groupDefaults = {}, overrides = {} }) {
    const merged = { ...TCM_ARTWORK_DEFAULTS, ...groupDefaults, ...overrides };

    return {
        image,
        title: lang(title),
        title2: lang(title2),
        serialnumber,
        series: lang(TCM_ARTWORK_DEFAULTS.series),
        media: lang(TCM_ARTWORK_DEFAULTS.media),
        width: merged.width,
        height: merged.height,
        depth: merged.depth,
        coefficient: merged.coefficient,
        weight: merged.weight,
        year: merged.year,
        date: merged.date,
        state: merged.state,
    };
}

function buildGroupedArtworks(catalog) {
    const grouped = {};
    for (const group of catalog) {
        const groupDefaults = group.defaults || {};
        grouped[group.id] = group.items.map(item => buildArtwork({
            image: item.image,
            serialnumber: item.serialnumber,
            title: item.title,
            title2: item.title2,
            groupDefaults,
            overrides: item.overrides || {},
        }));
    }
    return grouped;
}
