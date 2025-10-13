import { Character } from '../types/character';

export const calculateExpToNextLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export const gainExp = (character: Character, exp: number): Character => {
  const newCharacter = { ...character };
  newCharacter.exp += exp;
  
  // レベルアップチェック
  while (newCharacter.exp >= newCharacter.expToNextLevel) {
    newCharacter.exp -= newCharacter.expToNextLevel;
    newCharacter.level += 1;
    newCharacter.expToNextLevel = calculateExpToNextLevel(newCharacter.level);
    
    // レベルアップ時にステータス少し上昇
    newCharacter.stats.stress += Math.floor(Math.random() * 3) + 1;
    newCharacter.stats.communication += Math.floor(Math.random() * 3) + 1;
    newCharacter.stats.endurance += Math.floor(Math.random() * 3) + 1;
    newCharacter.stats.luck += Math.floor(Math.random() * 3) + 1;
  }
  
  return newCharacter;
};

export const upgradeCharacter = (
  character: Character, 
  stat: 'stress' | 'communication' | 'endurance' | 'luck',
  cost: number
): { character: Character; cost: number } => {
  const newCharacter = { ...character };
  const currentValue = newCharacter.stats[stat];
  
  // コストは現在値に応じて増加
  const actualCost = Math.floor(cost * (1 + currentValue / 50));
  
  newCharacter.stats[stat] += 5;
  
  return { character: newCharacter, cost: actualCost };
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const canPlayTodayEvent = (lastPlayDate: string): boolean => {
  return lastPlayDate !== getTodayDateString();
};

