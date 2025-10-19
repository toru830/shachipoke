import { GameState } from '../types/character';
import { getTodayDateString } from '../utils/gameLogic';
import CharacterAvatar from './CharacterAvatar';

interface HomeProps {
  gameState: GameState;
  onStartEvent: (type: 'boss' | 'office' | 'arrival') => void;
  onOpenUpgrade: () => void;
  onOpenShop: () => void;
}

const Home = ({ gameState, onStartEvent, onOpenUpgrade, onOpenShop }: HomeProps) => {
  const { character, shachiCoins, todayEvents, lastPlayDate } = gameState;
  
  if (!character) return null;

  const today = getTodayDateString();
  const isNewDay = lastPlayDate !== today;

  const canPlayBoss = isNewDay || !todayEvents.bossQA;
  const canPlayOffice = isNewDay || !todayEvents.officeHarassment;
  const canPlayArrival = isNewDay || !todayEvents.earlyArrival;

  const expPercentage = (character.exp / character.expToNextLevel) * 100;

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              🏢 シャチポケ
            </h1>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-yellow-800">{shachiCoins}</span>
              <span className="text-sm text-yellow-700">シャチ</span>
            </div>
          </div>

          {/* キャラクター表示 */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 relative overflow-hidden">
            {/* 背景で動くキャラクターたち */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-2 left-4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                <img src="./characters/001.png" alt="キャラクター1" className="w-8 h-8 opacity-30" />
              </div>
              <div className="absolute top-4 right-8 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                <img src="./characters/002.png" alt="キャラクター2" className="w-6 h-6 opacity-25" />
              </div>
              <div className="absolute bottom-4 left-8 animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                <img src="./characters/003.png" alt="キャラクター3" className="w-7 h-7 opacity-20" />
              </div>
              <div className="absolute top-6 right-4 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}>
                <img src="./characters/004.png" alt="キャラクター4" className="w-5 h-5 opacity-30" />
              </div>
              <div className="absolute bottom-2 right-12 animate-pulse" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
                <img src="./characters/005.png" alt="キャラクター5" className="w-6 h-6 opacity-25" />
              </div>
              <div className="absolute top-8 left-12 animate-ping" style={{ animationDelay: '2.5s', animationDuration: '4.5s' }}>
                <img src="./characters/006.png" alt="キャラクター6" className="w-5 h-5 opacity-20" />
              </div>
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              <CharacterAvatar 
                character={character} 
                size="medium" 
                className="flex-shrink-0 animate-pulse"
                style={{ animationDuration: '2s' }}
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {character.name}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                    {character.type}
                  </span>
                  <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                    Lv.{character.level}
                  </span>
                </div>
                {/* 経験値バー */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500"
                    style={{ width: `${expPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  EXP: {character.exp} / {character.expToNextLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ステータス */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📊 ステータス</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatBar label="ストレス耐性" value={character.stats.stress} emoji="💪" color="red" />
            <StatBar label="コミュ力" value={character.stats.communication} emoji="💬" color="blue" />
            <StatBar label="体力" value={character.stats.endurance} emoji="⚡" color="green" />
            <StatBar label="運" value={character.stats.luck} emoji="🍀" color="yellow" />
          </div>
          <button
            onClick={onOpenUpgrade}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 active:scale-95"
          >
            ✨ 強化する
          </button>
          <button
            onClick={onOpenShop}
            className="w-full mt-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:scale-105 active:scale-95"
          >
            🛒 アイテム屋さん
          </button>
        </div>

        {/* 今日のイベント */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📅 今日のチャレンジ</h3>
          <div className="space-y-3">
            <EventCard
              title="上司との問答"
              emoji="😠"
              description="怖い上司との会話イベント"
              canPlay={canPlayBoss}
              onClick={() => onStartEvent('boss')}
            />
            <EventCard
              title="お局様の嫌がらせ"
              emoji="👵"
              description="お局様からの試練"
              canPlay={canPlayOffice}
              onClick={() => onStartEvent('office')}
            />
            <EventCard
              title="出社チェック"
              emoji="⏰"
              description="今日の出社・勤務状況"
              canPlay={canPlayArrival}
              onClick={() => onStartEvent('arrival')}
            />
          </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 実績</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">{gameState.totalEvents}</div>
              <div className="text-sm text-gray-600">総イベント数</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">{gameState.successCount}</div>
              <div className="text-sm text-gray-600">成功数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatBarProps {
  label: string;
  value: number;
  emoji: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
}

const StatBar = ({ label, value, emoji, color }: StatBarProps) => {
  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">
          {emoji} {label}
        </span>
        <span className="text-sm font-bold text-gray-800">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`${colorClasses[color]} h-full transition-all duration-500`}
          style={{ width: `${Math.min(value, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

interface EventCardProps {
  title: string;
  emoji: string;
  description: string;
  canPlay: boolean;
  onClick: () => void;
}

const EventCard = ({ title, emoji, description, canPlay, onClick }: EventCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!canPlay}
      className={`w-full p-4 rounded-xl text-left transition-all transform ${
        canPlay
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 active:scale-95 shadow-md'
          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{emoji}</span>
        <div className="flex-1">
          <div className="font-bold text-lg">{title}</div>
          <div className="text-sm opacity-90">
            {canPlay ? description : '✅ 本日クリア済み'}
          </div>
        </div>
        {canPlay && <span className="text-2xl">▶</span>}
      </div>
    </button>
  );
};

export default Home;

