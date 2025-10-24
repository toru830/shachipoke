import { Character } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface HomeProps {
  character: Character;
  money: number;
}

const Home = ({ character, money }: HomeProps) => {
  const expPercent = Math.min(100, Math.max(0, (character.exp / character.expToNextLevel) * 100));
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 pb-32 overflow-y-auto">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">シャチポケ</h1>
          <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full shadow-sm text-[11px] font-semibold">
            <span className="text-base">💰</span>
            <span className="text-sm">{money}</span>
            <span className="text-[10px] text-gray-500">シャチ</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 border-2 border-pink-200 shadow-lg">
          <div className="flex justify-center mb-6">
            <CharacterAvatar
              character={character}
              size="large"
              className="drop-shadow-xl"
            />
          </div>
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{character.name}</h2>
              <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">
                <span>Lv.{character.level}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                <span>Experience</span>
                <span>{character.exp}/{character.expToNextLevel}</span>
              </div>
              <div className="mt-2 h-3 bg-gray-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300"
                  style={{ width: `${expPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
          <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            ステータス
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[{
              label: '耐ストレス',
              value: character.stats.stress,
              icon: '☹️',
              color: 'text-rose-600',
              background: 'from-rose-50 to-orange-50'
            }, {
              label: 'コミュニケーション',
              value: character.stats.communication,
              icon: '💬',
              color: 'text-blue-600',
              background: 'from-blue-50 to-cyan-50'
            }, {
              label: '持久力',
              value: character.stats.endurance,
              icon: '💪',
              color: 'text-emerald-600',
              background: 'from-emerald-50 to-green-50'
            }, {
              label: '運',
              value: character.stats.luck,
              icon: '🍀',
              color: 'text-amber-600',
              background: 'from-amber-50 to-yellow-50'
            }].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl p-4 bg-gradient-to-br ${stat.background} border border-white/60 shadow-inner`}
              >
                <div className="text-xs font-semibold text-gray-500 tracking-widest">
                  {stat.label}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
          <h3 className="text-lg font-bold text-yellow-700 mb-3 flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            実績
          </h3>
          <div className="text-center text-gray-600 space-y-2">
            <p className="text-base">まだ実績はありません</p>
            <p className="text-sm">イベントをクリアして実績を獲得しましょう！</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
