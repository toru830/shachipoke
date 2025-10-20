import React, { useState } from 'react';
import { GameState } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface FormationScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const FormationScreen: React.FC<FormationScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [selectedFormation, setSelectedFormation] = useState<string>('balanced');

  const formations = [
    {
      id: 'balanced',
      name: 'バランス型',
      description: '全能力をバランスよく配置',
      icon: '⚖️',
      stats: { stress: 0, communication: 0, endurance: 0, luck: 0 }
    },
    {
      id: 'stress_focus',
      name: 'ストレス耐性重視',
      description: 'ストレス耐性を最大限に高める',
      icon: '😤',
      stats: { stress: 10, communication: -2, endurance: 5, luck: -3 }
    },
    {
      id: 'communication_focus',
      name: 'コミュニケーション重視',
      description: 'コミュニケーション能力を強化',
      icon: '💬',
      stats: { stress: -3, communication: 10, endurance: 2, luck: 1 }
    },
    {
      id: 'endurance_focus',
      name: '持久力重視',
      description: '長時間の作業に特化',
      icon: '💪',
      stats: { stress: 5, communication: -1, endurance: 10, luck: -4 }
    },
    {
      id: 'luck_focus',
      name: '運重視',
      description: '運の良さを最大限に活用',
      icon: '🍀',
      stats: { stress: -5, communication: 3, endurance: -2, luck: 10 }
    }
  ];

  const handleFormationChange = (formationId: string) => {
    setSelectedFormation(formationId);
  };

  const applyFormation = () => {
    const formation = formations.find(f => f.id === selectedFormation);
    if (!formation) return;

    const newGameState = { ...gameState };
    
    // フォーメーション効果を適用
    Object.entries(formation.stats).forEach(([stat, value]) => {
      if (value !== 0) {
        newGameState.character = {
          ...newGameState.character,
          stats: {
            ...newGameState.character.stats,
            [stat]: Math.max(0, Math.min(100, newGameState.character.stats[stat as keyof typeof newGameState.character.stats] + value))
          }
        };
      }
    });

    onGameStateUpdate(newGameState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">編成</h1>
        
        {/* 現在のキャラクター */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">現在のキャラクター</h2>
          <div className="flex justify-center mb-4">
            <CharacterAvatar character={gameState.character} size="large" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-800">{gameState.character.name}</h3>
            <p className="text-sm text-gray-600">レベル {gameState.character.level}</p>
          </div>
        </div>

        {/* フォーメーション選択 */}
        <div className="space-y-3 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">フォーメーション選択</h2>
          {formations.map((formation) => (
            <div
              key={formation.id}
              onClick={() => handleFormationChange(formation.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                selectedFormation === formation.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{formation.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{formation.name}</h3>
                  <p className="text-sm text-gray-600">{formation.description}</p>
                </div>
                <div className="text-right">
                  {selectedFormation === formation.id && (
                    <span className="text-blue-500 text-lg">✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 現在の統計値 */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">現在の統計値</h3>
          <div className="space-y-2">
            {Object.entries(gameState.character.stats).map(([stat, value]) => (
              <div key={stat} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {stat === 'stress' ? 'ストレス耐性' :
                   stat === 'communication' ? 'コミュニケーション' :
                   stat === 'endurance' ? '持久力' : '運'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-8">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 適用ボタン */}
        <div className="text-center">
          <button
            onClick={applyFormation}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            フォーメーションを適用
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationScreen;
