export interface Character {
  id: string;
  name: string;
  type: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  stats: {
    stress: number;
    communication: number;
    endurance: number;
    luck: number;
  };
  appearance: {
    color: string;
    style: string;
    emoji?: string;
    avatar?: string;
    characterId?: number | string;
  };
  createdAt: string;
}

export interface GameState {
  character: Character;
  ownedCharacters: Character[];
  formation: string[];
  money: number;
  lastPlayDate: string;
  events: string[];
  achievements: Achievement[];
  settings: GameSettings;
  dailyEvents: {
    boss: boolean;
    officeLady: boolean;
    customer: boolean;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'level' | 'money' | 'event' | 'stat' | 'special';
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  autoSave: boolean;
}
