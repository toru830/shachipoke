import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { GameState, Character } from '../types/character';
import CharacterAvatar from './CharacterAvatar';
import {
  characterCatalog,
  CharacterTemplate,
  createCharacterFromTemplate,
} from '../data/characterCatalog';
import { spendMoney } from '../utils/gameLogic';

interface FormationScreenProps {
  gameState: GameState;
  onGameStateUpdate: (newGameState: GameState) => void;
}

const MAX_FORMATION_SIZE = 4;

const formatType = (type: string): string => {
  return type === '診断結果' ? '' : type;
};

const FormationScreen: React.FC<FormationScreenProps> = ({ gameState, onGameStateUpdate }) => {
  const getInitialSlots = () => {
    const base = Array.from({ length: MAX_FORMATION_SIZE }, (_, index) => gameState.formation?.[index] ?? null);
    return base as (string | null)[];
  };

  const [formationSlots, setFormationSlots] = useState<(string | null)[]>(getInitialSlots);
  const [activeSlot, setActiveSlot] = useState<number | null>(() => {
    const slots = getInitialSlots();
    const firstEmpty = slots.findIndex((slot) => slot === null);
    return firstEmpty >= 0 ? firstEmpty : 0;
  });
  const [message, setMessage] = useState<string>('');
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const slots = getInitialSlots();
    setFormationSlots(slots);
    const firstEmpty = slots.findIndex((slot) => slot === null);
    setActiveSlot(firstEmpty >= 0 ? firstEmpty : 0);
  }, [gameState.formation]);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const showMessage = (text: string) => {
    setMessage(text);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => setMessage(''), 3000);
  };

  const ownedCharacters = useMemo(() => {
    const owned = Array.isArray(gameState.ownedCharacters) && gameState.ownedCharacters.length > 0
      ? gameState.ownedCharacters
      : [gameState.character];
    const seen = new Set<string>();
    return owned.filter((character) => {
      if (seen.has(character.id)) {
        return false;
      }
      seen.add(character.id);
      return true;
    });
  }, [gameState.character, gameState.ownedCharacters]);

  const ownedCharacterMap = useMemo(() => {
    const map = new Map<string, Character>();
    ownedCharacters.forEach((character) => {
      map.set(character.id, character);
    });
    return map;
  }, [ownedCharacters]);

  const purchasableTemplates = useMemo(
    () => characterCatalog.filter((template) => !ownedCharacterMap.has(template.id)),
    [ownedCharacterMap]
  );

  const selectSlot = (index: number) => {
    setActiveSlot(index);
  };

  const handleSlotKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectSlot(index);
    }
  };

  const assignCharacterToSlot = (characterId: string) => {
    if (activeSlot === null) {
      showMessage('編成する枠を先に選択してください。');
      return;
    }

    const character = ownedCharacterMap.get(characterId);
    if (!character) {
      showMessage('編成できるキャラクターが見つかりませんでした。');
      return;
    }

    setFormationSlots((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex((id) => id === characterId);
      if (existingIndex !== -1) {
        updated[existingIndex] = null;
      }
      updated[activeSlot] = characterId;
      return updated;
    });

    showMessage(`${character.name}を連隊に配置しました。`);
  };

  const removeSlot = (index: number) => {
    setFormationSlots((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    showMessage(`連隊${index + 1}の枠を空にしました。`);
  };

  const handlePurchase = (template: CharacterTemplate) => {
    if (gameState.money < template.price) {
      showMessage('お金が足りません！');
      return;
    }

    const spentState = spendMoney(gameState, template.price);
    if (!spentState) {
      showMessage('お金が足りません！');
      return;
    }

    const newCharacter = createCharacterFromTemplate(template);
    const updatedOwned = [...ownedCharacters, newCharacter];

    onGameStateUpdate({
      ...spentState,
      ownedCharacters: updatedOwned,
    });

    setFormationSlots((prev) => {
      if (activeSlot !== null && !prev[activeSlot]) {
        const next = [...prev];
        next[activeSlot] = newCharacter.id;
        return next;
      }
      return prev;
    });

    showMessage(`${template.name}を購入しました！`);
  };

  const handleSaveFormation = () => {
    const selectedIds = formationSlots.filter((slot): slot is string => Boolean(slot));

    if (selectedIds.length === 0) {
      showMessage('少なくとも1人は編成してください。');
      return;
    }

    const leader = ownedCharacterMap.get(selectedIds[0]) ?? gameState.character;

    const updatedGameState: GameState = {
      ...gameState,
      ownedCharacters,
      formation: selectedIds,
      character: leader,
    };

    onGameStateUpdate(updatedGameState);
    showMessage('編成を保存しました！');
  };

  const getCharacterInSlot = (slot: string | null) => {
    if (!slot) {
      return undefined;
    }
    return ownedCharacterMap.get(slot);
  };

  const renderStatBadge = (label: string, value: number) => (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
      <span className="font-semibold text-gray-700">{value}</span>
      <span>{label}</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-32">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-800">編成</h1>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow">
            <span>💰</span>
            <span>{gameState.money}</span>
          </div>
        </div>

        {message && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 shadow-sm">
            {message}
          </div>
        )}

        <section className="rounded-3xl border border-blue-100 bg-white/80 p-6 shadow">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-800">連隊編成</h2>
            <p className="text-sm text-gray-500">最大4人まで配置できます。枠を選んでからメンバーを選択してください。</p>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
{formationSlots.map((slot, index) => {
  const character = getCharacterInSlot(slot);
  const isActive = activeSlot === index;
  return (
    <div
      key={index}
      role="button"
      tabIndex={0}
      onClick={() => selectSlot(index)}
                  onKeyDown={(event) => handleSlotKeyDown(event, index)}
                  className={`group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 p-4 text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 min-w-[200px] ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">連隊{index + 1}</div>
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
                      <div className="flex flex-wrap justify-center gap-1 text-[10px] text-gray-500">
                        {renderStatBadge('ストレス', character.stats.stress)}
                        {renderStatBadge('コミュ力', character.stats.communication)}
                        {renderStatBadge('持久力', character.stats.endurance)}
                        {renderStatBadge('運', character.stats.luck)}
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
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
        </section>

        <section className="rounded-3xl border border-purple-100 bg-white/80 p-6 shadow">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-800">保有キャラクター</h2>
            <p className="text-xs text-gray-500">編成したい枠を選んでからメンバーを追加しましょう。</p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {ownedCharacters.map((character) => {
              const inFormation = formationSlots.includes(character.id);
              return (
                <div key={character.id} className={`flex flex-col gap-3 rounded-2xl border p-4 transition ${inFormation ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow'}`}>
                  <div className="flex items-center gap-3">
                    <CharacterAvatar character={character} size="small" />
                    <div>
                      <div className="text-sm font-bold text-gray-800">{character.name}</div>
                      {formatType(character.type) && (
                        <div className="text-xs text-gray-500">{formatType(character.type)}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                    {renderStatBadge('ストレス', character.stats.stress)}
                    {renderStatBadge('コミュ力', character.stats.communication)}
                    {renderStatBadge('持久力', character.stats.endurance)}
                    {renderStatBadge('運', character.stats.luck)}
                  </div>
                  <button
                    type="button"
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
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-800">キャラクター購入</h2>
            <p className="text-xs text-gray-500">全16体の仲間から気になるキャラクターを迎え入れましょう。</p>
          </div>
          {purchasableTemplates.length === 0 ? (
            <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              すべてのキャラクターを仲間にしました！
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {purchasableTemplates.map((template) => {
                const previewCharacter: Character = {
                  id: template.id,
                  name: template.name,
                  type: template.type,
                  level: 1,
                  exp: 0,
                  expToNextLevel: 100,
                  stats: template.stats,
                  appearance: template.appearance,
                  createdAt: template.id,
                };

                return (
                  <div key={template.id} className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <CharacterAvatar character={previewCharacter} size="small" />
                      <div>
                        <div className="text-sm font-bold text-gray-800">{template.name}</div>
                        {formatType(template.type) && (
                          <div className="text-xs text-gray-500">{formatType(template.type)}</div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{template.description}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                      {renderStatBadge('ストレス', template.stats.stress)}
                      {renderStatBadge('コミュ力', template.stats.communication)}
                      {renderStatBadge('持久力', template.stats.endurance)}
                      {renderStatBadge('運', template.stats.luck)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-emerald-600">💰 {template.price}</div>
                      <button
                        type="button"
                        onClick={() => handlePurchase(template)}
                        disabled={gameState.money < template.price}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          gameState.money >= template.price
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        購入
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveFormation}
            className="rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-600"
          >
            編成を保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationScreen;
