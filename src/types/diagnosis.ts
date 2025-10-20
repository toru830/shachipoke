export interface DiagnosisResult {
  characterName: string;
  characterType: string;
  description: string;
  iconUrl?: string;
  stats?: {
    stress: number;
    communication: number;
    endurance: number;
    luck: number;
  };
}

export interface DiagnosisCharacter {
  characterId: string | null;
  characterName: string | null;
  fromShindan: boolean;
}

export const DIAGNOSIS_TYPES = [
  '生粋の社畜',
  '心優しき社畜', 
  'バランサー社員',
  '自由人',
  'エリート社員',
  'のんびり社員',
  '頑張り屋社員',
  'マイペース社員',
] as const;

export type DiagnosisType = typeof DIAGNOSIS_TYPES[number];
