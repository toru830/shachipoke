import { useState } from 'react';
import { GameState, Event, EventOption } from '../types/character';
import { getRandomEventByType } from '../data/events';
import { gainExp, getTodayDateString } from '../utils/gameLogic';

interface EventScreenProps {
  gameState: GameState;
  eventType: 'boss' | 'office' | 'arrival';
  onComplete: (updatedState: GameState) => void;
  onCancel: () => void;
}

type Stage = 'event' | 'result';

const EventScreen = ({ gameState, eventType, onComplete, onCancel }: EventScreenProps) => {
  const [event] = useState<Event>(() => getRandomEventByType(eventType));
  const [stage, setStage] = useState<Stage>('event');
  const [selectedOption, setSelectedOption] = useState<EventOption | null>(null);

  const handleSelectOption = (option: EventOption) => {
    setSelectedOption(option);
    setStage('result');
  };

  const handleComplete = () => {
    if (!selectedOption) return;

    const newState = { ...gameState };
    
    // コイン追加
    newState.shachiCoins += selectedOption.reward;
    
    // 経験値追加とレベルアップ処理
    if (newState.character) {
      newState.character = gainExp(newState.character, selectedOption.expGain);
    }
    
    // イベント完了フラグ
    const today = getTodayDateString();
    newState.lastPlayDate = today;
    
    if (eventType === 'boss') {
      newState.todayEvents.bossQA = true;
    } else if (eventType === 'office') {
      newState.todayEvents.officeHarassment = true;
    } else if (eventType === 'arrival') {
      newState.todayEvents.earlyArrival = true;
    }
    
    // 統計更新
    newState.totalEvents += 1;
    if (selectedOption.result === 'success') {
      newState.successCount += 1;
    }
    
    onComplete(newState);
  };

  const getEventTypeEmoji = () => {
    switch (eventType) {
      case 'boss':
        return '😠';
      case 'office':
        return '👵';
      case 'arrival':
        return '⏰';
    }
  };

  const getEventTypeName = () => {
    switch (eventType) {
      case 'boss':
        return '上司との問答';
      case 'office':
        return 'お局様の嫌がらせ';
      case 'arrival':
        return '出社チェック';
    }
  };

  const getResultColor = () => {
    if (!selectedOption) return 'blue';
    switch (selectedOption.result) {
      case 'success':
        return 'green';
      case 'partial':
        return 'yellow';
      case 'fail':
        return 'red';
    }
  };

  const getResultEmoji = () => {
    if (!selectedOption) return '🤔';
    switch (selectedOption.result) {
      case 'success':
        return '🎉';
      case 'partial':
        return '😅';
      case 'fail':
        return '😭';
    }
  };

  const getResultText = () => {
    if (!selectedOption) return '';
    switch (selectedOption.result) {
      case 'success':
        return '大成功！';
      case 'partial':
        return 'まずまず';
      case 'fail':
        return '失敗...';
    }
  };

  if (stage === 'event') {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-4">
          {/* ヘッダー */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{getEventTypeEmoji()}</span>
                <h2 className="text-xl font-bold text-gray-800">
                  {getEventTypeName()}
                </h2>
              </div>
            </div>
          </div>

          {/* イベント内容 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {event.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* 選択肢 */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                あなたの選択は？
              </p>
              {event.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl text-left transition-all transform hover:scale-105 active:scale-95 border-2 border-blue-200 hover:border-blue-400"
                >
                  <p className="font-semibold text-gray-800">
                    {option.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 結果表示
  const resultColor = getResultColor();
  const bgColorClass = {
    green: 'from-green-500 to-emerald-600',
    yellow: 'from-yellow-500 to-orange-500',
    red: 'from-red-500 to-pink-600',
    blue: 'from-blue-500 to-purple-600',
  }[resultColor];

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-4">
        {/* 結果カード */}
        <div className={`bg-gradient-to-br ${bgColorClass} rounded-2xl shadow-2xl p-8 text-white text-center`}>
          <div className="text-8xl mb-4">
            {getResultEmoji()}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {getResultText()}
          </h2>
          <p className="text-xl mb-6 opacity-90">
            {selectedOption?.feedback}
          </p>

          {/* 報酬表示 */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">💰</span>
              <span className="text-2xl font-bold">+{selectedOption?.reward} シャチ</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">⭐</span>
              <span className="text-2xl font-bold">+{selectedOption?.expGain} EXP</span>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="w-full bg-white text-gray-800 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            次へ進む
          </button>
        </div>

        {/* あなたの選択 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            📝 あなたの選択
          </h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
            {selectedOption?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventScreen;

