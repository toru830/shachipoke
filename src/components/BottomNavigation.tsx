import React from 'react';

type Screen = 'home' | 'event' | 'upgrade' | 'shop' | 'training' | 'formation' | 'achievement' | 'settings';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home' as Screen, label: 'ホーム', icon: '🏠' },
    { id: 'event' as Screen, label: 'イベント', icon: '📅' },
    { id: 'upgrade' as Screen, label: 'アップグレード', icon: '⬆️' },
    { id: 'shop' as Screen, label: 'ショップ', icon: '🛒' },
    { id: 'training' as Screen, label: 'トレーニング', icon: '💪' },
    { id: 'formation' as Screen, label: '編成', icon: '👥' },
    { id: 'achievement' as Screen, label: '実績', icon: '🏆' },
    { id: 'settings' as Screen, label: '設定', icon: '⚙️' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === item.id
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
