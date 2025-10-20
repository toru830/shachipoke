import React, { useState } from 'react';
import { GameSettings } from '../types/character';

interface SettingsScreenProps {
  settings: GameSettings;
  onSettingsUpdate: (newSettings: GameSettings) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, onSettingsUpdate }) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  const handleSettingChange = (key: keyof GameSettings, value: boolean) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsUpdate(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings: GameSettings = {
      soundEnabled: true,
      musicEnabled: true,
      notificationsEnabled: true,
      autoSave: true,
    };
    setLocalSettings(defaultSettings);
    onSettingsUpdate(defaultSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">設定</h1>
        
        {/* 音声設定 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">音声設定</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">効果音</h3>
                <p className="text-sm text-gray-600">ボタンクリックなどの効果音</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">BGM</h3>
                <p className="text-sm text-gray-600">背景音楽の再生</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.musicEnabled}
                  onChange={(e) => handleSettingChange('musicEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 通知設定 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">通知設定</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">通知</h3>
              <p className="text-sm text-gray-600">ゲーム内の通知表示</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.notificationsEnabled}
                onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* セーブ設定 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">セーブ設定</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">自動セーブ</h3>
              <p className="text-sm text-gray-600">ゲーム状態の自動保存</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* リセットボタン */}
        <div className="text-center">
          <button
            onClick={resetSettings}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            設定をリセット
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
