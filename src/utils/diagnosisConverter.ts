import { DiagnosisResult } from '../types/diagnosis';
import { Character } from '../types/character';
import { CHARACTER_ICONS } from '../types/diagnosis';

export const convertDiagnosisToCharacter = (diagnosis: DiagnosisResult): Character => {
  // アイコンIDからアバターURLを生成
  let avatarUrl: string | undefined;
  if (diagnosis.appearance.iconId && diagnosis.appearance.iconId in CHARACTER_ICONS) {
    avatarUrl = CHARACTER_ICONS[diagnosis.appearance.iconId as keyof typeof CHARACTER_ICONS];
  }

  return {
    id: diagnosis.id,
    name: diagnosis.name,
    type: diagnosis.type,
    level: 1, // 診断から来たキャラクターはレベル1から開始
    exp: 0,
    expToNextLevel: 100,
    stats: {
      stress: Math.max(0, Math.min(100, diagnosis.stats.stress)),
      communication: Math.max(0, Math.min(100, diagnosis.stats.communication)),
      endurance: Math.max(0, Math.min(100, diagnosis.stats.endurance)),
      luck: Math.max(0, Math.min(100, diagnosis.stats.luck)),
    },
    appearance: {
      color: diagnosis.appearance.color || '#3b82f6',
      style: diagnosis.appearance.style || 'default',
      emoji: diagnosis.appearance.emoji,
      avatar: avatarUrl || diagnosis.appearance.avatar,
    },
    createdAt: new Date().toISOString(),
  };
};

// URLパラメータから診断結果を取得
export const getDiagnosisFromURL = (): DiagnosisResult | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const diagnosisData = params.get('diagnosis');
    
    if (!diagnosisData) return null;
    
    const decoded = JSON.parse(decodeURIComponent(diagnosisData));
    
    // 必須フィールドの検証
    if (!decoded.name || !decoded.type || !decoded.stats) {
      console.error('Invalid diagnosis data: missing required fields');
      return null;
    }
    
    return {
      id: decoded.id || crypto.randomUUID(),
      name: decoded.name,
      type: decoded.type,
      description: decoded.description || '',
      stats: {
        stress: Number(decoded.stats.stress) || 50,
        communication: Number(decoded.stats.communication) || 50,
        endurance: Number(decoded.stats.endurance) || 50,
        luck: Number(decoded.stats.luck) || 50,
      },
      appearance: {
        color: decoded.appearance?.color || '#3b82f6',
        style: decoded.appearance?.style || 'default',
        emoji: decoded.appearance?.emoji,
        avatar: decoded.appearance?.avatar,
        iconId: Number(decoded.appearance?.iconId) || undefined,
      },
      diagnosisData: decoded.diagnosisData,
    };
  } catch (error) {
    console.error('Failed to parse diagnosis from URL:', error);
    return null;
  }
};

// 診断結果のサンプルデータ（テスト用）
export const createSampleDiagnosis = (iconId: number = 1): DiagnosisResult => {
  const sampleNames = [
    '新米社畜くん', '疲れ切った社員', '燃え尽き症候群', '完璧主義者',
    '残業マスター', 'ストレス耐性MAX', 'コミュ力不足', '運のない人',
    '上司のペット', 'お局様のターゲット', '朝活社畜', '夜型社畜',
    '完璧な社畜', '問題児社畜', '影の実力者', '透明人間'
  ];

  const sampleTypes = [
    '新入社員', '中堅社員', '管理職候補', 'ベテラン社員',
    'フリーター出身', '転職組', '昇進組', '降格組'
  ];

  return {
    id: crypto.randomUUID(),
    name: sampleNames[iconId - 1] || `社畜${iconId}号`,
    type: sampleTypes[Math.floor(Math.random() * sampleTypes.length)],
    description: `診断結果: ${sampleNames[iconId - 1] || `社畜${iconId}号`}`,
    stats: {
      stress: Math.floor(Math.random() * 40) + 30,
      communication: Math.floor(Math.random() * 40) + 30,
      endurance: Math.floor(Math.random() * 40) + 30,
      luck: Math.floor(Math.random() * 40) + 30,
    },
    appearance: {
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      style: 'default',
      iconId: iconId,
    },
  };
};
