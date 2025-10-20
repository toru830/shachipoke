import { Character } from '../types/character';

interface CharacterAvatarProps {
  character: Character;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

const CharacterAvatar = ({ character, size = 'medium', className = '', style }: CharacterAvatarProps) => {
  const sizeClasses = {
    small: 'w-16 h-16 text-2xl',
    medium: 'w-24 h-24 text-4xl',
    large: 'w-32 h-32 text-6xl',
  };

  const baseClasses = `rounded-full flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`;

  // 社畜診断のキャラクターアイコンを使用する場合
  if (character.appearance.characterId) {
    const characterId = character.appearance.characterId.toString().padStart(3, '0');
    console.log('Loading character image:', {
      characterId: character.appearance.characterId,
      paddedId: characterId,
      imagePath: `./characters/${characterId}.png`
    });
    return (
      <div 
        className={baseClasses}
        style={{ backgroundColor: character.appearance.color, ...style }}
      >
        <img 
          src={`./characters/${characterId}.png`}
          alt={character.name}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            console.error('Failed to load character image:', `./characters/${characterId}.png`);
            // エラー時はデフォルトの絵文字を表示
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = character.appearance.emoji || '🧑‍💼';
            }
          }}
        />
      </div>
    );
  }

  // 絵文字またはデフォルト絵文字を表示
  return (
    <div 
      className={baseClasses}
      style={{ backgroundColor: character.appearance.color, ...style }}
    >
      {character.appearance.emoji || '🧑‍💼'}
    </div>
  );
};

export default CharacterAvatar;
