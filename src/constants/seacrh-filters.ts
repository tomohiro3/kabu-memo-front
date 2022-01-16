export const MARKETS = { name: '市場', options: ['東1', '東2', '東マ', 'JQ'] };
export const GROUPS = {
  name: '規模区分',
  options: ['TOPIX Core30', 'TOPIX Large70', 'TOPIX Mid400', 'TOPIX Small 1', 'TOPIX Small 2', 'None'],
};
export const INDUSTRY_33 = {
  name: '33業種',
  options: [
    '水産・農林業',
    '鉱業',
    '建設業',
    '食料品',
    '繊維製品',
    'パルプ・紙',
    '化学',
    '医薬品',
    '石油・石炭製品',
    'ゴム製品',
    'ガラス・土石製品',
    '鉄鋼',
    '非鉄金属',
    '金属製品',
    '機械',
    '電気機器',
    '輸送用機器',
    '精密機器',
    'その他製品',
    '電気ガス業',
    '陸運業',
    '海運業',
    '空運業',
    '倉庫運輸関連業',
    '情報・通信業',
    '卸売業',
    '小売業',
    '銀行業',
    '証券、商品先物取引業',
    '保険業',
    'その他金融業',
    '不動産業',
    'サービス業',
  ],
};
export const VALUE_OR_GROWTH = {
  name: 'バリュー・グロース',
  options: [
    { label: 'None', value: null },
    { label: 'バリュー', value: 'value' },
    { label: 'グロース', value: 'growth' },
  ],
};
export const IS_PRICE_SHIFTABLE = {
  name: '価格転嫁',
  options: [
    { label: 'None', value: null },
    { label: '良', value: true },
    { label: '悪', value: false },
  ],
};
