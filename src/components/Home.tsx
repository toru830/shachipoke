import { Character } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface HomeProps {
  character: Character;
  money: number;
}

const Home = ({ character, money }: HomeProps) => {
  const expPercent = Math.min(100, Math.max(0, (character.exp / character.expToNextLevel) * 100));
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">シャチポケ</h1>
          <p className="text-gray-600">社畜育成ゲーム</p>
        </div>

        {/* 中央に大きなキャラクター */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-center mb-4">
            <CharacterAvatar 
              character={character} 
              size="large"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-1">{character.name}</h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{character.type}</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Lv.{character.level}</span>
            </div>
            {/* EXP */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${expPercent}%` }}
                />
              </div>
              <span>EXP: {character.exp}/{character.expToNextLevel}</span>
            </div>
          </div>
        </div>

        {/* お金の表示 */}
        <div className="mt-4 text-center">
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-flex items-center gap-2">
            <span className="text-lg">💰</span>
            <span className="font-bold">${money} シャチ</span>
          </div>
        </div>

        {/* ステータス（下部） */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 justify-center">
            <span>📊</span>
            ステータス
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">😤</span>
              <div>
                <div className="text-sm text-gray-600">ストレス耐性</div>
                <div className="font-bold">{character.stats.stress}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <div>
                <div className="text-sm text-gray-600">コミュ力</div>
                <div className="font-bold">{character.stats.communication}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💪</span>
              <div>
                <div className="text-sm text-gray-600">持久力</div>
                <div className="font-bold">{character.stats.endurance}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍀</span>
              <div>
                <div className="text-sm text-gray-600">運</div>
                <div className="font-bold">{character.stats.luck}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
