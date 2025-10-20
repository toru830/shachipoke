import { Character } from '../types/character';

export interface DiagnosisResult {
  characterName: string;
  characterType: string;
  description: string;
  iconUrl?: string;
}

export const getDiagnosisFromURL = (): DiagnosisResult | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const characterName = params.get('character');
    const characterType = params.get('type');
    const description = params.get('description');
    const iconUrl = params.get('icon');
    
    if (!characterName || !characterType) {
      return null;
    }

    return {
      characterName,
      characterType,
      description: description || '',
      iconUrl: iconUrl || undefined,
    };
  } catch (error) {
    console.error('Failed to parse diagnosis from URL:', error);
    return null;
  }
};

export const convertDiagnosisToCharacter = (diagnosis: DiagnosisResult): Character => {
  // アイコンURLからキャラクターIDを抽出
  let characterId: number | undefined;
  if (diagnosis.iconUrl) {
    const match = diagnosis.iconUrl.match(/(\d{3})\.png/);
    if (match) {
      characterId = parseInt(match[1], 10);
    }
  }

  // キャラクタータイプに基づいて統計値を設定
  const getStatsByType = (type: string) => {
    switch (type.toLowerCase()) {
      case '生粋の社畜':
        return { stress: 80, communication: 60, endurance: 90, luck: 30 };
      case '心優しき社畜':
        return { stress: 60, communication: 80, endurance: 70, luck: 50 };
      case 'バランサー社員':
        return { stress: 50, communication: 70, endurance: 60, luck: 60 };
      case '自由人':
        return { stress: 30, communication: 50, endurance: 40, luck: 80 };
      default:
        return { stress: 50, communication: 50, endurance: 50, luck: 50 };
    }
  };

  const stats = getStatsByType(diagnosis.characterType);

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    name: diagnosis.characterName,
    type: diagnosis.characterType,
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    stats,
    appearance: {
      color: '#4F46E5',
      style: 'default',
      emoji: '🧑‍💼',
      avatar: diagnosis.iconUrl,
      characterId: characterId,
    },
    createdAt: new Date().toISOString(),
  };
};
