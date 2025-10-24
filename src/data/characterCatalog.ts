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
    name: '生粋の社畜',
    type: '生粋の社畜',
    description: '会社に全てを捧げる生粋の社畜。ストレス耐性が高く、どんな理不尽にも耐え抜く。',
    price: 120,
    stats: { stress: 85, communication: 60, endurance: 80, luck: 40 },
    appearance: { color: '#F97316', style: 'elite', characterId: 1 },
  },
  {
    id: 'character-02',
    name: '限界突破社畜',
    type: '限界突破社畜',
    description: '限界を突破し続ける社畜。持久力が高く、長時間労働にも耐え抜く。',
    price: 140,
    stats: { stress: 90, communication: 50, endurance: 95, luck: 35 },
    appearance: { color: '#EC4899', style: 'burnout', characterId: 2 },
  },
  {
    id: 'character-03',
    name: '無敗の職人社畜',
    type: '無敗の職人社畜',
    description: '職人気質で完璧を追求する社畜。技術力が高く、品質にこだわる。',
    price: 150,
    stats: { stress: 80, communication: 45, endurance: 85, luck: 50 },
    appearance: { color: '#6366F1', style: 'stoic', characterId: 3 },
  },
  {
    id: 'character-04',
    name: '孤高の成果主義社畜',
    type: '孤高の成果主義社畜',
    description: '成果を追求する孤高の社畜。個人の成果を重視し、効率を追求する。',
    price: 160,
    stats: { stress: 75, communication: 40, endurance: 70, luck: 60 },
    appearance: { color: '#22D3EE', style: 'lone', characterId: 4 },
  },
  {
    id: 'character-05',
    name: '心優しき社畜',
    type: '心優しき社畜',
    description: '心優しく、同僚を思いやる社畜。コミュニケーション能力が高い。',
    price: 130,
    stats: { stress: 70, communication: 85, endurance: 60, luck: 55 },
    appearance: { color: '#F59E0B', style: 'kind', characterId: 5 },
  },
  {
    id: 'character-06',
    name: '誠実な観察社員',
    type: '誠実な観察社員',
    description: '誠実で観察力の高い社員。状況を冷静に分析し、適切な判断をする。',
    price: 135,
    stats: { stress: 65, communication: 70, endurance: 65, luck: 60 },
    appearance: { color: '#8B5CF6', style: 'sensitive', characterId: 6 },
  },
  {
    id: 'character-07',
    name: '共創リーダー社員',
    type: '共創リーダー社員',
    description: 'チームをまとめる共創リーダー。協調性が高く、チームワークを重視する。',
    price: 145,
    stats: { stress: 60, communication: 90, endurance: 70, luck: 50 },
    appearance: { color: '#0EA5E9', style: 'team', characterId: 7 },
  },
  {
    id: 'character-08',
    name: 'マイペース社員',
    type: 'マイペース社員',
    description: '自分のペースを大切にする社員。ストレスが少なく、バランスを重視する。',
    price: 100,
    stats: { stress: 40, communication: 60, endurance: 50, luck: 70 },
    appearance: { color: '#34D399', style: 'pace', characterId: 8 },
  },
  {
    id: 'character-09',
    name: 'ゆるふわ社畜',
    type: 'ゆるふわ社畜',
    description: 'ゆるふわな雰囲気の社畜。癒やし系で、周囲を和ませる。',
    price: 110,
    stats: { stress: 45, communication: 75, endurance: 45, luck: 65 },
    appearance: { color: '#FB7185', style: 'yurufuwa', characterId: 9 },
  },
  {
    id: 'character-10',
    name: '隠れ疲労社畜',
    type: '隠れ疲労社畜',
    description: '疲労を隠して頑張る社畜。見た目は元気だが、実は限界に近い。',
    price: 120,
    stats: { stress: 95, communication: 55, endurance: 60, luck: 45 },
    appearance: { color: '#F472B6', style: 'hidden', characterId: 10 },
  },
  {
    id: 'character-11',
    name: 'お人好し社員',
    type: 'お人好し社員',
    description: '人好しで優しい社員。頼まれると断れず、人助けを好む。',
    price: 125,
    stats: { stress: 60, communication: 80, endurance: 55, luck: 60 },
    appearance: { color: '#60A5FA', style: 'nice', characterId: 11 },
  },
  {
    id: 'character-12',
    name: '現実派社員',
    type: '現実派社員',
    description: '現実的で冷静な社員。感情に流されず、合理的な判断をする。',
    price: 140,
    stats: { stress: 70, communication: 65, endurance: 70, luck: 55 },
    appearance: { color: '#A855F7', style: 'real', characterId: 12 },
  },
  {
    id: 'character-13',
    name: '家庭が大事社員',
    type: '家庭が大事社員',
    description: '家庭を最優先にする社員。ワークライフバランスを重視する。',
    price: 115,
    stats: { stress: 50, communication: 70, endurance: 60, luck: 65 },
    appearance: { color: '#FBBF24', style: 'family', characterId: 13 },
  },
  {
    id: 'character-14',
    name: 'バランサー社員',
    type: 'バランサー社員',
    description: 'バランス感覚に優れた社員。様々な要素を調整し、調和を保つ。',
    price: 130,
    stats: { stress: 65, communication: 75, endurance: 65, luck: 60 },
    appearance: { color: '#FB923C', style: 'lwb', characterId: 14 },
  },
  {
    id: 'character-15',
    name: '成果最適化社畜',
    type: '成果最適化社畜',
    description: '成果を最適化する社畜。効率性を追求し、最大の成果を上げる。',
    price: 155,
    stats: { stress: 80, communication: 60, endurance: 75, luck: 50 },
    appearance: { color: '#6EE7B7', style: 'able', characterId: 15 },
  },
  {
    id: 'character-16',
    name: '自由人',
    type: '自由人',
    description: '自由を愛する人。束縛を嫌い、自分の価値観を大切にする。',
    price: 200,
    stats: { stress: 30, communication: 70, endurance: 40, luck: 80 },
    appearance: { color: '#FDE68A', style: 'free', characterId: 16 },
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

