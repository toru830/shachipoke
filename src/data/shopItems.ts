export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'drink' | 'equipment' | 'training';
  effects: {
    stats?: {
      stress?: number;
      communication?: number;
      endurance?: number;
      luck?: number;
    };
    exp?: number;
  };
  icon: string;
}

export const shopItems: ShopItem[] = [
  {
    id: 'coffee',
    name: 'コーヒー',
    description: '疲れた心を癒してくれる温かいコーヒー',
    price: 10,
    category: 'drink',
    effects: {
      stats: {
        stress: -5,
        endurance: 2,
      },
    },
    icon: '☕',
  },
  {
    id: 'energy_drink',
    name: 'エナジードリンク',
    description: '疲労回復に効果的なエナジードリンク',
    price: 30,
    category: 'drink',
    effects: {
      stats: {
        endurance: 10,
      },
    },
    icon: '🥤',
  },
  {
    id: 'sleeping_bag',
    name: '寝袋',
    description: 'どこでも休める万能寝袋',
    price: 45,
    category: 'equipment',
    effects: {
      stats: {
        stress: 10,
      },
    },
    icon: '🛌',
  },
  {
    id: 'sub_display',
    name: 'サブディスプレイ',
    description: '作業効率がぐんと上がるデュアルモニター',
    price: 120,
    category: 'equipment',
    effects: {
      stats: {
        luck: 10,
      },
    },
    icon: '🖥️',
  },
  {
    id: 'trackball_mouse',
    name: 'トラックボールマウス',
    description: '長時間操作でも疲れにくい高性能マウス',
    price: 80,
    category: 'equipment',
    effects: {
      stats: {
        communication: 10,
      },
    },
    icon: '🖱️',
  },
  {
    id: 'stomach_medicine',
    name: '胃薬',
    description: '胃の負担をやわらげる常備薬',
    price: 25,
    category: 'food',
    effects: {
      stats: {
        stress: 5,
      },
    },
    icon: '🩺',
  },
  {
    id: 'razor',
    name: 'ひげ剃り',
    description: '身だしなみを整えて第一印象アップ',
    price: 35,
    category: 'equipment',
    effects: {
      stats: {
        communication: 5,
      },
    },
    icon: '🪒',
  },
  {
    id: 'lunch',
    name: 'お弁当',
    description: '栄養バランスの取れたお弁当',
    price: 20,
    category: 'food',
    effects: {
      stats: {
        stress: -3,
        endurance: 3,
      },
    },
    icon: '🍱',
  },
  {
    id: 'book',
    name: 'ビジネス書',
    description: 'スキルアップに役立つビジネス書',
    price: 50,
    category: 'training',
    effects: {
      exp: 20,
      stats: {
        communication: 3,
      },
    },
    icon: '📚',
  },
  {
    id: 'suit',
    name: 'スーツ',
    description: '高級なスーツで印象を良くする',
    price: 100,
    category: 'equipment',
    effects: {
      stats: {
        communication: 5,
        luck: 2,
      },
    },
    icon: '👔',
  },
  {
    id: 'stress_ball',
    name: 'ストレスボール',
    description: 'ストレス解消に効果的なボール',
    price: 25,
    category: 'equipment',
    effects: {
      stats: {
        stress: -8,
      },
    },
    icon: '⚽',
  },
  {
    id: 'vitamin',
    name: 'ビタミン剤',
    description: '体調管理に役立つビタミン剤',
    price: 30,
    category: 'food',
    effects: {
      stats: {
        endurance: 4,
        stress: -2,
      },
    },
    icon: '💊',
  },
  {
    id: 'seminar',
    name: 'セミナー参加',
    description: 'スキルアップのためのセミナー',
    price: 80,
    category: 'training',
    effects: {
      exp: 30,
      stats: {
        communication: 4,
        endurance: 2,
      },
    },
    icon: '🎓',
  },
];

export const getShopItemsByCategory = (category: ShopItem['category']): ShopItem[] => {
  return shopItems.filter(item => item.category === category);
};

export const getShopItemById = (id: string): ShopItem | undefined => {
  return shopItems.find(item => item.id === id);
};
