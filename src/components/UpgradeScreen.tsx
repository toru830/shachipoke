import { useState } from 'react';
import { GameState } from '../types/character';
import { upgradeCharacter } from '../utils/gameLogic';
import CharacterAvatar from './CharacterAvatar';

interface UpgradeScreenProps {
  gameState: GameState;
  onClose: (updatedState: GameState) => void;
}

const UpgradeScreen = ({ gameState, onClose }: UpgradeScreenProps) => {
  const [localState, setLocalState] = useState<GameState>(gameState);
  const [message, setMessage] = useState<string>('');

  const handleUpgrade = (stat: 'stress' | 'communication' | 'endurance' | 'luck', baseCost: number) => {
    if (!localState.character) return;

    const currentValue = localState.character.stats[stat];
    const actualCost = Math.floor(baseCost * (1 + currentValue / 50));

    if (localState.shachiCoins < actualCost) {
      setMessage('❌ シャチコインが足りません！');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const { character: upgradedCharacter } = upgradeCharacter(
      localState.character,
      stat,
      baseCost
    );

    const newState = {
      ...localState,
      character: upgradedCharacter,
      shachiCoins: localState.shachiCoins - actualCost,
    };

    setLocalState(newState);
    setMessage('✨ 強化成功！');
    setTimeout(() => setMessage(''), 2000);
  };

  const getUpgradeCost = (stat: 'stress' | 'communication' | 'endurance' | 'luck', baseCost: number): number => {
    if (!localState.character) return baseCost;
    const currentValue = localState.character.stats[stat];
    return Math.floor(baseCost * (1 + currentValue / 50));
  };

  const handleClose = () => {
    onClose(localState);
  };

  if (!localState.character) return null;

  const { character, shachiCoins } = localState;

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                ←
              </button>
              <h2 className="text-xl font-bold text-gray-800">
                ✨ キャラクター強化
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-xl">💰</span>
              <span className="font-bold text-yellow-800">{shachiCoins}</span>
            </div>
          </div>
        </div>

        {/* メッセージ */}
        {message && (
          <div className="bg-blue-500 text-white text-center py-3 px-4 rounded-xl font-bold animate-bounce">
            {message}
          </div>
        )}

        {/* キャラクター情報 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <CharacterAvatar 
              character={character} 
              size="medium"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{character.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  {character.type}
                </span>
                <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                  Lv.{character.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 強化メニュー */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📊 ステータス強化（+5）
          </h3>
          <div className="space-y-3">
            <UpgradeCard
              emoji="💪"
              label="ストレス耐性"
              currentValue={character.stats.stress}
              cost={getUpgradeCost('stress', 30)}
              onUpgrade={() => handleUpgrade('stress', 30)}
              canAfford={shachiCoins >= getUpgradeCost('stress', 30)}
              color="red"
            />
            <UpgradeCard
              emoji="💬"
              label="コミュニケーション力"
              currentValue={character.stats.communication}
              cost={getUpgradeCost('communication', 30)}
              onUpgrade={() => handleUpgrade('communication', 30)}
              canAfford={shachiCoins >= getUpgradeCost('communication', 30)}
              color="blue"
            />
            <UpgradeCard
              emoji="⚡"
              label="体力"
              currentValue={character.stats.endurance}
              cost={getUpgradeCost('endurance', 30)}
              onUpgrade={() => handleUpgrade('endurance', 30)}
              canAfford={shachiCoins >= getUpgradeCost('endurance', 30)}
              color="green"
            />
            <UpgradeCard
              emoji="🍀"
              label="運"
              currentValue={character.stats.luck}
              cost={getUpgradeCost('luck', 30)}
              onUpgrade={() => handleUpgrade('luck', 30)}
              canAfford={shachiCoins >= getUpgradeCost('luck', 30)}
              color="yellow"
            />
          </div>
        </div>

        {/* 説明 */}
        <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
          <p className="font-semibold mb-2">💡 強化のヒント</p>
          <ul className="list-disc list-inside space-y-1">
            <li>ステータスが高いほど強化コストが増加します</li>
            <li>イベントをクリアしてシャチコインを集めよう</li>
            <li>バランス良く育成するのがおすすめ！</li>
          </ul>
        </div>

        {/* 戻るボタン */}
        <button
          onClick={handleClose}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

interface UpgradeCardProps {
  emoji: string;
  label: string;
  currentValue: number;
  cost: number;
  onUpgrade: () => void;
  canAfford: boolean;
  color: 'red' | 'blue' | 'green' | 'yellow';
}

const UpgradeCard = ({ emoji, label, currentValue, cost, onUpgrade, canAfford, color }: UpgradeCardProps) => {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  const bgColorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <div>
            <div className="font-bold text-gray-800">{label}</div>
            <div className="text-sm text-gray-600">現在値: {currentValue}</div>
          </div>
        </div>
        <button
          onClick={onUpgrade}
          disabled={!canAfford}
          className={`px-4 py-2 rounded-lg font-bold text-white transition-all transform ${
            canAfford
              ? `bg-gradient-to-r ${colorClasses[color]} hover:scale-105 active:scale-95`
              : 'bg-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          💰 {cost}
        </button>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`${bgColorClasses[color]} h-full transition-all duration-500`}
          style={{ width: `${Math.min(currentValue, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UpgradeScreen;

