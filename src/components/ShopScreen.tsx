import { useState } from 'react';
import { GameState } from '../types/character';
import { shopItems } from '../data/shopItems';

interface ShopScreenProps {
  gameState: GameState;
  onClose: (updated: GameState) => void;
}

const ShopScreen = ({ gameState, onClose }: ShopScreenProps) => {
  const [state, setState] = useState<GameState>({ ...gameState, inventory: gameState.inventory ?? {} });
  const [message, setMessage] = useState<string>('');

  const buy = (id: string, price: number) => {
    if (state.shachiCoins < price) {
      setMessage('❌ シャチが足りません');
      return;
    }
    const nextInventory = { ...(state.inventory ?? {}) };
    nextInventory[id] = (nextInventory[id] ?? 0) + 1;
    setState({ ...state, shachiCoins: state.shachiCoins - price, inventory: nextInventory });
    setMessage('✅ 購入しました');
  };

  const close = () => onClose(state);

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
          <button onClick={close} className="text-2xl text-gray-600 hover:text-gray-800">←</button>
          <h2 className="text-xl font-bold text-gray-800">🛒 アイテム屋さん</h2>
          <div className="ml-auto flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <span className="text-xl">💰</span>
            <span className="font-bold text-yellow-800">{state.shachiCoins}</span>
          </div>
        </div>

        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg">{message}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shopItems.map((item) => {
            const owned = state.inventory?.[item.id] ?? 0;
            return (
              <div key={item.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{item.emoji ?? '🛍️'}</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-gray-800 font-bold">💰 {item.price}</div>
                  <div className="text-sm text-gray-600">所持: {owned}</div>
                </div>
                <button
                  onClick={() => buy(item.id, item.price)}
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-2 rounded-xl hover:from-blue-700 hover:to-blue-800"
                >
                  購入する
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;


