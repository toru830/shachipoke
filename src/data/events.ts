export interface Event {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
  requirements?: {
    level?: number;
    stats?: {
      stress?: number;
      communication?: number;
      endurance?: number;
      luck?: number;
    };
  };
}

export interface EventChoice {
  text: string;
  effects: {
    exp?: number;
    money?: number;
    stats?: {
      stress?: number;
      communication?: number;
      endurance?: number;
      luck?: number;
    };
  };
  nextEventId?: string;
}

export const events: Event[] = [
  {
    id: 'morning_meeting',
    title: '朝の会議',
    description: '朝一番の会議で重要な案件について話し合います。',
    choices: [
      {
        text: '積極的に発言する',
        effects: {
          exp: 10,
          stats: {
            communication: 5,
            stress: 3,
          },
        },
      },
      {
        text: '静かに聞いている',
        effects: {
          exp: 5,
          stats: {
            stress: -2,
          },
        },
      },
    ],
  },
  {
    id: 'overtime',
    title: '残業の誘い',
    description: '同僚から残業の誘いがありました。',
    choices: [
      {
        text: '残業を引き受ける',
        effects: {
          exp: 15,
          money: 20,
          stats: {
            endurance: 3,
            stress: 5,
          },
        },
      },
      {
        text: '断る',
        effects: {
          stats: {
            stress: -3,
            communication: -2,
          },
        },
      },
    ],
  },
  {
    id: 'lunch_break',
    title: 'ランチタイム',
    description: '昼休みに同僚とランチに行くことになりました。',
    choices: [
      {
        text: '高級レストランに行く',
        effects: {
          money: -30,
          stats: {
            communication: 5,
            stress: -2,
          },
        },
      },
      {
        text: 'コンビニ弁当で済ませる',
        effects: {
          money: -5,
          stats: {
            stress: 2,
          },
        },
      },
    ],
  },
  {
    id: 'project_deadline',
    title: 'プロジェクト締切',
    description: '重要なプロジェクトの締切が迫っています。',
    choices: [
      {
        text: '徹夜で頑張る',
        effects: {
          exp: 25,
          money: 30,
          stats: {
            endurance: 5,
            stress: 8,
          },
        },
      },
      {
        text: '計画的に進める',
        effects: {
          exp: 15,
          stats: {
            communication: 3,
            stress: 2,
          },
        },
      },
    ],
  },
  {
    id: 'company_party',
    title: '会社の飲み会',
    description: '会社の飲み会に参加することになりました。',
    choices: [
      {
        text: '積極的に参加する',
        effects: {
          exp: 8,
          money: -20,
          stats: {
            communication: 4,
            stress: -3,
          },
        },
      },
      {
        text: '早めに帰る',
        effects: {
          exp: 3,
          money: -5,
          stats: {
            stress: -1,
          },
        },
      },
    ],
  },
];

export const getRandomEvent = (): Event => {
  return events[Math.floor(Math.random() * events.length)];
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};
