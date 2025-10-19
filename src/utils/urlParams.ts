// URLパラメータから社畜診断のキャラクター情報を取得
export interface DiagnosisCharacter {
  characterId: string | null;
  characterName: string | null;
  fromShindan: boolean;
}

export function getCharacterFromUrl(): DiagnosisCharacter {
  const params = new URLSearchParams(window.location.search);
  
  const result = {
    characterId: params.get('char'),
    characterName: params.get('name'),
    fromShindan: params.get('from') === 'shindan'
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
export function convertDiagnosisCharacterToCharacter(diagnosisChar: DiagnosisCharacter) {
  if (!diagnosisChar.characterId || !diagnosisChar.characterName) {
    return null;
  }

  // キャラクターIDを数値に変換（001 -> 1）
  const characterIdNum = parseInt(diagnosisChar.characterId, 10);
  
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
      emoji: '🧑‍💼',
      characterId: characterIdNum,
    },
    createdAt: new Date().toISOString(),
  };
}
