import { Character } from '../types/character';

export const CHARACTER_PRICE = 500;

interface CatalogDefinition {
  id: string;
  name: string;
  type: string;
  emoji: string;
  color: string;
  characterId: number;
  style: string;
  stats: Character['stats'];
}

const CATALOG_DEFINITIONS: CatalogDefinition[] = [
  {
    id: 'catalog-001',
    name: '波乗り係長',
    type: 'アタッカー',
    emoji: '🌊',
    color: '#0ea5e9',
    characterId: 1,
    style: 'surfer-lead',
    stats: {
      stress: 25,
      communication: 65,
      endurance: 45,
      luck: 55,
    },
  },
  {
    id: 'catalog-002',
    name: '未来志向の開発者',
    type: 'サポーター',
    emoji: '🤖',
    color: '#6366f1',
    characterId: 2,
    style: 'future-dev',
    stats: {
      stress: 30,
      communication: 50,
      endurance: 60,
      luck: 40,
    },
  },
  {
    id: 'catalog-003',
    name: '社内カリスマ',
    type: 'バッファー',
    emoji: '✨',
    color: '#f97316',
    characterId: 3,
    style: 'charisma',
    stats: {
      stress: 20,
      communication: 80,
      endurance: 35,
      luck: 60,
    },
  },
  {
    id: 'catalog-004',
    name: '不屈の営業',
    type: 'タンク',
    emoji: '🛡️',
    color: '#22c55e',
    characterId: 4,
    style: 'resilient-sales',
    stats: {
      stress: 45,
      communication: 55,
      endurance: 75,
      luck: 35,
    },
  },
  {
    id: 'catalog-005',
    name: 'ひらめきプランナー',
    type: 'ストラテジスト',
    emoji: '💡',
    color: '#facc15',
    characterId: 5,
    style: 'planner',
    stats: {
      stress: 28,
      communication: 60,
      endurance: 40,
      luck: 70,
    },
  },
  {
    id: 'catalog-006',
    name: '癒しの総務',
    type: 'ヒーラー',
    emoji: '🌿',
    color: '#a855f7',
    characterId: 6,
    style: 'healer',
    stats: {
      stress: 22,
      communication: 68,
      endurance: 42,
      luck: 65,
    },
  },
];

const buildCharacterFromDefinition = (definition: CatalogDefinition): Character => ({
  id: definition.id,
  name: definition.name,
  type: definition.type,
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  stats: { ...definition.stats },
  appearance: {
    color: definition.color,
    style: definition.style,
    emoji: definition.emoji,
    characterId: definition.characterId,
  },
  createdAt: new Date().toISOString(),
});

export const getInitialBuyableCharacters = (): Character[] =>
  CATALOG_DEFINITIONS.map((definition) => buildCharacterFromDefinition(definition));

export const cloneCharacter = (character: Character): Character => ({
  ...character,
  stats: { ...character.stats },
  appearance: { ...character.appearance },
});
