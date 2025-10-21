import React, { useState, useEffect } from 'react';
import { GameState } from '../types/character';
import { getRandomEvent, Event } from '../data/events';
import { addExp, addMoney, updateStat } from '../utils/gameLogic';

interface EventScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const EventScreen: React.FC<EventScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [eventHistory, setEventHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!currentEvent) {
      const newEvent = getRandomEvent();
      setCurrentEvent(newEvent);
      setSelectedChoice(null);
      setShowResult(false);
    }
  }, [currentEvent]);

  const handleChoice = (choiceIndex: number) => {
    if (!currentEvent) return;

    setSelectedChoice(choiceIndex);
    setShowResult(true);
  };

  const confirmChoice = () => {
    if (!currentEvent || selectedChoice === null) return;

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

    // イベント履歴に追加
    const eventText = `${currentEvent.title}: ${choice.text}`;
    setEventHistory(prev => [...prev, eventText]);

    // ゲーム状態を更新
    onGameStateUpdate(newGameState);

    // 新しいイベントを生成
    setCurrentEvent(null);
  };

  const triggerNewEvent = () => {
    setCurrentEvent(null);
  };

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">イベント</h1>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">新しいイベントを生成中...</p>
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

        {/* イベント履歴 */}
        {eventHistory.length > 0 && (
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📝</span>
              イベント履歴
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {eventHistory.slice(-5).map((event, index) => (
                <div key={index} className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                  {event}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 新しいイベントボタン */}
        <div className="mt-4 text-center">
          <button
            onClick={triggerNewEvent}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            新しいイベント
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventScreen;
