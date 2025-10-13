import { GameState, Character } from '../types/character';

const STORAGE_KEY = 'shachipoke_gamestate';

export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};

export const saveGameState = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const clearGameState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// URLパラメータからキャラクターデータを取得
export const getCharacterFromURL = (): Character | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const charData = params.get('character');
    
    if (!charData) return null;
    
    const decoded = JSON.parse(decodeURIComponent(charData));
    
    // 基本的な初期キャラクターデータを作成
    return {
      id: decoded.id || `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: decoded.name || '名無しの社畜',
      type: decoded.type || '新入社員',
      level: 1,
      exp: 0,
      expToNextLevel: 100,
      stats: {
        stress: decoded.stats?.stress || 50,
        communication: decoded.stats?.communication || 50,
        endurance: decoded.stats?.endurance || 50,
        luck: decoded.stats?.luck || 50,
      },
      appearance: {
        color: decoded.appearance?.color || '#3b82f6',
        style: decoded.appearance?.style || 'default',
        emoji: decoded.appearance?.emoji || undefined,
        avatar: decoded.appearance?.avatar || undefined,
      },
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to parse character from URL:', error);
    return null;
  }
};

// デモ用のデフォルトキャラクター作成
export const createDefaultCharacter = (): Character => {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    name: '新米社畜くん',
    type: '新入社員',
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    stats: {
      stress: 50,
      communication: 50,
      endurance: 50,
      luck: 50,
    },
    appearance: {
      color: '#3b82f6',
      style: 'default',
      emoji: '🧑‍💼',
    },
    createdAt: new Date().toISOString(),
  };
};

