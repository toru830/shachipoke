import React from 'react';
import { Achievement } from '../types/character';

interface AchievementScreenProps {
  achievements: Achievement[];
}

const AchievementScreen: React.FC<AchievementScreenProps> = ({ achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">実績</h1>
        
        {/* 実績統計 */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">実績進捗</h2>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {unlockedAchievements.length} / {achievements.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 解除済み実績 */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">解除済み実績</h2>
            <div className="space-y-3">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        解除日: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-green-500 text-2xl">✓</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 未解除実績 */}
        {lockedAchievements.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">未解除実績</h2>
            <div className="space-y-3">
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-100 rounded-xl p-4 border border-gray-200 opacity-60">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl grayscale">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-600">{achievement.name}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                    <div className="text-gray-400 text-2xl">🔒</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementScreen;
