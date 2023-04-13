import {
    AircraftData,
    ShipData,
    ShipTypes,
    SuperCapData,
    UnitData,
    UnitDataBase,
    UnitDataGroup,
} from "./ship-data-types";

const CARRIER_DATA: SuperCapData[] = [
    {
        id: "cr1",
        name: "CV3000",
        type: ShipTypes.carrier,
        pop: 40,
        limit: 5,
        modules: {
            m1: { id: "m1", isBase: true, name: "综合舰载机搭载平台", shortName: "综合战机" },
            m2: { id: "m2", isBase: false, name: "综合战机系统", shortName: "综合平台" },
            m3: { id: "m3", isBase: false, name: "大型舰载机平台", shortName: "大型机仓", important: true },
            a1: { id: "a1", isBase: true, name: "龙石火炮系统", shortName: "龙石火炮" },
            a2: { id: "a2", isBase: false, name: "防空导弹平台", shortName: "防空导弹", important: true },
            b1: { id: "b1", isBase: false, name: "导弹防御系统", shortName: "导弹防御" },
            b2: { id: "b2", isBase: false, name: "护航艇搭载平台", shortName: "炮艇平台", important: true },
            b3: { id: "b3", isBase: false, name: "信息无人机支援平台", shortName: "无人机台" },
        },
    },
    {
        id: "cr2",
        name: "太阳鲸",
        type: ShipTypes.carrier,
        pop: 45,
        limit: 5,
        modules: {
            m1: { id: "m1", isBase: true, name: "护航艇坞仓", shortName: "护航艇仓" },
            m2: { id: "m2", isBase: false, name: "大型载机系统", shortName: "大型载机", important: true },
            a1: { id: "a1", isBase: true, name: "综合武器库", shortName: "综合武器" },
            a2: { id: "a2", isBase: false, name: "投射武器平台", shortName: "投射平台" },
            a3: { id: "a3", isBase: false, name: "综合火炮平台", shortName: "综合火炮" },
            b1: { id: "b1", isBase: true, name: "舰载机维护系统", shortName: "载机维护" },
            b2: { id: "b2", isBase: false, name: "护航艇搭载平台", shortName: "炮艇平台", important: true },
            c1: { id: "c1", isBase: false, name: "舰载机平台", shortName: "载机平台", important: true },
            c2: { id: "c2", isBase: false, name: "攻城无人机", shortName: "攻城飞机" },
            c3: { id: "c3", isBase: false, name: "防空导弹平台", shortName: "防空导弹" },
        },
    },
    {
        id: "cr3",
        name: "南十字元帅级",
        type: ShipTypes.carrier,
        pop: 40,
        limit: 5,
        modules: {
            m1: { id: "m1", isBase: true, name: "白色闪光综合武器库", shortName: "综合武器" },
            m2: { id: "m2", isBase: false, name: "白色闪光综合武器库", shortName: "综合武器" },
            a1: { id: "a1", isBase: true, name: "综合舰载机平台", shortName: "载机平台" },
            a2: { id: "a2", isBase: false, name: "护航艇坞仓", shortName: "护航艇仓", important: true },
            b1: { id: "b1", isBase: false, name: "附加舰载机搭载平台", shortName: "载机平台", important: true },
            b2: { id: "b2", isBase: false, name: "导弹防御系统", shortName: "导弹防御" },
            b3: { id: "b3", isBase: false, name: "侦查无人机系统", shortName: "侦查飞机" },
            c1: { id: "c1", isBase: true, name: "附加能源系统", shortName: "能源系统" },
            c2: { id: "c2", isBase: false, name: "火控辅助校准系统", shortName: "火控辅助", important: true },
        },
    },
    {
        id: "cr4",
        name: "FSV830",
        type: ShipTypes.carrier,
        pop: 40,
        limit: 2,
        modules: {
            a1: { id: "a1", isBase: false, name: "工程维修系统", shortName: "工程维修" },
            a2: { id: "a2", isBase: false, name: "战略资源存储系统", shortName: "战略存储", important: true },
            b1: { id: "b1", isBase: true, name: "护卫舰生产系统", shortName: "护卫生产" },
            b2: { id: "b2", isBase: false, name: "护航艇生产系统", shortName: "炮艇生产", important: true },
            b3: { id: "b3", isBase: false, name: "战机胜场系统", shortName: "战机生产" },
            c1: { id: "c1", isBase: false, name: "舰载机系统", shortName: "载机平台" },
            c2: { id: "c2", isBase: false, name: "维修无人机系统", shortName: "维修飞机", important: true },
            d1: { id: "d1", isBase: true, name: "预警指挥系统", shortName: "预警指挥" },
            d2: { id: "d2", isBase: false, name: "协同指挥系统", shortName: "协同指挥", important: true },
            d3: { id: "d3", isBase: false, name: "干扰指挥系统", shortName: "干扰指挥" },
            e1: { id: "e1", isBase: false, name: "区域防空系统", shortName: "区域防空", important: true },
            e2: { id: "e2", isBase: false, name: "护航艇坞仓", shortName: "护航艇仓" },
        },
    },
    {
        id: "cr5",
        name: "埃迪卡拉级",
        type: ShipTypes.carrier,
        pop: 40,
        limit: 2,
        modules: {
            m1: { id: "m1", isBase: true, name: "堡垒坚守重炮体统", shortName: "堡垒重炮" },
            m2: { id: "m2", isBase: false, name: "堡垒攻坚轨道炮系统", shortName: "堡垒轨道" },
            b1: { id: "b1", isBase: true, name: "护卫舰生产系统", shortName: "护卫生产" },
            b2: { id: "b2", isBase: false, name: "护航艇生产系统", shortName: "炮艇生产" },
            b3: { id: "b3", isBase: false, name: "驱逐舰生产系统", shortName: "驱逐生产" },
            c1: { id: "c1", isBase: false, name: "大型载机系统", shortName: "大型载机" },
            c2: { id: "c2", isBase: false, name: "护航艇坞仓", shortName: "炮艇船坞" },
            d1: { id: "d1", isBase: true, name: "苔原拦截无人机系统", shortName: "苔原拦截" },
            d2: { id: "d2", isBase: false, name: "蜂鸟火力侦察系统", shortName: "蜂鸟侦查" },
            d3: { id: "d3", isBase: false, name: "巨像护卫无人机系统", shortName: "巨像护卫" },
            e1: { id: "e1", isBase: false, name: "重型附加装甲系统", shortName: "重型装甲" },
            e2: { id: "e2", isBase: false, name: "纳米级自维修系统", shortName: "纳米维修" },
        },
    },
];

const BATTLE_CRUISER_DATA: SuperCapData[] = [
    {
        id: "bc1",
        name: "新君士大帝级",
        type: ShipTypes.battleCruiser,
        pop: 35,
        limit: 6,
        modules: {
            m1: { id: "m1", isBase: true, name: "伽马风暴粒子攻击系统", shortName: "离子攻击" },
            m2: { id: "m2", isBase: false, name: "伽马风暴粒子投射系统", shortName: "离子投射", important: true },
            a1: { id: "a1", isBase: true, name: "伽马风暴投射攻击系统", shortName: "投射攻击" },
            a2: { id: "a2", isBase: false, name: "伽马风暴投射攻击系统", shortName: "投射攻击", important: true },
            b1: { id: "b1", isBase: false, name: "通用火炮模块", shortName: "通用火炮" },
            b2: { id: "b2", isBase: false, name: "脉冲防空系统", shortName: "脉冲防空" },
            b3: { id: "b3", isBase: false, name: "防空导弹系统", shortName: "防空导弹", important: true },
            c1: { id: "c1", isBase: false, name: "附加能源系统", shortName: "能源系统" },
            c2: { id: "c2", isBase: false, name: "舰载机系统", shortName: "舰载机仓" },
            c3: { id: "c3", isBase: false, name: "侦察无人机系统", shortName: "侦察机仓" },
            d1: { id: "d1", isBase: false, name: "近程防空系统", shortName: "防空系统", important: true },
            d2: { id: "d2", isBase: false, name: "重点防护模块", shortName: "防护模块" },
            d3: { id: "d3", isBase: false, name: "损管系统", shortName: "损管系统" },
        },
    },
    {
        id: "bc2",
        name: "乌拉诺斯之矛",
        type: ShipTypes.battleCruiser,
        pop: 35,
        limit: 6,
        modules: {
            m1: { id: "m1", isBase: true, name: "舰首轨道炮系统", shortName: "重轨道炮" },
            m2: { id: "m2", isBase: false, name: "离子炮塔系统", shortName: "离子炮塔" },
            a1: { id: "a1", isBase: true, name: "堡垒火炮系统", shortName: "堡垒火炮" },
            a2: { id: "a2", isBase: false, name: "堡垒火炮系统", shortName: "堡垒火炮", important: true },
            a3: { id: "a3", isBase: false, name: "堡垒火炮系统", shortName: "堡垒火炮" },
            b1: { id: "b1", isBase: false, name: "矿车投射系统", shortName: "矿车投射" },
            b2: { id: "b2", isBase: false, name: "护航艇船舱", shortName: "护航艇仓" },
            b3: { id: "b3", isBase: false, name: "总和损管系统", shortName: "损管系统", important: true },
            c1: { id: "c1", isBase: false, name: "分布式轻型武器控制系统", shortName: "防空系统" },
            c2: { id: "c2", isBase: false, name: "附加装甲系统", shortName: "附加装甲", important: true },
            c3: { id: "c3", isBase: false, name: "反导拦截系统", shortName: "拦截系统" },
        },
    },
    {
        id: "bc3",
        name: "永恒风暴",
        type: ShipTypes.battleCruiser,
        pop: 32,
        limit: 6,
        modules: {
            m1: { id: "m1", isBase: true, name: "雷式离子生成系统", shortName: "高离子炮" },
            m2: { id: "m2", isBase: false, name: "离子炮塔系统", shortName: "离子炮塔", important: true },
            a1: { id: "a1", isBase: true, name: "永远的北极星MARKII", shortName: "对舰鱼雷" },
            a2: { id: "a2", isBase: false, name: "永远的北极星MARKII", shortName: "攻城鱼雷" },
            a3: { id: "a3", isBase: false, name: "永远的北极星MARKII", shortName: "防空鱼雷" },
            b1: { id: "b1", isBase: false, name: "通用火炮模块", shortName: "通用火炮", important: true },
            b2: { id: "b2", isBase: false, name: "通用近防系统", shortName: "通用近防" },
            c1: { id: "c1", isBase: false, name: "NT无人机防空系统", shortName: "防空飞机" },
            c2: { id: "c2", isBase: false, name: "雷暴无人机护盾", shortName: "护盾飞机", important: true },
            c3: { id: "c3", isBase: false, name: "能量补偿装甲", shortName: "能量装甲", important: true },
            d1: { id: "d1", isBase: false, name: "离子炮打系统", shortName: "离子炮塔" },
            d2: { id: "d2", isBase: false, name: "脉冲炮打系统", shortName: "脉冲炮塔" },
        },
    },
    {
        id: "bc4",
        name: "ST59",
        type: ShipTypes.battleCruiser,
        pop: 28,
        limit: 6,
        modules: {
            m1: { id: "m1", isBase: true, name: "攻坚轨道炮系统", shortName: "重轨道炮" },
            m2: { id: "m2", isBase: false, name: "舰首火炮系统", shortName: "舰首火炮" },
            m3: { id: "m3", isBase: false, name: "攻坚鱼雷系统", shortName: "攻坚鱼雷", important: true },
            a1: { id: "a1", isBase: true, name: "大型火炮平台", shortName: "火炮平台" },
            a2: { id: "a2", isBase: false, name: "轨道炮塔阵列", shortName: "轨道炮塔" },
            a3: { id: "a3", isBase: false, name: "脉冲炮塔阵列", shortName: "脉冲炮塔", important: true },
            b1: { id: "b1", isBase: false, name: "综合投射武器平台", shortName: "投射平台" },
            b2: { id: "b2", isBase: false, name: "舰载机系统", shortName: "舰载机仓", important: true },
            b3: { id: "b3", isBase: false, name: "区域火控系统", shortName: "区域火控" },
            c1: { id: "c1", isBase: false, name: "附加装甲系统", shortName: "附加装甲", important: true },
            c2: { id: "c2", isBase: false, name: "电磁装甲系统", shortName: "电磁装甲", important: true },
            c3: { id: "c3", isBase: false, name: "重型防卫装甲", shortName: "重型装甲", important: true },
        },
    },
    {
        id: "bc5",
        name: "雷火之星",
        type: ShipTypes.battleCruiser,
        pop: 35,
        limit: 3,
        modules: {
            m1: { id: "m1", isBase: true, name: "长轨道炮系统", shortName: "长轨道炮" },
            m2: { id: "m2", isBase: false, name: "舰首投射武器系统", shortName: "投射鱼雷", important: true },
            m3: { id: "m3", isBase: false, name: "舰首高能武器系统", shortName: "离子火炮" },
            a1: { id: "a1", isBase: true, name: "快速反舰武器系统", shortName: "快速反舰" },
            a2: { id: "a2", isBase: false, name: "中型反舰武器系统", shortName: "中型反舰" },
            b1: { id: "b1", isBase: true, name: "主動防空系统", shortName: "防空导弹", important: true },
            b2: { id: "b2", isBase: false, name: "火控校准系统", shortName: "火控校准" },
            e1: { id: "e1", isBase: false, name: "精确投射武器系統", shortName: "投射导弹" },
            e2: { id: "e2", isBase: false, name: "大型投射武器系統", shortName: "投射鱼雷" },
            f1: { id: "f1", isBase: false, name: "多目标武器系统", shortName: "舰队反击" },
            f2: { id: "f2", isBase: false, name: "多目标防空系统", shortName: "防空反击" },
        },
    },
];

const CRUISER_DATA: ShipData[] = [
    { id: "c2", name: "艾奥级", type: ShipTypes.cruiser, pop: 18, limit: 8, variants: ["离子炮", "反舰型", "攻城型"] },
    {
        id: "c3",
        name: "奇美拉級",
        type: ShipTypes.cruiser,
        pop: 20,
        limit: 8,
        variants: ["炮弹型", "重炮型", "防衛型"],
    },
    {
        id: "c1",
        name: "卡利斯托級",
        type: ShipTypes.cruiser,
        pop: 20,
        limit: 8,
        variants: ["鱼雷型", "反舰型", "支援型"],
    },
    { id: "c4", name: "猎兵级", type: ShipTypes.cruiser, pop: 18, limit: 8, variants: ["支援型", "反舰型"] },
    { id: "c6", name: "康納馬拉混沌", type: ShipTypes.cruiser, pop: 20, limit: 8, variants: ["轨道炮", "电浆型"] },
    { id: "c7", name: "光锥级", type: ShipTypes.cruiser, pop: 20, limit: 8, variants: ["通用型", "防空型", "突击型"] },
    {
        id: "c5",
        name: "狩猎者级",
        type: ShipTypes.cruiser,
        pop: 18,
        limit: 8,
        variants: ["通用型", "战术型", "防空型"],
    },
    {
        id: "c8",
        name: "CAS066級",
        type: ShipTypes.cruiser,
        pop: 18,
        limit: 12,
        variants: ["綜合型", "炮击型", "载机型", "支援型"],
    },
    {
        id: "c9",
        name: "KCCPV2.0級",
        type: ShipTypes.cruiser,
        pop: 16,
        limit: 12,
        variants: ["綜合型", "载机型", "轨道炮", "脉冲型"],
    },
];

const FRIGATE_DATA: ShipData[] = [
    { id: "d1", name: "刺水母级", type: ShipTypes.frigate, pop: 6, limit: 10, variants: ["特种型", "防空型"] },
    {
        id: "d2",
        name: "雷里亚特级",
        type: ShipTypes.frigate,
        pop: 4,
        limit: 10,
        variants: ["反舰型", "魚雷型", "隐身型"],
    },
    {
        id: "d3",
        name: "红宝石级",
        type: ShipTypes.frigate,
        pop: 5,
        limit: 10,
        variants: ["轨道炮", "粒子炮", "防卫型"],
    },
    {
        id: "d4",
        name: "卡里莱恩级",
        type: ShipTypes.frigate,
        pop: 5,
        limit: 10,
        variants: ["侦查型", "重炮型", "特種型"],
    },
    { id: "d5", name: "澄海級", type: ShipTypes.frigate, pop: 5, limit: 10, variants: ["反舰型", "飞弹型", "防空型"] },
    {
        id: "d6",
        name: "諾瑪M470級",
        type: ShipTypes.frigate,
        pop: 6,
        limit: 10,
        variants: ["攻城型", "支援型", "防空型"],
    },
    { id: "d7", name: "静海级", type: ShipTypes.frigate, pop: 4, limit: 10, variants: ["綜合型", "脈衝型", "防空型"] },
    { id: "d8", name: "云海级", type: ShipTypes.frigate, pop: 4, limit: 10, variants: ["突擊型", "防空型"] },
    { id: "d9", name: "FG300级", type: ShipTypes.frigate, pop: 3, limit: 15, variants: ["多功能", "装甲型", "侦察型"] },
];

const DESTROYER_DATA: ShipData[] = [
    {
        id: "f2",
        name: "斗牛级",
        type: ShipTypes.destroyer,
        pop: 8,
        limit: 10,
        variants: ["攻击型", "突击型", "防御型"],
    },
    {
        id: "f5",
        name: "阋神星级",
        type: ShipTypes.destroyer,
        pop: 7,
        limit: 10,
        variants: ["火炮型", "重炮型", "裝甲型"],
    },
    { id: "f9", name: "亚达伯拉级", type: ShipTypes.destroyer, pop: 8, limit: 10, variants: ["通用型", "裝甲型"] },
    { id: "f6", name: "创神星级", type: ShipTypes.destroyer, pop: 6, limit: 10, variants: ["轨道炮", "魚雷型"] },
    {
        id: "f7",
        name: "枪骑兵级",
        type: ShipTypes.destroyer,
        pop: 6,
        limit: 10,
        variants: ["反舰型", "綜合型", "防空型"],
    },
    {
        id: "f8",
        name: "卫士级",
        type: ShipTypes.destroyer,
        pop: 9,
        limit: 10,
        variants: ["支援型", "两栖型", "脉冲炮"],
    },
    { id: "f1", name: "苔原级", type: ShipTypes.destroyer, pop: 9, limit: 10, variants: ["支援型", "载机型"] },
    {
        id: "f3",
        name: "谷神星级",
        type: ShipTypes.destroyer,
        pop: 8,
        limit: 10,
        variants: ["载机型", "支援型", "战术型"],
    },
    {
        id: "f4",
        name: "AC721級",
        type: ShipTypes.destroyer,
        pop: 8,
        limit: 15,
        variants: ["通用型", "载机型", "飞弹型"],
    },
];

const AIRCRAFT_DATA: AircraftData[] = [
    { id: "b1", name: "維塔斯 B010", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "large" },
    { id: "a1", name: "密斯托拉", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a2", name: "海氏追隨者", type: ShipTypes.aircraft, pop: 1, limit: 8, aircraftType: "mid" },
    { id: "a3", name: "林鴞A100", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a4", name: "砂龙", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a5", name: "維塔斯 A021", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "b2", name: "刺鰩", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "large" },
    { id: "b3", name: "牛蛙", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "large" },
    { id: "a7", name: "孢子A404", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a8", name: "新大地B192", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a9", name: "佩刀Aer410", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a6", name: "平衡安德森", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
    { id: "a10", name: "SC002", type: ShipTypes.aircraft, pop: 1, limit: 10, aircraftType: "mid" },
];

const CORVETTE_DATA: ShipData[] = [
    { id: "e1", name: "星云追逐者", type: ShipTypes.corvette, pop: 2, limit: 10, variants: ["弹炮型", "脉冲型"] },
    { id: "e2", name: "CV-T800", type: ShipTypes.corvette, pop: 2, limit: 15, variants: [""] },
    { id: "e3", name: "蜂巢守卫者", type: ShipTypes.corvette, pop: 2, limit: 10, variants: [""] },
    { id: "e4", name: "S-列维9号", type: ShipTypes.corvette, pop: 2, limit: 10, variants: [""] },
    { id: "e5", name: "虚灵", type: ShipTypes.corvette, pop: 2, limit: 10, variants: [""] },
    { id: "e6", name: "RB7-13", type: ShipTypes.corvette, pop: 2, limit: 10, variants: [""] },
    { id: "e7", name: "鳐", type: ShipTypes.corvette, pop: 2, limit: 10, variants: [""] },
    {
        id: "e8",
        name: "CV-M011",
        type: ShipTypes.corvette,
        pop: 2,
        limit: 15,
        variants: ["导弹型", "火炮型", "高速型"],
    },
    { id: "e9", name: "CV-II003", type: ShipTypes.corvette, pop: 2, limit: 10, variants: [""] },
];

export const UNIT_DATA_BASE: UnitDataBase = {
    carriers: { label: "航空母舰", type: ShipTypes.carrier, list: CARRIER_DATA },
    battleCruisers: { label: "战斗巡洋舰", type: ShipTypes.battleCruiser, list: BATTLE_CRUISER_DATA },
    cruisers: { label: "巡洋舰", type: ShipTypes.cruiser, list: CRUISER_DATA },
    destroyers: { label: "驱逐舰", type: ShipTypes.destroyer, list: DESTROYER_DATA },
    frigates: { label: "护卫舰", type: ShipTypes.frigate, list: FRIGATE_DATA },
    aircrafts: { label: "战机", type: ShipTypes.aircraft, list: AIRCRAFT_DATA },
    corvettes: { label: "护航艇", type: ShipTypes.corvette, list: CORVETTE_DATA },
};

let ShipLookupTable: { [index: string]: UnitData };

export function lookUpShipById(index: string): UnitData | undefined {
    if (ShipLookupTable === null || ShipLookupTable === undefined) {
        ShipLookupTable = {};
        Object.values(UNIT_DATA_BASE).forEach((shipType: UnitDataGroup) => {
            shipType.list.forEach((ship) => {
                ShipLookupTable[ship.id] = ship;
            });
        });
    }
    return ShipLookupTable[index];
}
