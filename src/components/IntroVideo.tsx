import { useState, useRef, useEffect } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo = ({ onComplete }: IntroVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 3秒後にスキップボタンを表示
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleEnded = () => {
    onComplete();
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl max-h-screen">
        <video
          ref={videoRef}
          className="w-full h-full object-contain cursor-pointer"
          onPlay={handlePlay}
          onEnded={handleEnded}
          onClick={handleVideoClick}
          autoPlay
          muted
        >
          <source src="./intro-video.mp4" type="video/mp4" />
          お使いのブラウザは動画をサポートしていません。
        </video>

        {/* 再生/一時停止ボタン */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleVideoClick}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all"
            >
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        )}

        {/* スキップボタン */}
        {showSkipButton && (
          <div className="absolute top-4 right-4">
            <button
              onClick={handleSkip}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg transition-all"
            >
              スキップ
            </button>
          </div>
        )}

        {/* タップして再生のヒント */}
        {!isPlaying && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
              タップして再生
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroVideo;
