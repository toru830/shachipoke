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
  console.log('getCharacterIdFromString called with:', characterId);
  const idMap: { [key: string]: number } = {
    // 正しい社畜診断の16種類のキャラクター
    'ELITE': 1,           // 生粋の社畜
    'BURNOUT': 2,         // 限界突破社畜
    'STOIC': 3,           // 無敗の職人社畜
    'LONE': 4,            // 孤高の成果主義社畜
    'KIND': 5,            // 心優しき社畜
    'SENSITIVE': 6,       // 誠実な観察社員
    'TEAM': 7,            // 共創リーダー社員
    'PACE': 8,            // マイペース社員
    'YURUFUWA': 9,        // ゆるふわ社畜
    'HIDDEN': 10,         // 隠れ疲労社畜
    'NICE': 11,           // お人好し社員
    'REAL': 12,           // 現実派社員
    'FAMILY': 13,         // 家庭が大事社員
    'LWB': 14,            // バランサー社員
    'ABLE': 15,           // 成果最適化社畜
    'FREE': 16,           // 自由人
    
    // 互換性のためのエイリアス
    'MY_PACE': 8,
    'FREE_PERSON': 16,
    'KIND_HEARTED': 5,
    'NICE_PERSON': 11,
    'GOOD_NATURED': 11,
  };
  
  const result = idMap[characterId.toUpperCase()];
  console.log('getCharacterIdFromString result:', result);
  return result;
}

// 診断から来たキャラクター情報をCharacter型に変換
export function convertDiagnosisCharacterToCharacter(diagnosisChar: DiagnosisCharacter): Character | null {
  if (!diagnosisChar.characterId || !diagnosisChar.characterName) {
    return null;
  }

  // キャラクターIDを処理（文字列IDを数値IDにマッピング）
  let validCharacterId: number | undefined;
  const characterIdNum = parseInt(diagnosisChar.characterId, 10);
  
  console.log('Character ID processing:', {
    characterId: diagnosisChar.characterId,
    characterIdNum: characterIdNum,
    isNaN: isNaN(characterIdNum)
  });
  
  if (!isNaN(characterIdNum)) {
    // 数値の場合（001 -> 1）
    console.log('Processing as number');
    validCharacterId = characterIdNum;
  } else {
    // 文字列の場合（PACE, KIND等）を数値IDにマッピング
    console.log('Processing as string, calling getCharacterIdFromString');
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
    type: '',
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