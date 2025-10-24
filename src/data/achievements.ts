import { Achievement } from '../types/character';

export const achievements: Achievement[] = [
  {
    id: 'first_level',
    name: '初めてのレベルアップ',
    description: '初めてレベルアップしました',
    icon: '🎉',
    unlockedAt: '',
    category: 'level'
  },
  {
    id: 'level_5',
    name: '中級社畜',
    description: 'レベル5に到達しました',
    icon: '📈',
    unlockedAt: '',
    category: 'level'
  },
  {
    id: 'level_10',
    name: '上級社畜',
    description: 'レベル10に到達しました',
    icon: '🏆',
    unlockedAt: '',
    category: 'level'
  },
  {
    id: 'first_money',
    name: '初めてのお金',
    description: '初めてお金を獲得しました',
    icon: '💰',
    unlockedAt: '',
    category: 'money'
  },
  {
    id: 'rich',
    name: 'お金持ち',
    description: '1000シャチを獲得しました',
    icon: '💎',
    unlockedAt: '',
    category: 'money'
  },
  {
    id: 'stress_master',
    name: 'ストレス耐性マスター',
    description: 'ストレス耐性を100にしました',
    icon: '😤',
    unlockedAt: '',
    category: 'stat'
  },
  {
    id: 'communication_master',
    name: 'コミュニケーションマスター',
    description: 'コミュニケーションを100にしました',
    icon: '💬',
    unlockedAt: '',
    category: 'stat'
  },
  {
    id: 'endurance_master',
    name: '持久力マスター',
    description: '持久力を100にしました',
    icon: '💪',
    unlockedAt: '',
    category: 'stat'
  },
  {
    id: 'luck_master',
    name: '運の達人',
    description: '運を100にしました',
    icon: '🍀',
    unlockedAt: '',
    category: 'stat'
  },
  {
    id: 'event_master',
    name: 'イベントマスター',
    description: '10回イベントを経験しました',
    icon: '📅',
    unlockedAt: '',
    category: 'event'
  },
  {
    id: 'shopaholic',
    name: '買い物好き',
    description: '10回ショップで購入しました',
    icon: '🛒',
    unlockedAt: '',
    category: 'event'
  },
  {
    id: 'training_freak',
    name: 'トレーニング狂',
    description: '10回トレーニングを完了しました',
    icon: '🎓',
    unlockedAt: '',
    category: 'event'
  }
];

export const checkAchievements = (gameState: any): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  // レベル関連の実績
  if (gameState.character.level >= 1 && !gameState.achievements.find((a: Achievement) => a.id === 'first_level')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'first_level')!, unlockedAt: new Date().toISOString() });
  }
  if (gameState.character.level >= 5 && !gameState.achievements.find((a: Achievement) => a.id === 'level_5')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'level_5')!, unlockedAt: new Date().toISOString() });
  }
  if (gameState.character.level >= 10 && !gameState.achievements.find((a: Achievement) => a.id === 'level_10')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'level_10')!, unlockedAt: new Date().toISOString() });
  }
  
  // お金関連の実績
  if (gameState.currency > 0 && !gameState.achievements.find((a: Achievement) => a.id === 'first_money')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'first_money')!, unlockedAt: new Date().toISOString() });
  }
  if (gameState.currency >= 1000 && !gameState.achievements.find((a: Achievement) => a.id === 'rich')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'rich')!, unlockedAt: new Date().toISOString() });
  }
  
  // 統計値関連の実績
  if (gameState.character.stats.stress >= 100 && !gameState.achievements.find((a: Achievement) => a.id === 'stress_master')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'stress_master')!, unlockedAt: new Date().toISOString() });
  }
  if (gameState.character.stats.communication >= 100 && !gameState.achievements.find((a: Achievement) => a.id === 'communication_master')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'communication_master')!, unlockedAt: new Date().toISOString() });
  }
  if (gameState.character.stats.endurance >= 100 && !gameState.achievements.find((a: Achievement) => a.id === 'endurance_master')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'endurance_master')!, unlockedAt: new Date().toISOString() });
  }
  if (gameState.character.stats.luck >= 100 && !gameState.achievements.find((a: Achievement) => a.id === 'luck_master')) {
    newAchievements.push({ ...achievements.find(a => a.id === 'luck_master')!, unlockedAt: new Date().toISOString() });
  }
  
  return newAchievements;
};
