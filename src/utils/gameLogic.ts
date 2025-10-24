import { Character, GameState } from '../types/character';

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const calculateExpToNextLevel = (level: number): number => {
  return level * 100;
};

export const addExp = (character: Character, exp: number): Character => {
  const newExp = character.exp + exp;
  const expToNextLevel = calculateExpToNextLevel(character.level);
  
  if (newExp >= expToNextLevel) {
    // レベルアップ
    const newLevel = character.level + 1;
    const remainingExp = newExp - expToNextLevel;
    const newExpToNextLevel = calculateExpToNextLevel(newLevel);
    
    return {
      ...character,
      level: newLevel,
      exp: remainingExp,
      expToNextLevel: newExpToNextLevel,
    };
  }
  
  return {
    ...character,
    exp: newExp,
  };
};

export const addCurrency = (gameState: GameState, amount: number): GameState => {
  return {
    ...gameState,
    currency: gameState.currency + amount,
  };
};

export const spendCurrency = (gameState: GameState, amount: number): GameState | null => {
  if (gameState.currency >= amount) {
    return {
      ...gameState,
      currency: gameState.currency - amount,
    };
  }
  return null; // お金が足りない
};

export const updateStat = (character: Character, statName: keyof Character['stats'], amount: number): Character => {
  const newStats = {
    ...character.stats,
    [statName]: Math.max(0, Math.min(100, character.stats[statName] + amount)),
  };
  
  return {
    ...character,
    stats: newStats,
  };
};

export const getRandomEvent = (): string => {
  const events = [
    '上司から褒められました！',
    '残業が続いています...',
    '同僚とランチをしました',
    '新しいプロジェクトが始まりました',
    'ストレスが溜まっています',
    '昇進の話が出ました',
    '会社の飲み会がありました',
    '有給を取得しました',
  ];
  
  return events[Math.floor(Math.random() * events.length)];
};
