import React, { useState } from 'react';
import { GameState } from '../types/character';
import { getShopItemsByCategory, ShopItem } from '../data/shopItems';
import { spendMoney, updateStat, addExp } from '../utils/gameLogic';

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

  const handlePurchase = (item: ShopItem) => {
    if (gameState.money < item.price) {
      setMessage('お金が足りません！');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    let newGameState = spendMoney(gameState, item.price);
    if (!newGameState) {
      setMessage('購入に失敗しました！');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // アイテムの効果を適用
    if (item.effects.stats) {
      Object.entries(item.effects.stats).forEach(([stat, value]) => {
        if (value !== undefined) {
          newGameState.character = updateStat(
            newGameState.character,
            stat as keyof typeof newGameState.character.stats,
            value
          );
        }
      });
    }

    if (item.effects.exp) {
      newGameState.character = addExp(newGameState.character, item.effects.exp);
    }

    onGameStateUpdate(newGameState);
    setMessage(`${item.name}を購入しました！`);
    setTimeout(() => setMessage(''), 3000);
  };

  const filteredItems = getShopItemsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-32">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">ショップ</h1>

        {/* お金の表示 */}
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4 w-full justify-center">
          <span className="text-lg">💰</span>
          <span className="font-bold">{gameState.money} シャチ</span>
        </div>

        {/* カテゴリ選択 */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              aria-label={category.name}
              className={`flex items-center justify-center text-xl px-0 py-3 rounded-xl transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{category.icon}</span>
            </button>
          ))}
        </div>

        {/* メッセージ */}
        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}

        {/* アイテムリスト */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  
                  {/* 効果の表示 */}
                  <div className="text-xs text-gray-500">
                    {item.effects.stats && Object.entries(item.effects.stats).map(([stat, value]) => (
                      <span key={stat} className="mr-2">
                        {stat}: {value > 0 ? '+' : ''}{value}
                      </span>
                    ))}
                    {item.effects.exp && (
                      <span className="mr-2">EXP: +{item.effects.exp}</span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">💰 {item.price}</div>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={gameState.money < item.price}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      gameState.money >= item.price
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    購入
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
