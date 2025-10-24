import { GameState, Character } from '../types/character';

const STORAGE_KEY = 'shachipoke-game-state';

const ensureUniqueCharacters = (characters: Character[]): Character[] => {
  const seen = new Set<string>();
  const unique: Character[] = [];

  characters.forEach((character) => {
    if (!seen.has(character.id)) {
      unique.push(character);
      seen.add(character.id);
    }
  });

  return unique;
};

export const normalizeGameState = (gameState: GameState): GameState => {
  const purchasedSource = Array.isArray(gameState.purchasedCharacters)
    ? gameState.purchasedCharacters
    : [];

  const purchasedCharacters = ensureUniqueCharacters([
    ...purchasedSource,
    gameState.character,
  ]);

  const rawFormations = Array.isArray(gameState.formations)
    ? gameState.formations.filter((id): id is string => typeof id === 'string')
    : [];

  const filteredFormations = rawFormations.filter((id) =>
    purchasedCharacters.some((character) => character.id === id)
  );

  const uniqueFormations: string[] = [];
  [...filteredFormations, gameState.character.id].forEach((id) => {
    if (!uniqueFormations.includes(id)) {
      uniqueFormations.push(id);
    }
  });

  const trimmedFormations = uniqueFormations.slice(0, 4);

  const activeCharacter =
    purchasedCharacters.find((character) => character.id === trimmedFormations[0]) ??
    purchasedCharacters[0] ??
    gameState.character;

  const ownedItems = Array.isArray(gameState.ownedItems)
    ? [...new Set(gameState.ownedItems.filter((item): item is string => typeof item === 'string'))]
    : [];

  const currency = Number.isFinite(gameState.currency)
    ? Math.max(0, gameState.currency)
    : 0;

  const lastSaved = typeof gameState.lastSaved === 'string'
    ? gameState.lastSaved
    : new Date().toISOString();

  return {
    ...gameState,
    purchasedCharacters,
    formations: trimmedFormations,
    character: activeCharacter,
    ownedItems,
    currency,
    lastSaved,
  };
};

export const saveGameState = (gameState: GameState): GameState => {
  const normalized = normalizeGameState({
    ...gameState,
    lastSaved: new Date().toISOString(),
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }

  return normalized;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  musicEnabled: true,
  notificationsEnabled: true,
  autoSave: true,
} as const;

const DEFAULT_DAILY_EVENTS = {
  boss: false,
  officeLady: false,
  customer: false,
} as const;

const migrateGameState = (raw: unknown): GameState | null => {
  if (!isRecord(raw)) {
    return null;
  }

  const record = raw as Record<string, unknown>;
  if (!isRecord(record.character)) {
    return null;
  }

  const toCharacterArray = (value: unknown): Character[] => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value
      .filter((entry): entry is Record<string, unknown> => isRecord(entry))
      .map((entry) => entry as unknown as Character);
  };

  const toStringArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter((item): item is string => typeof item === 'string');
  };

  const character = record.character as unknown as Character;

  const purchasedCharacters = toCharacterArray(record.purchasedCharacters)
    .concat(toCharacterArray(record.ownedCharacters));

  const formationsSource = toStringArray(record.formations).length > 0
    ? toStringArray(record.formations)
    : toStringArray(record.formation);

  const currencyValue = typeof record.currency === 'number'
    ? record.currency
    : typeof record.money === 'number'
    ? (record.money as number)
    : 0;

  const ownedItems = toStringArray(record.ownedItems);

  const lastSaved = typeof record.lastSaved === 'string'
    ? record.lastSaved
    : new Date().toISOString();

  const lastPlayDate = typeof record.lastPlayDate === 'string'
    ? record.lastPlayDate
    : new Date().toISOString();

  const events = toStringArray(record.events);

  const achievements = Array.isArray(record.achievements)
    ? (record.achievements as unknown[])
        .filter((achievement) => isRecord(achievement))
        .map((achievement) => achievement as unknown as GameState['achievements'][number])
    : [];

  const settingsSource = isRecord(record.settings)
    ? (record.settings as Record<string, unknown>)
    : {};

  const settings = {
    soundEnabled: settingsSource.soundEnabled !== undefined ? Boolean(settingsSource.soundEnabled) : DEFAULT_SETTINGS.soundEnabled,
    musicEnabled: settingsSource.musicEnabled !== undefined ? Boolean(settingsSource.musicEnabled) : DEFAULT_SETTINGS.musicEnabled,
    notificationsEnabled:
      settingsSource.notificationsEnabled !== undefined
        ? Boolean(settingsSource.notificationsEnabled)
        : DEFAULT_SETTINGS.notificationsEnabled,
    autoSave: settingsSource.autoSave !== undefined ? Boolean(settingsSource.autoSave) : DEFAULT_SETTINGS.autoSave,
  };

  const dailyEventsSource = isRecord(record.dailyEvents)
    ? (record.dailyEvents as Record<string, unknown>)
    : {};

  const dailyEvents = {
    boss: dailyEventsSource.boss !== undefined ? Boolean(dailyEventsSource.boss) : DEFAULT_DAILY_EVENTS.boss,
    officeLady:
      dailyEventsSource.officeLady !== undefined
        ? Boolean(dailyEventsSource.officeLady)
        : DEFAULT_DAILY_EVENTS.officeLady,
    customer:
      dailyEventsSource.customer !== undefined
        ? Boolean(dailyEventsSource.customer)
        : DEFAULT_DAILY_EVENTS.customer,
  };

  const baseState: GameState = {
    character,
    purchasedCharacters,
    ownedItems,
    formations: formationsSource,
    currency: currencyValue,
    lastSaved,
    lastPlayDate,
    events,
    achievements,
    settings,
    dailyEvents,
  };

  return normalizeGameState(baseState);
};

export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return migrateGameState(parsed);
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

// 毎日のイベント管理
export const resetDailyEvents = (gameState: GameState): GameState => {
  const today = new Date().toDateString();
  const lastPlayDate = new Date(gameState.lastPlayDate).toDateString();
  
  if (today !== lastPlayDate) {
    return {
      ...gameState,
      lastPlayDate: new Date().toISOString(),
      dailyEvents: {
        boss: false,
        officeLady: false,
        customer: false,
      },
    };
  }
  
  return gameState;
};

export const completeDailyEvent = (gameState: GameState, eventType: 'boss' | 'officeLady' | 'customer'): GameState => {
  return {
    ...gameState,
    dailyEvents: {
      ...gameState.dailyEvents,
      [eventType]: true,
    },
  };
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
  const baseState: GameState = {
    character,
    purchasedCharacters: [character],
    ownedItems: [],
    formations: [character.id],
    currency: 50,
    lastSaved: new Date().toISOString(),
    lastPlayDate: new Date().toISOString(),
    events: [],
    achievements: [],
    settings: {
      soundEnabled: true,
      musicEnabled: true,
      notificationsEnabled: true,
      autoSave: true,
    },
    dailyEvents: {
      boss: false,
      officeLady: false,
      customer: false,
    },
  };

  return normalizeGameState(baseState);
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
      type: '',
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
