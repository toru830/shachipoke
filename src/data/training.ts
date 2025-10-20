export interface Training {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number; // 分
  effects: {
    stats: {
      stress?: number;
      communication?: number;
      endurance?: number;
      luck?: number;
    };
    exp?: number;
  };
  requirements?: {
    level?: number;
    stats?: {
      stress?: number;
      communication?: number;
      endurance?: number;
      luck?: number;
    };
  };
  icon: string;
}

export const trainings: Training[] = [
  {
    id: 'stress_management',
    name: 'ストレス管理研修',
    description: 'ストレスを効果的に管理する方法を学びます',
    cost: 20,
    duration: 30,
    effects: {
      stats: {
        stress: -10,
        communication: 2,
      },
      exp: 15,
    },
    icon: '🧘',
  },
  {
    id: 'communication_skill',
    name: 'コミュニケーション研修',
    description: '効果的なコミュニケーションスキルを身につけます',
    cost: 30,
    duration: 45,
    effects: {
      stats: {
        communication: 8,
        stress: 2,
      },
      exp: 20,
    },
    icon: '💬',
  },
  {
    id: 'endurance_training',
    name: '持久力トレーニング',
    description: '長時間の作業に耐える持久力を鍛えます',
    cost: 25,
    duration: 60,
    effects: {
      stats: {
        endurance: 10,
        stress: 5,
      },
      exp: 18,
    },
    icon: '💪',
  },
  {
    id: 'luck_enhancement',
    name: '運気向上セミナー',
    description: '運を良くするための心構えを学びます',
    cost: 40,
    duration: 90,
    effects: {
      stats: {
        luck: 8,
        stress: -3,
      },
      exp: 25,
    },
    icon: '🍀',
  },
  {
    id: 'leadership',
    name: 'リーダーシップ研修',
    description: 'チームを率いるリーダーシップを身につけます',
    cost: 60,
    duration: 120,
    effects: {
      stats: {
        communication: 6,
        endurance: 4,
        luck: 3,
      },
      exp: 35,
    },
    requirements: {
      level: 3,
    },
    icon: '👑',
  },
  {
    id: 'time_management',
    name: '時間管理術',
    description: '効率的な時間管理の技術を習得します',
    cost: 35,
    duration: 75,
    effects: {
      stats: {
        endurance: 5,
        stress: -5,
      },
      exp: 22,
    },
    icon: '⏰',
  },
];

export const getTrainingsByLevel = (level: number): Training[] => {
  return trainings.filter(training => 
    !training.requirements?.level || training.requirements.level <= level
  );
};

export const getTrainingById = (id: string): Training | undefined => {
  return trainings.find(training => training.id === id);
};
