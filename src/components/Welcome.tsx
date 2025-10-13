import { Character } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface WelcomeProps {
  character: Character;
  onStart: () => void;
}

const Welcome = ({ character, onStart }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          🏢 シャチポケ 🏢
        </h1>
        
        <div className="text-lg text-gray-700">
          社畜育成ゲームへようこそ！
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <CharacterAvatar 
            character={character} 
            size="large" 
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {character.name}
          </h2>
          <div className="inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
            {character.type}
          </div>
        </div>

        <div className="text-left bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <p className="font-semibold text-gray-800">📌 ゲームの遊び方</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>上司との問答や職場イベントに挑戦</li>
            <li>正解を選ぶとシャチコインをGET！</li>
            <li>コインでキャラクターを強化</li>
            <li>毎日プレイして育成しよう！</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          ゲームスタート！
        </button>
      </div>
    </div>
  );
};

export default Welcome;

