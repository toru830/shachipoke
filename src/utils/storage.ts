import { GameState, Character } from '../types/character';

const STORAGE_KEY = 'shachipoke-game-state';

export const saveGameState = (gameState: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load game state:', error);
  }
  return null;
};

export const clearGameState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
};

export const createDefaultCharacter = (): Character => {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    name: '新入社員',
    type: '一般社員',
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    stats: {
      stress: 30,
      communication: 30,
      endurance: 30,
      luck: 30,
    },
    appearance: {
      color: '#4F46E5',
      style: 'default',
      emoji: '🧑‍💼',
    },
    createdAt: new Date().toISOString(),
  };
};

export const createDefaultGameState = (character: Character): GameState => {
  return {
    character,
    money: 50,
    lastPlayDate: new Date().toISOString(),
    events: [],
    achievements: [],
    settings: {
      soundEnabled: true,
      musicEnabled: true,
      notificationsEnabled: true,
      autoSave: true,
    },
  };
};

// URLパラメータからキャラクター情報を取得（旧バージョン対応）
export const getCharacterFromURL = (): Character | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const characterName = params.get('character');
    const iconUrl = params.get('icon');
    
    if (!characterName) {
      return null;
    }

    // アイコンURLからキャラクターIDを抽出
    let characterId: number | undefined;
    if (iconUrl) {
      const match = iconUrl.match(/(\d{3})\.png/);
      if (match) {
        characterId = parseInt(match[1], 10);
      }
    }

    const character: Character = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: characterName,
      type: '診断結果',
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
        color: '#4F46E5',
        style: 'default',
        emoji: '🧑‍💼',
        avatar: iconUrl || undefined,
        characterId: characterId,
      },
      createdAt: new Date().toISOString(),
    };
    return character;
  } catch (error) {
    console.error('Failed to parse character from URL:', error);
    return null;
  }
};
