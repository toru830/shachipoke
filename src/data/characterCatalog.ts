import { Character } from '../types/character';

export interface CharacterTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  stats: Character['stats'];
  appearance: Character['appearance'];
}

export const characterCatalog: CharacterTemplate[] = [
  {
    id: 'character-01',
    name: 'アキラ',
    type: '情熱系エンジニア',
    description: '新しい技術に目がなく、どんな壁も情熱で乗り越える技術屋。',
    price: 120,
    stats: { stress: 55, communication: 42, endurance: 58, luck: 40 },
    appearance: { color: '#F97316', style: 'tech', characterId: 1 },
  },
  {
    id: 'character-02',
    name: 'ミサキ',
    type: '頼れる先輩',
    description: '面倒見が良く、チームの雰囲気をまとめるムードメーカー。',
    price: 140,
    stats: { stress: 68, communication: 70, endurance: 52, luck: 45 },
    appearance: { color: '#EC4899', style: 'mentor', characterId: 2 },
  },
  {
    id: 'character-03',
    name: 'ソウタ',
    type: '分析型プランナー',
    description: '冷静沈着なプランナー。どんな案件もロジカルに進める。',
    price: 150,
    stats: { stress: 62, communication: 55, endurance: 60, luck: 50 },
    appearance: { color: '#6366F1', style: 'planner', characterId: 3 },
  },
  {
    id: 'character-04',
    name: 'ユイ',
    type: 'ポジティブ新人',
    description: '明るさ全開の新入社員。周囲を笑顔にするムードメーカー。',
    price: 90,
    stats: { stress: 48, communication: 72, endurance: 45, luck: 60 },
    appearance: { color: '#22D3EE', style: 'junior', characterId: 4 },
  },
  {
    id: 'character-05',
    name: 'ケンジ',
    type: '現場主義リーダー',
    description: '現場で鍛えられたリーダー。体力と根性でチームを引っ張る。',
    price: 160,
    stats: { stress: 75, communication: 58, endurance: 72, luck: 38 },
    appearance: { color: '#F59E0B', style: 'leader', characterId: 5 },
  },
  {
    id: 'character-06',
    name: 'ハルカ',
    type: 'マルチタスク秘書',
    description: '同時に複数の案件をこなすスーパーアシスタント。',
    price: 135,
    stats: { stress: 65, communication: 68, endurance: 54, luck: 52 },
    appearance: { color: '#8B5CF6', style: 'assistant', characterId: 6 },
  },
  {
    id: 'character-07',
    name: 'レン',
    type: '冷静な分析官',
    description: 'データの裏側まで読み解く分析官。冷静な判断でサポート。',
    price: 130,
    stats: { stress: 58, communication: 48, endurance: 62, luck: 55 },
    appearance: { color: '#0EA5E9', style: 'analyst', characterId: 7 },
  },
  {
    id: 'character-08',
    name: 'サラ',
    type: '癒やし系総務',
    description: 'ふわっと優しい雰囲気で、チームのメンタルを支える。',
    price: 100,
    stats: { stress: 70, communication: 66, endurance: 48, luck: 58 },
    appearance: { color: '#34D399', style: 'support', characterId: 8 },
  },
  {
    id: 'character-09',
    name: 'ゴウ',
    type: 'タフな営業',
    description: 'どんな相手とも粘り強く交渉するタフな営業マン。',
    price: 155,
    stats: { stress: 72, communication: 63, endurance: 70, luck: 47 },
    appearance: { color: '#FB7185', style: 'sales', characterId: 9 },
  },
  {
    id: 'character-10',
    name: 'マイ',
    type: 'クリエイティブデザイナー',
    description: 'センス抜群のデザイナー。柔軟な発想で魅力的な提案をする。',
    price: 145,
    stats: { stress: 52, communication: 74, endurance: 50, luck: 65 },
    appearance: { color: '#F472B6', style: 'designer', characterId: 10 },
  },
  {
    id: 'character-11',
    name: 'タクミ',
    type: 'インフラ職人',
    description: '堅実なインフラエンジニア。トラブル時にも落ち着いて対処。',
    price: 150,
    stats: { stress: 78, communication: 46, endurance: 68, luck: 42 },
    appearance: { color: '#60A5FA', style: 'engineer', characterId: 11 },
  },
  {
    id: 'character-12',
    name: 'ノゾミ',
    type: '共感力コーチ',
    description: '相手の気持ちに寄り添う天才。チームの支えとなる存在。',
    price: 125,
    stats: { stress: 60, communication: 78, endurance: 46, luck: 57 },
    appearance: { color: '#A855F7', style: 'coach', characterId: 12 },
  },
  {
    id: 'character-13',
    name: 'シン',
    type: '夜型クリエイター',
    description: '夜の静けさで力を発揮するクリエイタータイプ。',
    price: 110,
    stats: { stress: 50, communication: 52, endurance: 64, luck: 60 },
    appearance: { color: '#FBBF24', style: 'creator', characterId: 13 },
  },
  {
    id: 'character-14',
    name: 'リナ',
    type: 'スピードスター',
    description: 'スピーディーな対応で信頼を集めるクイックプレイヤー。',
    price: 140,
    stats: { stress: 63, communication: 65, endurance: 56, luck: 62 },
    appearance: { color: '#FB923C', style: 'speedster', characterId: 14 },
  },
  {
    id: 'character-15',
    name: 'ハジメ',
    type: '計画重視マネージャー',
    description: '綿密な計画でプロジェクトを推進する慎重派。',
    price: 150,
    stats: { stress: 74, communication: 60, endurance: 59, luck: 55 },
    appearance: { color: '#6EE7B7', style: 'manager', characterId: 15 },
  },
  {
    id: 'character-16',
    name: 'エマ',
    type: '幸運の女神',
    description: '驚異的な運の良さで、チャンスを引き寄せるラッキーガール。',
    price: 165,
    stats: { stress: 58, communication: 68, endurance: 52, luck: 85 },
    appearance: { color: '#FDE68A', style: 'lucky', characterId: 16 },
  },
];

export const createCharacterFromTemplate = (template: CharacterTemplate): Character => ({
  id: template.id,
  name: template.name,
  type: template.type,
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  stats: { ...template.stats },
  appearance: { ...template.appearance },
  createdAt: new Date().toISOString(),
});

