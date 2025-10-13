import React, { useState } from 'react';
import { GameState, Character } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface FormationScreenProps {
  gameState: GameState;
  onClose: (updated: GameState) => void;
}

const FormationScreen: React.FC<FormationScreenProps> = ({ gameState, onClose }) => {
  const [state, setState] = useState<GameState>(gameState);

  const addNewCharacter = () => {
    const newCharacter: Character = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: `社畜${state.characters.length + 1}号`,
      type: '新入社員',
      level: 1,
      exp: 0,
      expToNextLevel: 100,
      stats: {
        stress: Math.floor(Math.random() * 20) + 10,
        communication: Math.floor(Math.random() * 20) + 10,
        endurance: Math.floor(Math.random() * 20) + 10,
        luck: Math.floor(Math.random() * 20) + 10,
      },
      appearance: {
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
        style: 'business',
        emoji: '🧑‍💼',
      },
      createdAt: new Date().toISOString(),
    };

    const newCharacters = [...state.characters, newCharacter];
    setState({
      ...state,
      characters: newCharacters,
      character: state.character || newCharacter,
      activeCharacterId: state.activeCharacterId || newCharacter.id,
    });
  };

  const selectCharacter = (character: Character) => {
    setState({
      ...state,
      character,
      activeCharacterId: character.id,
    });
  };

  const removeCharacter = (characterId: string) => {
    if (state.characters.length <= 1) return; // 最低1体は残す
    
    const newCharacters = state.characters.filter(c => c.id !== characterId);
    const newActiveCharacter = newCharacters[0];
    
    setState({
      ...state,
      characters: newCharacters,
      character: newActiveCharacter,
      activeCharacterId: newActiveCharacter.id,
    });
  };

  const close = () => onClose(state);

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
          <button onClick={close} className="text-2xl text-gray-600 hover:text-gray-800">←</button>
          <h2 className="text-xl font-bold text-gray-800">👥 編成</h2>
          <div className="ml-auto flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <span className="text-xl">💰</span>
            <span className="font-bold text-yellow-800">{state.shachiCoins}</span>
          </div>
        </div>

        {/* 現在のメインキャラクター */}
        {state.character && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">🌟 メインキャラクター</h3>
            <div className="flex items-center gap-4">
              <CharacterAvatar 
                character={state.character} 
                size="medium" 
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800">{state.character.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                    {state.character.type}
                  </span>
                  <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                    Lv.{state.character.level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* キャラクター一覧 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">社畜仲間たち</h3>
            <button
              onClick={addNewCharacter}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
            >
              + 新規追加
            </button>
          </div>
          
          <div className="space-y-3">
            {state.characters.map((character) => (
              <div
                key={character.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  state.activeCharacterId === character.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <CharacterAvatar 
                    character={character} 
                    size="small" 
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate">{character.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {character.type}
                      </span>
                      <span className="text-sm bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-bold">
                        Lv.{character.level}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      💪{character.stats.stress} 💬{character.stats.communication} ⚡{character.stats.endurance} 🍀{character.stats.luck}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {state.activeCharacterId !== character.id && (
                      <button
                        onClick={() => selectCharacter(character)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-all"
                      >
                        選択
                      </button>
                    )}
                    {state.characters.length > 1 && (
                      <button
                        onClick={() => removeCharacter(character.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-all"
                      >
                        削除
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationScreen;
