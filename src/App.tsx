import { useState, useEffect, useRef } from 'react';
import { GameState } from './types/character';
import {
  loadGameState,
  saveGameState,
  createDefaultCharacter,
  createDefaultGameState,
  resetDailyEvents
} from './utils/storage';
import { getCharacterFromUrl, convertDiagnosisCharacterToCharacter } from './utils/urlParams';
import IntroVideo from './components/IntroVideo';
import Home from './components/Home';
import EventScreen from './components/EventScreen';
import ShopScreen from './components/ShopScreen';
import FormationScreen from './components/FormationScreen';
import SettingsScreen from './components/SettingsScreen';
import Welcome from './components/Welcome';
import BottomNavigation from './components/BottomNavigation';

type Screen = 'intro' | 'welcome' | 'home' | 'event' | 'shop' | 'formation' | 'settings';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initGame = () => {
      console.log('App.tsx - initGame started');
      // イントロ動画を見たかどうかを確認
      const hasSeenIntro = localStorage.getItem('shachipoke_intro_seen') === 'true';
      console.log('App.tsx - hasSeenIntro:', hasSeenIntro);
      
      // まずURLパラメータから社畜診断のキャラクター情報を取得試行
      const diagnosisChar = getCharacterFromUrl();
      console.log('App.tsx - diagnosisChar:', diagnosisChar);
      
      if (diagnosisChar.characterId && diagnosisChar.characterName) {
        console.log('App.tsx - processing diagnosis character');
        const character = convertDiagnosisCharacterToCharacter(diagnosisChar);
        console.log('App.tsx - converted character:', character);
        if (character) {
          console.log('App.tsx - character created successfully, setting game state');
          const createdState = createDefaultGameState(character);
          const savedState = saveGameState(createdState);
          setGameState(savedState);
          setLastSavedTime(savedState.lastSaved);
          setCurrentScreen(hasSeenIntro ? 'home' : 'intro');
          return;
        }
      }


      // URLにデータがない場合、既存のセーブデータを確認
      const savedState = loadGameState();
      if (savedState) {
        // 毎日のイベントをリセット
        const resetState = resetDailyEvents(savedState);
        const persistedState = saveGameState(resetState);
        setGameState(persistedState);
        setLastSavedTime(persistedState.lastSaved);
        setCurrentScreen('home');
      } else {
        // セーブデータもない場合、デフォルトキャラクターで開始
        const defaultCharacter = createDefaultCharacter();
        const newGameState = createDefaultGameState(defaultCharacter);
        const savedDefault = saveGameState(newGameState);
        setGameState(savedDefault);
        setLastSavedTime(savedDefault.lastSaved);
        setCurrentScreen(hasSeenIntro ? 'home' : 'intro');
      }
    };

    initGame();

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateGameState = (newGameState: GameState) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);
    const savedState = saveGameState({
      ...newGameState,
    });
    setGameState(savedState);
    setLastSavedTime(savedState.lastSaved);

    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false);
      saveTimeoutRef.current = null;
    }, 600);
  };

  const completeIntro = () => {
    localStorage.setItem('shachipoke_intro_seen', 'true');
    setCurrentScreen('welcome');
  };

  const startGame = () => {
    setCurrentScreen('home');
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {currentScreen === 'intro' && (
        <IntroVideo onComplete={completeIntro} />
      )}
      {currentScreen === 'welcome' && (
        <Welcome 
          character={gameState.character} 
          onStart={startGame} 
        />
      )}
      {currentScreen === 'home' && (
        <Home
          character={gameState.character}
          currency={gameState.currency}
        />
      )}
      {currentScreen === 'event' && (
        <EventScreen
          gameState={gameState}
          onGameStateUpdate={(newGameState) => {
            updateGameState(newGameState);
          }}
        />
      )}
      {currentScreen === 'shop' && (
        <ShopScreen
          gameState={gameState}
          onGameStateUpdate={(newGameState) => {
            updateGameState(newGameState);
          }}
        />
      )}
      {currentScreen === 'formation' && (
        <FormationScreen
          gameState={gameState}
          onGameStateUpdate={(newGameState) => {
            updateGameState(newGameState);
          }}
        />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen
          settings={gameState.settings}
          onSettingsUpdate={(newSettings) => {
            const newGameState = { ...gameState, settings: newSettings };
            updateGameState(newGameState);
          }}
        />
      )}

      {/* ボトムナビゲーション */}
      {currentScreen !== 'intro' && currentScreen !== 'welcome' && (
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
        />
      )}

      {currentScreen !== 'intro' && currentScreen !== 'welcome' && (
        <div className="fixed bottom-24 right-4 z-50">
          <div
            className={`rounded-full px-4 py-2 text-sm shadow-lg transition-colors ${
              isSaving ? 'bg-blue-500 text-white' : 'bg-white/90 text-gray-700'
            }`}
          >
            {isSaving
              ? '💾 保存中...'
              : lastSavedTime
              ? `💾 保存済み ${new Date(lastSavedTime).toLocaleTimeString()}`
              : '💾 保存準備完了'}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
