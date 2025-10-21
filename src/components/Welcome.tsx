import React from 'react';
import CharacterAvatar from './CharacterAvatar';
import { Character } from '../types/character';

interface WelcomeProps {
  character: Character;
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ character, onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">シャチポケへようこそ！</h1>
          
          <div className="mb-6">
            <CharacterAvatar character={character} size="large" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-4">{character.name}</h2>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">あなたの統計値</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>ストレス耐性:</span>
                <span className="font-bold">{character.stats.stress}</span>
              </div>
              <div className="flex justify-between">
                <span>コミュニケーション:</span>
                <span className="font-bold">{character.stats.communication}</span>
              </div>
              <div className="flex justify-between">
                <span>持久力:</span>
                <span className="font-bold">{character.stats.endurance}</span>
              </div>
              <div className="flex justify-between">
                <span>運:</span>
                <span className="font-bold">{character.stats.luck}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            社畜としての日々を生き抜き、レベルアップを目指しましょう！
          </p>
          
          <button
            onClick={onStart}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
          >
            ゲームを開始
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
