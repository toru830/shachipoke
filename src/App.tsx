import { useState, useEffect } from 'react';
import { GameState } from './types/character';
import {
  loadGameState,
  saveGameState,
  createDefaultCharacter,
  createDefaultGameState,
  normalizeGameState,
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
          const newGameState: GameState = normalizeGameState({
            character: character,
            ownedCharacters: [character],
            formation: [character.id],
            money: 50,
            lastPlayDate: new Date().toISOString(),
            events: [],
            achievements: [],
            settings: {
              soundEnabled: true,
              musicEnabled: true,
              notificationsEnabled: true,
              autoSave: true,
            },
            dailyEvents: {
              boss: false,
              officeLady: false,
              customer: false,
            },
          });
          setGameState(newGameState);
          saveGameState(newGameState);
          setCurrentScreen(hasSeenIntro ? 'home' : 'intro');
          return;
        }
      }


      // URLにデータがない場合、既存のセーブデータを確認
      const savedState = loadGameState();
      if (savedState) {
        // 毎日のイベントをリセット
        const resetState = normalizeGameState(resetDailyEvents(savedState));
        setGameState(resetState);
        saveGameState(resetState);
        setCurrentScreen('home');
      } else {
        // セーブデータもない場合、デフォルトキャラクターで開始
        const defaultCharacter = createDefaultCharacter();
        const newGameState = createDefaultGameState(defaultCharacter);
        setGameState(newGameState);
        saveGameState(newGameState);
        setCurrentScreen(hasSeenIntro ? 'home' : 'intro');
      }
    };
    
    initGame();
  }, []);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateGameState = (newGameState: GameState) => {
    const normalized = normalizeGameState(newGameState);
    setGameState(normalized);
    saveGameState(normalized);
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
          money={gameState.money} 
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
    </div>
  );
}

export default App;
