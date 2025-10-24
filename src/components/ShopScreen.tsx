import React, { useState } from 'react';
import { GameState } from '../types/character';
import { getShopItemsByCategory, ShopItem } from '../data/shopItems';
import { spendMoney, updateStat } from '../utils/gameLogic';

interface ShopScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ShopItem['category']>('food');
  const [message, setMessage] = useState<string>('');

  const categories = [
    { id: 'food' as const, name: '食べ物', icon: '🍱' },
    { id: 'drink' as const, name: '飲み物', icon: '🥤' },
    { id: 'equipment' as const, name: '装備', icon: '👔' },
    { id: 'training' as const, name: '研修', icon: '📚' },
  ];

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePurchase = (item: ShopItem) => {
    if (gameState.money < item.price) {
      showMessage('お金が足りません！');
      return;
    }

    const spentState = spendMoney(gameState, item.price);
    if (!spentState) {
      showMessage('お金が足りません！');
      return;
    }

    let updatedState = { ...spentState };

    // ステータス効果を適用
    if (item.effects) {
      Object.entries(item.effects).forEach(([stat, value]) => {
        if (typeof value === 'number' && value > 0) {
          updatedState.character = updateStat(updatedState.character, stat as keyof typeof gameState.character.stats, value);
        }
      });
    }

    onGameStateUpdate(updatedState);
    showMessage(`${item.name}を購入しました！`);
  };

  const shopItems = getShopItemsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 pb-32 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          ショップ
        </h1>

        {/* お金表示 */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-2xl font-bold text-gray-800">{gameState.money}</span>
            <span className="text-lg text-gray-600">シャチ</span>
          </div>
        </div>

        {/* メッセージ */}
        {message && (
          <div className="bg-blue-100 border border-blue-300 text-blue-700 px-4 py-3 rounded-lg mb-6 text-center">
            {message}
          </div>
        )}

        {/* カテゴリ選択 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">カテゴリ</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-semibold text-gray-800">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 商品一覧 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="text-lg font-bold text-green-600">💰 {item.price}</div>
                  </div>
                </div>
                
                {/* 効果表示 */}
                {item.effects && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-500 mb-1">効果:</div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(item.effects).map(([stat, value]) => (
                        <span
                          key={stat}
                          className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                        >
                          {stat === 'stress' && '☹️'}
                          {stat === 'communication' && '💬'}
                          {stat === 'endurance' && '💪'}
                          {stat === 'luck' && '🍀'}
                          {typeof value === 'number' && value > 0 ? '+' : ''}{typeof value === 'number' ? value : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}


                <button
                  onClick={() => handlePurchase(item)}
                  disabled={gameState.money < item.price}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    gameState.money >= item.price
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  購入
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;