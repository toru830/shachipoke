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
    const characterName = params.get('character');
    const iconUrl = params.get('icon');
    
    if (!characterName) {
      return null;
    }

    // アイコンURLからキャラクターIDを抽出
    let characterId: number | undefined;
    if (iconUrl) {
      // URLからキャラクターIDを抽出（例: .../005.png から 5 を抽出）
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

