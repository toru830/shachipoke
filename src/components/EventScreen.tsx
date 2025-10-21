import React, { useState } from 'react';
import { GameState } from '../types/character';
import { dailyEvents, Event } from '../data/events';
import { addExp, addMoney, updateStat } from '../utils/gameLogic';
import { completeDailyEvent } from '../utils/storage';

interface EventScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const EventScreen: React.FC<EventScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [eventType, setEventType] = useState<'boss' | 'officeLady' | 'customer' | null>(null);

  const getRandomEventByType = (type: 'boss' | 'officeLady' | 'customer'): Event => {
    const events = dailyEvents[type];
    return events[Math.floor(Math.random() * events.length)];
  };

  const startEvent = (type: 'boss' | 'officeLady' | 'customer') => {
    const event = getRandomEventByType(type);
    setCurrentEvent(event);
    setEventType(type);
    setSelectedChoice(null);
    setShowResult(false);
  };

  const handleChoice = (choiceIndex: number) => {
    if (!currentEvent) return;

    setSelectedChoice(choiceIndex);
    setShowResult(true);
  };

  const confirmChoice = () => {
    if (!currentEvent || selectedChoice === null || !eventType) return;

    const choice = currentEvent.choices[selectedChoice];
    if (!choice) return;

    let newGameState = { ...gameState };

    // 経験値を追加
    if (choice.effects.exp) {
      newGameState.character = addExp(newGameState.character, choice.effects.exp);
    }

    // お金を追加/消費
    if (choice.effects.money) {
      if (choice.effects.money > 0) {
        newGameState = addMoney(newGameState, choice.effects.money);
      } else {
        newGameState.money = Math.max(0, newGameState.money + choice.effects.money);
      }
    }

    // 統計値を更新
    if (choice.effects.stats) {
      Object.entries(choice.effects.stats).forEach(([stat, value]) => {
        if (value !== undefined) {
          newGameState.character = updateStat(
            newGameState.character,
            stat as keyof typeof newGameState.character.stats,
            value
          );
        }
      });
    }

    // イベントを完了としてマーク
    newGameState = completeDailyEvent(newGameState, eventType);

    // ゲーム状態を更新
    onGameStateUpdate(newGameState);

    // イベントをリセット
    setCurrentEvent(null);
    setEventType(null);
  };


  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 text-center">今日の質疑応答</h1>
          
          <div className="space-y-4">
            {/* 上司からの呼び出し */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">😠</div>
                <h2 className="text-xl font-bold text-red-800 mb-2">上司から呼ばれた！</h2>
                <p className="text-red-600 text-sm">怖い上司から理不尽なことを言われます</p>
              </div>
              <button
                onClick={() => startEvent('boss')}
                disabled={gameState.dailyEvents.boss}
                className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                  gameState.dailyEvents.boss
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-105'
                }`}
              >
                {gameState.dailyEvents.boss ? '✅ 完了済み' : '開始する'}
              </button>
            </div>

            {/* お局様からの小言 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">👵</div>
                <h2 className="text-xl font-bold text-purple-800 mb-2">お局様からの小言だ！</h2>
                <p className="text-purple-600 text-sm">年配のお局様から面倒くさい小言を言われます</p>
              </div>
              <button
                onClick={() => startEvent('officeLady')}
                disabled={gameState.dailyEvents.officeLady}
                className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                  gameState.dailyEvents.officeLady
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105'
                }`}
              >
                {gameState.dailyEvents.officeLady ? '✅ 完了済み' : '開始する'}
              </button>
            </div>

            {/* お客からの電話 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">📞</div>
                <h2 className="text-xl font-bold text-orange-800 mb-2">お客からの電話だ！</h2>
                <p className="text-orange-600 text-sm">厳しいお客さんからネチネチと嫌味を言われます</p>
              </div>
              <button
                onClick={() => startEvent('customer')}
                disabled={gameState.dailyEvents.customer}
                className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                  gameState.dailyEvents.customer
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105'
                }`}
              >
                {gameState.dailyEvents.customer ? '✅ 完了済み' : '開始する'}
              </button>
            </div>
          </div>

          {/* 進捗表示 */}
          <div className="mt-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-3 text-center">今日の進捗</h3>
            <div className="flex justify-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                gameState.dailyEvents.boss ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {gameState.dailyEvents.boss ? '✓' : '1'}
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                gameState.dailyEvents.officeLady ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {gameState.dailyEvents.officeLady ? '✓' : '2'}
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                gameState.dailyEvents.customer ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {gameState.dailyEvents.customer ? '✓' : '3'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 text-center">イベント</h1>
        
        {/* 現在のイベント */}
        <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 border-2 border-pink-200 shadow-lg mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{currentEvent.title}</h2>
          <p className="text-gray-600 mb-6 text-lg">{currentEvent.description}</p>
          
          {!showResult ? (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-700 mb-3">どうしますか？</h3>
              {currentEvent.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(index)}
                  className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl border-2 border-blue-200 hover:border-purple-300 transition-all transform hover:scale-105"
                >
                  <span className="text-lg font-medium">{choice.text}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-3">選択した回答</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                  <p className="text-lg font-medium text-green-800">
                    {currentEvent.choices[selectedChoice!].text}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-3">獲得したシャチ</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl">💰</span>
                    <span className="text-2xl font-bold text-yellow-800">
                      +{currentEvent.choices[selectedChoice!].effects.money || 0} シャチ
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={confirmChoice}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
              >
                シャチをゲット！
              </button>
            </div>
          )}
        </div>

        {/* 戻るボタン */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentEvent(null)}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventScreen;
