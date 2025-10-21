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

// 毎日の3種の質疑応答イベント
export const dailyEvents = {
  boss: [
    {
      id: 'boss_call_1',
      title: '上司から呼ばれた！',
      description: '「おい、君のレポートは何だこれ！全然ダメじゃないか！明日までに全部書き直しだ！」',
      choices: [
        {
          text: '「はい、承知いたしました。すぐに修正いたします！」',
          effects: {
            exp: 15,
            money: 10,
            stats: {
              stress: 5,
              communication: 3,
            },
          },
        },
        {
          text: '「申し訳ございません。より注意深く作成いたします」',
          effects: {
            exp: 10,
            money: 5,
            stats: {
              stress: 3,
              communication: 2,
            },
          },
        },
        {
          text: '「時間が足りませんでしたが、精一杯やりました」',
          effects: {
            exp: 5,
            stats: {
              stress: 8,
              communication: -2,
            },
          },
        },
      ],
    },
    {
      id: 'boss_call_2',
      title: '上司から呼ばれた！',
      description: '「君の企画書、全然売れそうにないな。もっと市場を研究してこい！」',
      choices: [
        {
          text: '「市場調査を徹底的に行い、改善案を提出いたします！」',
          effects: {
            exp: 20,
            money: 15,
            stats: {
              stress: 4,
              communication: 5,
            },
          },
        },
        {
          text: '「申し訳ございません。より深く分析いたします」',
          effects: {
            exp: 12,
            money: 8,
            stats: {
              stress: 6,
              communication: 3,
            },
          },
        },
        {
          text: '「でも、この企画には自信があります...」',
          effects: {
            exp: 8,
            stats: {
              stress: 10,
              communication: -3,
            },
          },
        },
      ],
    },
    {
      id: 'boss_call_3',
      title: '上司から呼ばれた！',
      description: '「君の態度が最近だらしがない！もっと気を引き締めろ！」',
      choices: [
        {
          text: '「はい、気を引き締めて頑張ります！」',
          effects: {
            exp: 18,
            money: 12,
            stats: {
              stress: 3,
              communication: 4,
            },
          },
        },
        {
          text: '「申し訳ございません。改善いたします」',
          effects: {
            exp: 10,
            money: 6,
            stats: {
              stress: 5,
              communication: 2,
            },
          },
        },
        {
          text: '「特に変わったつもりはありませんが...」',
          effects: {
            exp: 5,
            stats: {
              stress: 12,
              communication: -5,
            },
          },
        },
      ],
    },
  ],
  officeLady: [
    {
      id: 'office_lady_1',
      title: 'お局様からの小言だ！',
      description: '「あなた、最近挨拶ができてないわよ。社会人として最低限のマナーでしょ？」',
      choices: [
        {
          text: '「申し訳ございません。今後気をつけます」',
          effects: {
            exp: 12,
            money: 8,
            stats: {
              stress: 2,
              communication: 4,
            },
          },
        },
        {
          text: '「いつも挨拶しているつもりですが...」',
          effects: {
            exp: 8,
            money: 4,
            stats: {
              stress: 6,
              communication: 1,
            },
          },
        },
        {
          text: '「すみません、気づきませんでした」',
          effects: {
            exp: 5,
            stats: {
              stress: 8,
              communication: -2,
            },
          },
        },
      ],
    },
    {
      id: 'office_lady_2',
      title: 'お局様からの小言だ！',
      description: '「あなたのデスク周り、散らかってるわよ。整理整頓は基本中の基本よ」',
      choices: [
        {
          text: '「すぐに片付けます。ご指摘ありがとうございます」',
          effects: {
            exp: 10,
            money: 6,
            stats: {
              stress: 1,
              communication: 3,
            },
          },
        },
        {
          text: '「忙しくて手が回らなくて...」',
          effects: {
            exp: 6,
            money: 3,
            stats: {
              stress: 5,
              communication: 1,
            },
          },
        },
        {
          text: '「見た目は散らかってますが、必要なものは分かってます」',
          effects: {
            exp: 3,
            stats: {
              stress: 7,
              communication: -1,
            },
          },
        },
      ],
    },
    {
      id: 'office_lady_3',
      title: 'お局様からの小言だ！',
      description: '「あなた、最近遅刻が多いわね。時間管理ができてないのよ」',
      choices: [
        {
          text: '「申し訳ございません。早起きして改善します」',
          effects: {
            exp: 15,
            money: 10,
            stats: {
              stress: 3,
              communication: 3,
            },
          },
        },
        {
          text: '「電車の遅延が多くて...」',
          effects: {
            exp: 8,
            money: 5,
            stats: {
              stress: 6,
              communication: 1,
            },
          },
        },
        {
          text: '「そんなに遅刻してませんが...」',
          effects: {
            exp: 4,
            stats: {
              stress: 9,
              communication: -3,
            },
          },
        },
      ],
    },
  ],
  customer: [
    {
      id: 'customer_call_1',
      title: 'お客からの電話だ！',
      description: '「お前らの商品、全然期待通りじゃない！こんなの買うんじゃなかった！」',
      choices: [
        {
          text: '「大変申し訳ございません。すぐに調査いたします」',
          effects: {
            exp: 20,
            money: 15,
            stats: {
              stress: 4,
              communication: 6,
            },
          },
        },
        {
          text: '「どの部分がご期待に沿わなかったか教えていただけますか」',
          effects: {
            exp: 15,
            money: 10,
            stats: {
              stress: 6,
              communication: 4,
            },
          },
        },
        {
          text: '「商品の仕様は事前にご説明した通りですが...」',
          effects: {
            exp: 8,
            stats: {
              stress: 12,
              communication: -4,
            },
          },
        },
      ],
    },
    {
      id: 'customer_call_2',
      title: 'お客からの電話だ！',
      description: '「対応が遅い！いつになったら解決するんだ！時間は有限なんだよ！」',
      choices: [
        {
          text: '「お急ぎの件と承知いたしました。最優先で対応いたします」',
          effects: {
            exp: 18,
            money: 12,
            stats: {
              stress: 5,
              communication: 5,
            },
          },
        },
        {
          text: '「現在進行中です。進捗をお伝えいたします」',
          effects: {
            exp: 12,
            money: 8,
            stats: {
              stress: 7,
              communication: 3,
            },
          },
        },
        {
          text: '「お客様のご要望は複雑で時間がかかっております」',
          effects: {
            exp: 6,
            stats: {
              stress: 10,
              communication: -2,
            },
          },
        },
      ],
    },
    {
      id: 'customer_call_3',
      title: 'お客からの電話だ！',
      description: '「説明が分かりにくい！もっと分かりやすく説明しろ！」',
      choices: [
        {
          text: '「申し訳ございません。図解を使って説明いたします」',
          effects: {
            exp: 16,
            money: 10,
            stats: {
              stress: 3,
              communication: 6,
            },
          },
        },
        {
          text: '「どの部分が分かりにくいか教えていただけますか」',
          effects: {
            exp: 12,
            money: 7,
            stats: {
              stress: 5,
              communication: 4,
            },
          },
        },
        {
          text: '「前回と同じ説明をしましたが...」',
          effects: {
            exp: 6,
            stats: {
              stress: 8,
              communication: -3,
            },
          },
        },
      ],
    },
  ],
};

export const events: Event[] = [
  ...dailyEvents.boss,
  ...dailyEvents.officeLady,
  ...dailyEvents.customer,
];

export const getRandomEvent = (): Event => {
  return events[Math.floor(Math.random() * events.length)];
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};
