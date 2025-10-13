// 社畜診断サイトからの連携データ形式
export interface DiagnosisResult {
  id: string;
  name: string; // 診断結果の名前
  type: string; // 社畜タイプ（例：新入社員、中堅社員、管理職候補など）
  description: string; // 診断結果の説明
  stats: {
    stress: number; // ストレス耐性 (0-100)
    communication: number; // コミュニケーション力 (0-100)
    endurance: number; // 体力・持久力 (0-100)
    luck: number; // 運 (0-100)
  };
  appearance: {
    color: string; // キャラクターの背景色（HEX）
    style: string; // スタイル（将来の拡張用）
    emoji?: string; // 絵文字（オプション）
    avatar?: string; // アバター画像URL（オプション）
    iconId?: number; // 社畜アイコンのID（1-16）
  };
  diagnosisData?: {
    // 診断サイト固有のデータ（将来の拡張用）
    rawScore?: number;
    category?: string;
    traits?: string[];
  };
}

// 社畜アイコンのマッピング
export const CHARACTER_ICONS = {
  1: '/characters/001.png',
  2: '/characters/002.png',
  3: '/characters/003.png',
  4: '/characters/004.png',
  5: '/characters/005.png',
  6: '/characters/006.png',
  7: '/characters/007.png',
  8: '/characters/008.png',
  9: '/characters/009.png',
  10: '/characters/010.png',
  11: '/characters/011.png',
  12: '/characters/012.png',
  13: '/characters/013.png',
  14: '/characters/014.png',
  15: '/characters/015.png',
  16: '/characters/016.png',
} as const;

export type CharacterIconId = keyof typeof CHARACTER_ICONS;
