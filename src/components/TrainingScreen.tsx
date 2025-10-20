import React, { useState } from 'react';
import { GameState } from '../types/character';
import { getTrainingsByLevel, Training } from '../data/training';
import { spendMoney, updateStat, addExp } from '../utils/gameLogic';

interface TrainingScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const TrainingScreen: React.FC<TrainingScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [message, setMessage] = useState<string>('');

  const availableTrainings = getTrainingsByLevel(gameState.character.level);

  const handleStartTraining = (training: Training) => {
    if (gameState.money < training.cost) {
      setMessage('お金が足りません！');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setSelectedTraining(training);
    setIsTraining(true);
    setMessage(`${training.name}を開始しました！`);

    // トレーニングの効果を即座に適用（実際のゲームでは時間をかける）
    let newGameState = spendMoney(gameState, training.cost);
    if (!newGameState) return;

    // 統計値を更新
    if (training.effects.stats) {
      Object.entries(training.effects.stats).forEach(([stat, value]) => {
        if (value !== undefined) {
          newGameState.character = updateStat(
            newGameState.character,
            stat as keyof typeof newGameState.character.stats,
            value
          );
        }
      });
    }

    // 経験値を追加
    if (training.effects.exp) {
      newGameState.character = addExp(newGameState.character, training.effects.exp);
    }

    onGameStateUpdate(newGameState);

    // トレーニング完了
    setTimeout(() => {
      setIsTraining(false);
      setSelectedTraining(null);
      setMessage(`${training.name}が完了しました！`);
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">トレーニング</h1>
        
        {/* お金の表示 */}
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4 w-full justify-center">
          <span className="text-lg">💰</span>
          <span className="font-bold">${gameState.money} シャチ</span>
        </div>

        {/* メッセージ */}
        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        {/* トレーニング中 */}
        {isTraining && selectedTraining && (
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg mb-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>{selectedTraining.name} トレーニング中...</p>
          </div>
        )}

        {/* トレーニングリスト */}
        <div className="space-y-3">
          {availableTrainings.map((training) => (
            <div key={training.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{training.icon}</span>
                    <h3 className="font-bold text-gray-800">{training.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  
                  {/* 効果の表示 */}
                  <div className="text-xs text-gray-500 mb-2">
                    {Object.entries(training.effects.stats).map(([stat, value]) => (
                      <span key={stat} className="mr-2">
                        {stat}: {value > 0 ? '+' : ''}{value}
                      </span>
                    ))}
                    {training.effects.exp && (
                      <span className="mr-2">EXP: +{training.effects.exp}</span>
                    )}
                  </div>

                  {/* 時間とコスト */}
                  <div className="text-xs text-gray-500">
                    時間: {training.duration}分 | コスト: ${training.cost}
                  </div>
                </div>
                
                <div className="text-right">
                  <button
                    onClick={() => handleStartTraining(training)}
                    disabled={isTraining || gameState.money < training.cost}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !isTraining && gameState.money >= training.cost
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isTraining ? 'トレーニング中' : '開始'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* レベルアップ情報 */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">レベルアップ情報</h3>
          <div className="text-sm text-gray-600">
            <p>現在のレベル: {gameState.character.level}</p>
            <p>経験値: {gameState.character.exp} / {gameState.character.expToNextLevel}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(gameState.character.exp / gameState.character.expToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingScreen;
