const nameList: string[] = [
    "飄零燕",
    "飄零燕",
    "飄零燕",
    "飄零燕",
    "飄零燕",
    "飄零燕",
    "飄零燕",
    "囍囍囍",
    "囍囍囍",
    "囍囍囍",
    "囍囍囍",
    "英华",
    "鱼雷",
    "YGG",
    "RAY",
    "嘿嘿嘿",
    "阿卡夏",
    "拉薩密",
    "索羅斯",
    "GGYY",
    "Player195",
    "Player195",
    "翱翔之翼",
    "Peter凶",
    "Peter兄",
    "琉璃玥",
    "OZY",
    "YGG",
    "YGG",
    "YGG",
];

const modList: string[] = [
    "威武",
    "威武",
    "威武",
    "超强",
    "超强",
    "超强",
    "牛逼",
    "在睡觉",
    "想不开",
    "霸气",
    "超绝",
    "大哥",
    "大姐",
    "老大",
    "超帅",
    "挂逼",
    "金标",
    "啦啦队",
    "爱你哦",
    "会双开",
    "不在家",
    "上吊",
    "不洗澡",
    "超漂亮",
    "全金标",
    "挂机中",
    "撸猫中",
    "喵喵叫",
];

const fleetMod: string[] = [
    "威武",
    "超强",
    "牛逼",
    "POS",
    "YGG",
    "金标",
    "撸猫",
    "喵喵",
    "水淹",
    "火海",
    "一拳",
    "创神",
    "无敌",
    "勇敢",
    "老板",
    "仓鼠",
    "魅力",
    "无限",
    "无尽",
    "大力神",
    "牛牛",
    "火龙",
    "草帽",
    "新人类",
    "南国",
    "七海",
];

const fleetSufix: string[] = [
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "舰队",
    "船队",
    "船队",
    "船队",
    "海贼团",
    "海盗团",
    "旗舰队",
];

export function randomName(): string {
    const index = Math.floor(Math.random() * nameList.length);
    const modIndex = Math.floor(Math.random() * modList.length);
    return `${nameList[index]}${modList[modIndex]}`;
}

export function randomFleetName(): string {
    const index = Math.floor(Math.random() * fleetMod.length);
    const sufixIndex = Math.floor(Math.random() * fleetSufix.length);
    return `${fleetMod[index]}${fleetSufix[sufixIndex]}`;
}
