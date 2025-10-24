import React, { useState } from 'react';
import { GameState } from '../types/character';
import { updateStat, spendCurrency } from '../utils/gameLogic';

interface UpgradeScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const UpgradeScreen: React.FC<UpgradeScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [message, setMessage] = useState<string>('');

  const upgradeCosts = {
    stress: 20,
    communication: 25,
    endurance: 30,
    luck: 35,
  };

  const handleUpgrade = (statName: keyof typeof gameState.character.stats) => {
    const cost = upgradeCosts[statName];
    
    if (gameState.currency < cost) {
      setMessage('お金が足りません！');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (gameState.character.stats[statName] >= 100) {
      setMessage('この能力は既に最大値です！');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    let newGameState = spendCurrency(gameState, cost);
    if (!newGameState) return;

    newGameState.character = updateStat(newGameState.character, statName, 5);
    
    onGameStateUpdate(newGameState);
    setMessage(`${statName}を+5アップグレードしました！`);
    setTimeout(() => setMessage(''), 3000);
  };

  const getStatDisplayName = (stat: string) => {
    switch (stat) {
      case 'stress': return 'ストレス耐性';
      case 'communication': return 'コミュニケーション';
      case 'endurance': return '持久力';
      case 'luck': return '運';
      default: return stat;
    }
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'stress': return '😤';
      case 'communication': return '💬';
      case 'endurance': return '💪';
      case 'luck': return '🍀';
      default: return '📊';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">アップグレード</h1>
        
        {/* お金の表示 */}
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4 w-full justify-center">
          <span className="text-lg">💰</span>
          <span className="font-bold">${gameState.currency} シャチ</span>
        </div>

        {/* メッセージ */}
        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        {/* 統計値アップグレード */}
        <div className="space-y-4">
          {Object.entries(gameState.character.stats).map(([stat, value]) => (
            <div key={stat} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getStatIcon(stat)}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{getStatDisplayName(stat)}</h3>
                    <p className="text-sm text-gray-600">現在: {value}/100</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">${upgradeCosts[stat as keyof typeof upgradeCosts]}</div>
                  <button
                    onClick={() => handleUpgrade(stat as keyof typeof gameState.character.stats)}
                    disabled={gameState.currency < upgradeCosts[stat as keyof typeof upgradeCosts] || value >= 100}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      gameState.currency >= upgradeCosts[stat as keyof typeof upgradeCosts] && value < 100
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {value >= 100 ? '最大' : '+5'}
                  </button>
                </div>
              </div>
              
              {/* プログレスバー */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* レベル情報 */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">レベル情報</h3>
          <div className="text-sm text-gray-600">
            <p>現在のレベル: {gameState.character.level}</p>
            <p>経験値: {gameState.character.exp} / {gameState.character.expToNextLevel}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(gameState.character.exp / gameState.character.expToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeScreen;
