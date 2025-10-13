import React from 'react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'ホーム', emoji: '🏠' },
    { id: 'event', label: 'イベント', emoji: '📅' },
    { id: 'shop', label: 'ショップ', emoji: '🛒' },
    { id: 'training', label: '修行', emoji: '💪' },
    { id: 'formation', label: '編成', emoji: '👥' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-2xl mx-auto flex justify-around">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              currentScreen === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl mb-1">{item.emoji}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
