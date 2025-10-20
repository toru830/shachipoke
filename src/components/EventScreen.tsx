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
  const [eventHistory, setEventHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!currentEvent) {
      const newEvent = getRandomEvent();
      setCurrentEvent(newEvent);
    }
  }, [currentEvent]);

  const handleChoice = (choiceIndex: number) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices[choiceIndex];
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">イベント</h1>
        
        {/* 現在のイベント */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{currentEvent.title}</h2>
          <p className="text-gray-600 mb-4">{currentEvent.description}</p>
          
          <div className="space-y-2">
            {currentEvent.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>

        {/* イベント履歴 */}
        {eventHistory.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">イベント履歴</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {eventHistory.slice(-5).map((event, index) => (
                <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
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
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            新しいイベント
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventScreen;
