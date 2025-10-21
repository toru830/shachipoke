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

// 診断から来たキャラクター情報をCharacter型に変換
export function convertDiagnosisCharacterToCharacter(diagnosisChar: DiagnosisCharacter): Character | null {
  if (!diagnosisChar.characterId || !diagnosisChar.characterName) {
    return null;
  }

  // キャラクターIDを処理（数値の場合は数値に、文字列の場合はそのまま）
  let validCharacterId: number | string | undefined;
  const characterIdNum = parseInt(diagnosisChar.characterId, 10);
  
  if (!isNaN(characterIdNum)) {
    // 数値の場合（001 -> 1）
    validCharacterId = characterIdNum;
  } else {
    // 文字列の場合（PACE, FREE等）
    validCharacterId = diagnosisChar.characterId;
  }
  
  console.log('Character ID conversion:', {
    original: diagnosisChar.characterId,
    parsed: characterIdNum,
    valid: validCharacterId
  });
  
  // 文字列キャラクターIDに応じた絵文字を設定
  const getEmojiForCharacterId = (id: string | number | undefined): string => {
    if (typeof id === 'string') {
      switch (id.toUpperCase()) {
        case 'PACE':
        case 'MY_PACE':
          return '🐌'; // マイペース
        case 'FREE':
        case 'FREE_PERSON':
          return '🕊️'; // 自由人
        case 'WORKAHOLIC':
          return '💼'; // ワーカホリック
        case 'BURNOUT':
          return '😵'; // 燃え尽き
        case 'SLAVE':
          return '⛓️'; // 社畜
        default:
          return '🧑‍💼'; // デフォルト
      }
    }
    return '🧑‍💼'; // デフォルト
  };

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
      emoji: getEmojiForCharacterId(validCharacterId),
      characterId: validCharacterId,
    },
    createdAt: new Date().toISOString(),
  };
}
