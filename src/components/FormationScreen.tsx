import React, { useState } from 'react';
import { GameState } from '../types/character';
import CharacterAvatar from './CharacterAvatar';

interface FormationScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const FormationScreen: React.FC<FormationScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const [formationSlots, setFormationSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [activeSlot, setActiveSlot] = useState<number | null>(0);

  const ownedCharacters = [gameState.character];

  const selectSlot = (index: number) => {
    setActiveSlot(index);
  };

  const assignCharacterToSlot = (characterId: string) => {
    if (activeSlot === null) return;

    setFormationSlots(prev => {
      const updated = [...prev];
      // 既に他のスロットに配置されている場合は削除
      const existingIndex = updated.findIndex(id => id === characterId);
      if (existingIndex !== -1) {
        updated[existingIndex] = null;
      }
      updated[activeSlot] = characterId;
      return updated;
    });
  };

  const removeSlot = (index: number) => {
    setFormationSlots(prev => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const applyFormation = () => {
    const selectedIds = formationSlots.filter(id => id !== null) as string[];
    if (selectedIds.length === 0) return;

    const updatedGameState = {
      ...gameState,
      formation: selectedIds,
    };

    onGameStateUpdate(updatedGameState);
  };

  const getCharacterInSlot = (slot: string | null) => {
    if (!slot) return null;
    return ownedCharacters.find((char: any) => char.id === slot);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 pb-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          編成
        </h1>

        {/* 連隊編成 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">連隊編成</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {formationSlots.map((slot, index) => {
              const character = getCharacterInSlot(slot);
              const isActive = activeSlot === index;
              
              return (
                <div
                  key={index}
                  onClick={() => selectSlot(index)}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-4 text-center transition-all cursor-pointer min-w-[200px] ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    連隊{index + 1}
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center">
                    {character ? (
                      <CharacterAvatar character={character} size="medium" />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-2xl text-gray-300">
                        +
                      </div>
                    )}
                  </div>
                  {character ? (
                    <>
                      <div>
                        <div className="text-sm font-bold text-gray-800">{character.name}</div>
                        <div className="text-xs text-gray-500">Lv.{character.level}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSlot(index);
                        }}
                        className="text-xs font-semibold text-blue-600 underline-offset-2 transition hover:underline"
                      >
                        枠を空にする
                      </button>
                    </>
                  ) : (
                    <p className="text-xs text-gray-500">メンバー未設定</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 保有キャラクター */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">保有キャラクター</h2>
          <div className="grid grid-cols-2 gap-4">
            {ownedCharacters.map((character: any) => {
              const inFormation = formationSlots.includes(character.id);
              return (
                <div
                  key={character.id}
                  className={`flex flex-col gap-3 rounded-2xl border p-4 transition ${
                    inFormation ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CharacterAvatar character={character} size="small" />
                    <div>
                      <div className="text-sm font-bold text-gray-800">{character.name}</div>
                      <div className="text-xs text-gray-500">Lv.{character.level}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      ☹️ {character.stats.stress}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      💬 {character.stats.communication}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      💪 {character.stats.endurance}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      🍀 {character.stats.luck}
                    </span>
                  </div>
                  <button
                    onClick={() => assignCharacterToSlot(character.id)}
                    disabled={activeSlot === null}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeSlot === null
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    {inFormation ? '配置し直す' : '連隊に編成'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 適用ボタン */}
        <div className="flex justify-end">
          <button
            onClick={applyFormation}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            編成を保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationScreen;