import { Character } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface HomeProps {
  character: Character;
  money: number;
}

const Home = ({ character, money }: HomeProps) => {
  const expPercent = Math.min(100, Math.max(0, (character.exp / character.expToNextLevel) * 100));
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">シャチポケ</h1>
          <p className="text-gray-600">社畜育成ゲーム</p>
        </div>

        {/* 中央に大きなキャラクター */}
        <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 border-2 border-pink-200 shadow-lg">
          <div className="flex justify-center mb-4">
            <CharacterAvatar 
              character={character} 
              size="large"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{character.name}</h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">{character.type}</span>
              <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Lv.{character.level}</span>
            </div>
            {/* EXP */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-40 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300"
                  style={{ width: `${expPercent}%` }}
                />
              </div>
              <span className="font-medium">EXP: {character.exp}/{character.expToNextLevel}</span>
            </div>
          </div>
        </div>

        {/* お金の表示 */}
        <div className="mt-4 text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-md">
            <span className="text-xl">💰</span>
            <span className="font-bold text-lg">${money} シャチ</span>
          </div>
        </div>

        {/* ステータス（下部） */}
        <div className="mt-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center gap-2 justify-center">
            <span className="text-2xl">📊</span>
            ステータス
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-xl">
              <span className="text-3xl">😤</span>
              <div>
                <div className="text-sm text-gray-600 font-medium">ストレス耐性</div>
                <div className="font-bold text-lg text-red-600">{character.stats.stress}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl">
              <span className="text-3xl">💬</span>
              <div>
                <div className="text-sm text-gray-600 font-medium">コミュ力</div>
                <div className="font-bold text-lg text-blue-600">{character.stats.communication}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl">
              <span className="text-3xl">💪</span>
              <div>
                <div className="text-sm text-gray-600 font-medium">持久力</div>
                <div className="font-bold text-lg text-green-600">{character.stats.endurance}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-xl">
              <span className="text-3xl">🍀</span>
              <div>
                <div className="text-sm text-gray-600 font-medium">運</div>
                <div className="font-bold text-lg text-yellow-600">{character.stats.luck}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 実績セクション */}
        <div className="mt-6 bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4 flex items-center gap-2 justify-center">
            <span className="text-2xl">🏆</span>
            実績
          </h3>
          <div className="text-center text-gray-600">
            <p className="text-lg mb-2">まだ実績はありません</p>
            <p className="text-sm">イベントをクリアして実績を獲得しましょう！</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
