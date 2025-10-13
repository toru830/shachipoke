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
import Home from './components/Home';
import EventScreen from './components/EventScreen';
import UpgradeScreen from './components/UpgradeScreen';
import Welcome from './components/Welcome';

type Screen = 'welcome' | 'home' | 'event' | 'upgrade';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [eventType, setEventType] = useState<'boss' | 'office' | 'arrival' | null>(null);

  useEffect(() => {
    // 初回ロード時の処理
    const initGame = () => {
      // まず診断サイトからのデータを取得試行
      const diagnosisResult = getDiagnosisFromURL();
      
      if (diagnosisResult) {
        // 診断結果をキャラクターに変換
        const character = convertDiagnosisToCharacter(diagnosisResult);
        const newGameState: GameState = {
          character: character,
          shachiCoins: 50, // 診断連携ボーナス
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
        setCurrentScreen('welcome');
        return;
      }

      // 次に従来のURLパラメータからキャラクターデータを取得試行
      const urlCharacter = getCharacterFromURL();
      
      if (urlCharacter) {
        // URLからキャラクターが取得できた場合、新規ゲーム開始
        const newGameState: GameState = {
          character: urlCharacter,
          shachiCoins: 0,
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
        setCurrentScreen('welcome');
        return;
      }

      // URLにデータがない場合、既存のセーブデータを確認
      const savedState = loadGameState();
      if (savedState) {
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
        const newGameState: GameState = {
          character: createDefaultCharacter(),
          shachiCoins: 50, // 初回ボーナス
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
        setCurrentScreen('welcome');
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

  const startGame = () => {
    setCurrentScreen('home');
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
      {currentScreen === 'welcome' && (
        <Welcome character={gameState.character!} onStart={startGame} />
      )}
      {currentScreen === 'home' && (
        <Home 
          gameState={gameState}
          onStartEvent={startEvent}
          onOpenUpgrade={openUpgrade}
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
    </div>
  );
}

export default App;

