import React from 'react';

type Screen = 'home' | 'event' | 'shop' | 'formation' | 'settings';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home' as Screen, icon: '🏠' },
    { id: 'event' as Screen, icon: '📅' },
    { id: 'shop' as Screen, icon: '🛒' },
    { id: 'formation' as Screen, icon: '👥' },
    { id: 'settings' as Screen, icon: '⚙️' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-center gap-6 w-full max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
              currentScreen === item.id
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
