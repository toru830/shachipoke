import { useState, useEffect } from 'react';
import { GameState } from './types/character';
import { 
  loadGameState, 
  saveGameState, 
  getCharacterFromURL,
  createDefaultCharacter 
} from './utils/storage';
import { getDiagnosisFromURL, convertDiagnosisToCharacter } from './utils/diagnosisConverter';
import { getTodayDateString } from './utils/gameLogic';
import { getCharacterFromUrl, convertDiagnosisCharacterToCharacter } from './utils/urlParams';
import Home from './components/Home';
import EventScreen from './components/EventScreen';
import UpgradeScreen from './components/UpgradeScreen';
import Welcome from './components/Welcome';
import ShopScreen from './components/ShopScreen';
import FormationScreen from './components/FormationScreen';
import TrainingScreen from './components/TrainingScreen';
import BottomNavigation from './components/BottomNavigation';
import IntroVideo from './components/IntroVideo';

type Screen = 'intro' | 'welcome' | 'home' | 'event' | 'upgrade' | 'shop' | 'training' | 'formation';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [eventType, setEventType] = useState<'boss' | 'office' | 'arrival' | null>(null);

  useEffect(() => {
    // 初回ロード時の処理
    const initGame = () => {
      // まずURLパラメータから社畜診断のキャラクター情報を取得試行
      const diagnosisChar = getCharacterFromUrl();
      
      if (diagnosisChar.fromShindan && diagnosisChar.characterId && diagnosisChar.characterName) {
        // 社畜診断から来た場合の処理
        const character = convertDiagnosisCharacterToCharacter(diagnosisChar);
        if (character) {
          const newGameState: GameState = {
            character: character,
            characters: [character],
            activeCharacterId: character.id,
            shachiCoins: 50, // 診断連携ボーナス
            inventory: {},
            todayEvents: {
              bossQA: false,
              officeHarassment: false,
              earlyArrival: false,
            },
            lastPlayDate: '',
            totalEvents: 0,
            successCount: 0,
          };
          setGameState(newGameState);
          saveGameState(newGameState);
          setCurrentScreen('intro');
          return;
        }
      }

      // 次に従来の診断サイトからのデータを取得試行
      const diagnosisResult = getDiagnosisFromURL();
      
      if (diagnosisResult) {
        // 診断結果をキャラクターに変換
        const character = convertDiagnosisToCharacter(diagnosisResult);
        const newGameState: GameState = {
          character: character,
          characters: [character],
          activeCharacterId: character.id,
          shachiCoins: 50, // 診断連携ボーナス
          inventory: {},
          todayEvents: {
            bossQA: false,
            officeHarassment: false,
            earlyArrival: false,
          },
          lastPlayDate: '',
          totalEvents: 0,
          successCount: 0,
        };
        setGameState(newGameState);
        saveGameState(newGameState);
        setCurrentScreen('intro');
        return;
      }

      // 次に従来のURLパラメータからキャラクターデータを取得試行
      const urlCharacter = getCharacterFromURL();
      
      if (urlCharacter) {
        // URLからキャラクターが取得できた場合、新規ゲーム開始
        const newGameState: GameState = {
          character: urlCharacter,
          characters: [urlCharacter],
          activeCharacterId: urlCharacter.id,
          shachiCoins: 0,
          inventory: {},
          todayEvents: {
            bossQA: false,
            officeHarassment: false,
            earlyArrival: false,
          },
          lastPlayDate: '',
          totalEvents: 0,
          successCount: 0,
        };
        setGameState(newGameState);
        saveGameState(newGameState);
        setCurrentScreen('intro');
        return;
      }

      // URLにデータがない場合、既存のセーブデータを確認
      const savedState = loadGameState();
      if (savedState) {
        // 既存データの互換性を保つ
        if (!savedState.characters) {
          savedState.characters = savedState.character ? [savedState.character] : [];
        }
        if (!savedState.activeCharacterId && savedState.character) {
          savedState.activeCharacterId = savedState.character.id;
        }
        if (!savedState.inventory) {
          savedState.inventory = {};
        }
        
        // 日付が変わっていたらイベントリセット
        const today = getTodayDateString();
        if (savedState.lastPlayDate !== today) {
          savedState.todayEvents = {
            bossQA: false,
            officeHarassment: false,
            earlyArrival: false,
          };
        }
        setGameState(savedState);
        setCurrentScreen('home');
      } else {
        // セーブデータもない場合、デフォルトキャラクターで開始
        const defaultCharacter = createDefaultCharacter();
        const newGameState: GameState = {
          character: defaultCharacter,
          characters: [defaultCharacter],
          activeCharacterId: defaultCharacter.id,
          shachiCoins: 50, // 初回ボーナス
          inventory: {},
          todayEvents: {
            bossQA: false,
            officeHarassment: false,
            earlyArrival: false,
          },
          lastPlayDate: '',
          totalEvents: 0,
          successCount: 0,
        };
        setGameState(newGameState);
        saveGameState(newGameState);
        setCurrentScreen('intro');
      }
    };

    initGame();
  }, []);

  useEffect(() => {
    if (gameState) {
      saveGameState(gameState);
    }
  }, [gameState]);

  const startEvent = (type: 'boss' | 'office' | 'arrival') => {
    setEventType(type);
    setCurrentScreen('event');
  };

  const completeEvent = (updatedState: GameState) => {
    setGameState(updatedState);
    setCurrentScreen('home');
  };

  const openUpgrade = () => {
    setCurrentScreen('upgrade');
  };

  const closeUpgrade = (updatedState: GameState) => {
    setGameState(updatedState);
    setCurrentScreen('home');
  };

  const openShop = () => setCurrentScreen('shop');
  const closeShop = (updated: GameState) => { setGameState(updated); setCurrentScreen('home'); };

  const closeTraining = (updated: GameState) => { setGameState(updated); setCurrentScreen('home'); };
  const closeFormation = (updated: GameState) => { setGameState(updated); setCurrentScreen('home'); };

  const navigateToScreen = (screen: string) => {
    if (screen === 'event' && gameState) {
      // イベント画面は特別処理
      return;
    }
    setCurrentScreen(screen as Screen);
  };

  const startGame = () => {
    setCurrentScreen('home');
  };

  const completeIntro = () => {
    if (gameState) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('welcome');
    }
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {currentScreen === 'intro' && (
        <IntroVideo onComplete={completeIntro} />
      )}
      {currentScreen === 'welcome' && (
        <Welcome character={gameState.character!} onStart={startGame} />
      )}
      {currentScreen === 'home' && (
        <Home 
          gameState={gameState}
          onStartEvent={startEvent}
          onOpenUpgrade={openUpgrade}
          onOpenShop={openShop}
        />
      )}
      {currentScreen === 'event' && eventType && (
        <EventScreen
          gameState={gameState}
          eventType={eventType}
          onComplete={completeEvent}
          onCancel={() => setCurrentScreen('home')}
        />
      )}
      {currentScreen === 'upgrade' && (
        <UpgradeScreen
          gameState={gameState}
          onClose={closeUpgrade}
        />
      )}
      {currentScreen === 'shop' && (
        <ShopScreen gameState={gameState} onClose={closeShop} />
      )}
      {currentScreen === 'training' && (
        <TrainingScreen gameState={gameState} onClose={closeTraining} />
      )}
      {currentScreen === 'formation' && (
        <FormationScreen gameState={gameState} onClose={closeFormation} />
      )}

      {/* ボトムナビゲーション */}
      {currentScreen !== 'intro' && currentScreen !== 'welcome' && gameState && (
        <BottomNavigation 
          currentScreen={currentScreen} 
          onNavigate={navigateToScreen} 
        />
      )}
    </div>
  );
}

export default App;

