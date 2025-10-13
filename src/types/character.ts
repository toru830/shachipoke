export interface Character {
  id: string;
  name: string;
  type: string; // キャラクタータイプ（例：新入社員、中堅、管理職候補など）
  level: number;
  exp: number;
  expToNextLevel: number;
  stats: {
    stress: number; // ストレス耐性
    communication: number; // コミュニケーション力
    endurance: number; // 体力・持久力
    luck: number; // 運
  };
  appearance: {
    color: string; // キャラクターの色
    style: string; // 見た目のスタイル
    emoji?: string; // キャラクターの絵文字（社畜診断から）
    avatar?: string; // アバター画像URL（オプション）
  };
  createdAt: string;
}

export interface GameState {
  character: Character | null;
  shachiCoins: number; // シャチコイン
  todayEvents: {
    bossQA: boolean;
    officeHarassment: boolean;
    earlyArrival: boolean;
  };
  lastPlayDate: string;
  totalEvents: number;
  successCount: number;
}

export interface Event {
  id: string;
  type: 'boss' | 'office' | 'arrival';
  title: string;
  description: string;
  options: EventOption[];
}

export interface EventOption {
  id: string;
  text: string;
  result: 'success' | 'partial' | 'fail';
  reward: number; // シャチコイン報酬
  expGain: number; // 経験値
  feedback: string; // フィードバックメッセージ
}

