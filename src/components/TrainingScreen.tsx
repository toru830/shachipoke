import React, { useState } from 'react';
import { GameState } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface TrainingScreenProps {
  gameState: GameState;
  onClose: (updated: GameState) => void;
}

const TrainingScreen: React.FC<TrainingScreenProps> = ({ gameState, onClose }) => {
  const [state, setState] = useState<GameState>(gameState);
  const [message, setMessage] = useState<string>('');

  const trainingOptions = [
    {
      id: 'stress',
      name: 'ストレス耐性トレーニング',
      emoji: '💪',
      description: '上司の叱責に耐える練習',
      cost: 50,
      stat: 'stress' as const,
      gain: 2,
    },
    {
      id: 'communication',
      name: 'コミュニケーション研修',
      emoji: '💬',
      description: '同僚との関係を良くする練習',
      cost: 40,
      stat: 'communication' as const,
      gain: 2,
    },
    {
      id: 'endurance',
      name: '体力強化トレーニング',
      emoji: '⚡',
      description: '長時間労働に耐える体力作り',
      cost: 45,
      stat: 'endurance' as const,
      gain: 2,
    },
    {
      id: 'luck',
      name: '運気向上セミナー',
      emoji: '🍀',
      description: '幸運を引き寄せる方法を学ぶ',
      cost: 60,
      stat: 'luck' as const,
      gain: 2,
    },
  ];

  const startTraining = (option: typeof trainingOptions[0]) => {
    if (!state.character) return;
    
    if (state.shachiCoins < option.cost) {
      setMessage('❌ シャチが足りません');
      return;
    }

    const updatedCharacter = {
      ...state.character,
      stats: {
        ...state.character.stats,
        [option.stat]: Math.min(state.character.stats[option.stat] + option.gain, 100),
      },
    };

    setState({
      ...state,
      character: updatedCharacter,
      characters: state.characters.map(c => 
        c.id === state.character?.id ? updatedCharacter : c
      ),
      shachiCoins: state.shachiCoins - option.cost,
    });

    setMessage(`✅ ${option.name}完了！${option.stat}が${option.gain}アップ`);
  };

  const close = () => onClose(state);

  if (!state.character) {
    return (
      <div className="min-h-screen p-4 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">キャラクターが選択されていません</h2>
          <button
            onClick={close}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
          <button onClick={close} className="text-2xl text-gray-600 hover:text-gray-800">←</button>
          <h2 className="text-xl font-bold text-gray-800">💪 修行</h2>
          <div className="ml-auto flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <span className="text-xl">💰</span>
            <span className="font-bold text-yellow-800">{state.shachiCoins}</span>
          </div>
        </div>

        {/* 現在のキャラクター */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 border-2 border-green-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">修行中のキャラクター</h3>
          <div className="flex items-center gap-4">
            <CharacterAvatar 
              character={state.character} 
              size="medium" 
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800">{state.character.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  {state.character.type}
                </span>
                <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                  Lv.{state.character.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* メッセージ */}
        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg">{message}</div>
        )}

        {/* 修行メニュー */}
        <div className="space-y-3">
          {trainingOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{option.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{option.name}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-600">
                      💰 コスト: {option.cost}シャチ
                    </span>
                    <span className="text-sm text-gray-600">
                      📈 効果: {option.stat}+{option.gain}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => startTraining(option)}
                  disabled={state.shachiCoins < option.cost}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    state.shachiCoins >= option.cost
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  修行開始
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingScreen;
