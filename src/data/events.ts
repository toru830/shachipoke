import { Event } from '../types/character';

export const bossEvents: Event[] = [
  {
    id: 'boss_1',
    type: 'boss',
    title: '上司からの急な依頼',
    description: '怖い上司から「今日中にこの資料まとめてくれ」と言われました。どう答えますか？',
    options: [
      {
        id: 'boss_1_a',
        text: '「かしこまりました！すぐに取り掛かります！」',
        result: 'success',
        reward: 30,
        expGain: 20,
        feedback: '素晴らしい！即答で快諾したあなたに上司も満足そうです。+30シャチ獲得！',
      },
      {
        id: 'boss_1_b',
        text: '「今抱えている仕事が終わってからでもよろしいでしょうか？」',
        result: 'partial',
        reward: 15,
        expGain: 10,
        feedback: '正直に状況を伝えましたが、上司は少し不満そう...+15シャチ獲得',
      },
      {
        id: 'boss_1_c',
        text: '「えっ...今日は無理です...」',
        result: 'fail',
        reward: 0,
        expGain: 5,
        feedback: '上司の顔が真っ赤に！社畜としてはまだまだですね...',
      },
    ],
  },
  {
    id: 'boss_2',
    type: 'boss',
    title: '上司のミスを発見',
    description: '上司が作成した資料に明らかなミスを発見しました。どうしますか？',
    options: [
      {
        id: 'boss_2_a',
        text: '「恐れ入りますが、こちらの部分を確認させていただいてもよろしいでしょうか？」',
        result: 'success',
        reward: 35,
        expGain: 25,
        feedback: '完璧な言い回し！上司も「よく気づいた」と褒めてくれました。+35シャチ獲得！',
      },
      {
        id: 'boss_2_b',
        text: 'そっと修正して何も言わない',
        result: 'partial',
        reward: 20,
        expGain: 15,
        feedback: '無難な対応ですね。でも上司は何も気づいていません。+20シャチ獲得',
      },
      {
        id: 'boss_2_c',
        text: '「部長、ここ間違ってますよ！」',
        result: 'fail',
        reward: 5,
        expGain: 5,
        feedback: '上司のプライドを傷つけてしまいました...空気を読みましょう...',
      },
    ],
  },
  {
    id: 'boss_3',
    type: 'boss',
    title: '休日出勤の依頼',
    description: '上司から「今週末、ちょっと来てもらえるかな？」と言われました。',
    options: [
      {
        id: 'boss_3_a',
        text: '「もちろんです！何時に出社すればよろしいでしょうか？」',
        result: 'success',
        reward: 40,
        expGain: 30,
        feedback: '完璧な社畜の鏡！上司は大喜びです。+40シャチ獲得！',
      },
      {
        id: 'boss_3_b',
        text: '「午前中であれば...」',
        result: 'partial',
        reward: 25,
        expGain: 15,
        feedback: '条件付きで承諾しました。まあまあの対応です。+25シャチ獲得',
      },
      {
        id: 'boss_3_c',
        text: '「すみません、予定があって...」',
        result: 'fail',
        reward: 0,
        expGain: 5,
        feedback: '社畜としてはNG！上司は不機嫌そうです...',
      },
    ],
  },
];

export const officeEvents: Event[] = [
  {
    id: 'office_1',
    type: 'office',
    title: 'お局様の嫌味',
    description: '「あら、もうお昼休憩？私が新人の頃は休憩なんて取れなかったわよ」と言われました。',
    options: [
      {
        id: 'office_1_a',
        text: '「そうなんですね！先輩の頃は大変でしたね！」',
        result: 'success',
        reward: 30,
        expGain: 20,
        feedback: '共感の姿勢で切り抜けました！お局様も満足そうです。+30シャチ獲得！',
      },
      {
        id: 'office_1_b',
        text: '「はい...」（と言って黙る）',
        result: 'partial',
        reward: 15,
        expGain: 10,
        feedback: '無難に切り抜けました。でも印象は良くないかも...+15シャチ獲得',
      },
      {
        id: 'office_1_c',
        text: '「でも今は労働基準法が...」',
        result: 'fail',
        reward: 0,
        expGain: 5,
        feedback: 'お局様の怒りを買ってしまいました！正論は通じません...',
      },
    ],
  },
  {
    id: 'office_2',
    type: 'office',
    title: 'お局様からの雑用',
    description: 'お局様から「ちょっとコピー取ってきて」と頼まれました。今自分も忙しいのですが...',
    options: [
      {
        id: 'office_2_a',
        text: '「はい！すぐにやります！」（今の作業を中断）',
        result: 'success',
        reward: 35,
        expGain: 25,
        feedback: '即座に対応！お局様も機嫌が良さそうです。+35シャチ獲得！',
      },
      {
        id: 'office_2_b',
        text: '「この作業が終わったらすぐに！」',
        result: 'partial',
        reward: 20,
        expGain: 15,
        feedback: 'お局様は少し不満そうですが、許してくれました。+20シャチ獲得',
      },
      {
        id: 'office_2_c',
        text: '「今忙しいので...」',
        result: 'fail',
        reward: 5,
        expGain: 5,
        feedback: 'お局様の逆鱗に触れました！明日から厳しくなりそう...',
      },
    ],
  },
  {
    id: 'office_3',
    type: 'office',
    title: 'お局様の昔話',
    description: 'お局様が1時間も昔話を始めました。自分の仕事が進まないのですが...',
    options: [
      {
        id: 'office_3_a',
        text: '「そうなんですか！もっと聞かせてください！」（笑顔で傾聴）',
        result: 'success',
        reward: 40,
        expGain: 30,
        feedback: '完璧な対応！お局様はあなたを気に入ったようです。+40シャチ獲得！',
      },
      {
        id: 'office_3_b',
        text: '適度に相槌を打ちながら作業を続ける',
        result: 'partial',
        reward: 25,
        expGain: 15,
        feedback: '器用に両立しました。まずまずの対応です。+25シャチ獲得',
      },
      {
        id: 'office_3_c',
        text: '「すみません、仕事があるので...」',
        result: 'fail',
        reward: 0,
        expGain: 5,
        feedback: 'お局様は気分を害しました。社畜力が足りません...',
      },
    ],
  },
];

export const arrivalEvents: Event[] = [
  {
    id: 'arrival_1',
    type: 'arrival',
    title: '朝の出社時刻',
    description: '今朝は何時に出社しましたか？（始業時刻は9:00です）',
    options: [
      {
        id: 'arrival_1_a',
        text: '8:00（1時間前）',
        result: 'success',
        reward: 40,
        expGain: 30,
        feedback: '素晴らしい！誰よりも早い出社です。上司も感心しています。+40シャチ獲得！',
      },
      {
        id: 'arrival_1_b',
        text: '8:30（30分前）',
        result: 'partial',
        reward: 25,
        expGain: 15,
        feedback: '良い心がけです。まずまずの社畜レベルですね。+25シャチ獲得',
      },
      {
        id: 'arrival_1_c',
        text: '8:55（ギリギリ）',
        result: 'fail',
        reward: 5,
        expGain: 5,
        feedback: 'ギリギリ出社...社畜としてはまだまだです...',
      },
    ],
  },
  {
    id: 'arrival_2',
    type: 'arrival',
    title: '休日の過ごし方',
    description: '昨日の休日はどう過ごしましたか？',
    options: [
      {
        id: 'arrival_2_a',
        text: '自宅で仕事の勉強をしていた',
        result: 'success',
        reward: 35,
        expGain: 25,
        feedback: '完璧な社畜マインド！向上心が素晴らしいです。+35シャチ獲得！',
      },
      {
        id: 'arrival_2_b',
        text: '趣味を楽しみながらリフレッシュした',
        result: 'partial',
        reward: 20,
        expGain: 15,
        feedback: 'まあ、休日は休むのも大事ですね...+20シャチ獲得',
      },
      {
        id: 'arrival_2_c',
        text: '一日中寝ていた',
        result: 'fail',
        reward: 10,
        expGain: 5,
        feedback: '自己管理が甘いですね...社畜失格です...',
      },
    ],
  },
  {
    id: 'arrival_3',
    type: 'arrival',
    title: '残業後の帰宅時刻',
    description: '昨日の残業、何時まで働きましたか？',
    options: [
      {
        id: 'arrival_3_a',
        text: '終電まで（24:00過ぎ）',
        result: 'success',
        reward: 45,
        expGain: 35,
        feedback: '究極の社畜魂！会社への貢献度MAX！+45シャチ獲得！',
      },
      {
        id: 'arrival_3_b',
        text: '22:00頃',
        result: 'partial',
        reward: 30,
        expGain: 20,
        feedback: '標準的な残業時間ですね。普通の社畜です。+30シャチ獲得',
      },
      {
        id: 'arrival_3_c',
        text: '定時退社（18:00）',
        result: 'fail',
        reward: 0,
        expGain: 5,
        feedback: '定時退社...？社畜としての自覚が足りません...',
      },
    ],
  },
];

export const getAllEvents = (): Event[] => {
  return [...bossEvents, ...officeEvents, ...arrivalEvents];
};

export const getRandomEventByType = (type: 'boss' | 'office' | 'arrival'): Event => {
  let events: Event[];
  switch (type) {
    case 'boss':
      events = bossEvents;
      break;
    case 'office':
      events = officeEvents;
      break;
    case 'arrival':
      events = arrivalEvents;
      break;
  }
  return events[Math.floor(Math.random() * events.length)];
};

