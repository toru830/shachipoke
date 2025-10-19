import { Character } from '../types/character';

interface CharacterAvatarProps {
  character: Character;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const CharacterAvatar = ({ character, size = 'medium', className = '' }: CharacterAvatarProps) => {
  const sizeClasses = {
    small: 'w-12 h-12 text-2xl',
    medium: 'w-20 h-20 text-4xl',
    large: 'w-32 h-32 text-6xl',
  };

  const baseClasses = `rounded-full flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`;

  // 画像URLがある場合は画像を表示、なければ絵文字を表示
  if (character.appearance.avatar) {
    return (
      <div 
        className={baseClasses}
        style={{ backgroundColor: character.appearance.color }}
      >
        <img 
          src={character.appearance.avatar} 
          alt={character.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  // 社畜診断のキャラクターアイコンを使用する場合
  if (character.appearance.characterId) {
    const characterId = character.appearance.characterId.toString().padStart(3, '0');
    return (
      <div 
        className={baseClasses}
        style={{ backgroundColor: character.appearance.color }}
      >
        <img 
          src={`./characters/${characterId}.png`}
          alt={character.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  // 絵文字またはデフォルト絵文字を表示
  return (
    <div 
      className={baseClasses}
      style={{ backgroundColor: character.appearance.color }}
    >
      {character.appearance.emoji || '🧑‍💼'}
    </div>
  );
};

export default CharacterAvatar;
