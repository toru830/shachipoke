import { Character } from '../types/character';

// URLパラメータから社畜診断のキャラクター情報を取得
export interface DiagnosisCharacter {
  characterId: string | null;
  characterName: string | null;
  fromShindan: boolean;
}

export function getCharacterFromUrl(): DiagnosisCharacter {
  const params = new URLSearchParams(window.location.search);

  // 受け入れる複数のキー名（互換性確保）
  const getAny = (keys: string[]): string | null => {
    for (const key of keys) {
      const v = params.get(key);
      if (v && v.trim().length > 0) return v.trim();
    }
    return null;
  };

  const characterId = getAny(['char', 'characterId', 'id', 'cid']);
  const characterName = getAny(['name', 'character', 'characterName', 'title', 'result']);
  const fromParam = getAny(['from', 'src', 'source']);

  const result = {
    characterId,
    characterName,
    fromShindan: (fromParam || '').toLowerCase() === 'shindan'
  };
  
  // デバッグ用ログ
  console.log('URL Parameters:', {
    char: result.characterId,
    name: result.characterName,
    from: params.get('from'),
    fromShindan: result.fromShindan
  });
  
  return result;
}

// 文字列キャラクターIDを数値ID（1-16）にマッピング
function getCharacterIdFromString(characterId: string): number | undefined {
  const idMap: { [key: string]: number } = {
    'PACE': 1,
    'MY_PACE': 1,
    'FREE': 2,
    'FREE_PERSON': 2,
    'WORKAHOLIC': 3,
    'BURNOUT': 4,
    'SLAVE': 5,
    'KIND': 6,
    'KIND_HEARTED': 6,
    'PERFECT': 7,
    'PERFECTIONIST': 7,
    'LAZY': 8,
    'LAZY_PERSON': 8,
    'STRESSED': 9,
    'STRESSED_OUT': 9,
    'HAPPY': 10,
    'HAPPY_WORKER': 10,
    'NICE': 6,
    'NICE_PERSON': 6,
    'GOOD_NATURED': 6,
    'BOSS': 11,
    'MANAGER': 12,
    'SENIOR': 13,
    'JUNIOR': 14,
    'INTERN': 15,
    'FREELANCER': 16,
  };
  
  return idMap[characterId.toUpperCase()];
}

// 診断から来たキャラクター情報をCharacter型に変換
export function convertDiagnosisCharacterToCharacter(diagnosisChar: DiagnosisCharacter): Character | null {
  if (!diagnosisChar.characterId || !diagnosisChar.characterName) {
    return null;
  }

  // キャラクターIDを処理（文字列IDを数値IDにマッピング）
  let validCharacterId: number | undefined;
  const characterIdNum = parseInt(diagnosisChar.characterId, 10);
  
  if (!isNaN(characterIdNum)) {
    // 数値の場合（001 -> 1）
    validCharacterId = characterIdNum;
  } else {
    // 文字列の場合（PACE, KIND等）を数値IDにマッピング
    validCharacterId = getCharacterIdFromString(diagnosisChar.characterId);
  }
  
  console.log('Character ID conversion:', {
    original: diagnosisChar.characterId,
    parsed: characterIdNum,
    valid: validCharacterId,
    isString: typeof diagnosisChar.characterId === 'string',
    isNumber: typeof validCharacterId === 'number',
    inRange: validCharacterId && validCharacterId >= 1 && validCharacterId <= 16
  });

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    name: diagnosisChar.characterName,
    type: '診断結果',
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    stats: {
      stress: 50,
      communication: 50,
      endurance: 50,
      luck: 50,
    },
    appearance: {
      color: '#4F46E5',
      style: 'default',
      emoji: '🧑‍💼', // デフォルト絵文字（画像が読み込めない場合のフォールバック）
      characterId: validCharacterId,
    },
    createdAt: new Date().toISOString(),
  };
}
