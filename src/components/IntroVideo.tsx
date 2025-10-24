import React, { useRef, useEffect, useState } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      onComplete();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleReady = () => {
      setIsLoading(false);
      const playPromise = videoElement.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
        });
      }
    };

    const handleError = () => {
      console.error('Failed to load intro video. Skipping to game.');
      onComplete();
    };

    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('canplaythrough', handleReady);
    videoElement.addEventListener('loadeddata', handleReady);
    videoElement.addEventListener('error', handleError);

    // 3秒後にスキップボタンを表示
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    // 動画のロードを開始
    videoElement.load();

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('canplaythrough', handleReady);
      videoElement.removeEventListener('loadeddata', handleReady);
      videoElement.removeEventListener('error', handleError);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/dist/1024(3).mp4"
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        muted
        onClick={togglePlayPause}
        preload="auto"
      >
        お使いのブラウザは動画タグをサポートしていません。
      </video>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white gap-4 z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <span className="text-lg">読み込み中...</span>
        </div>
      )}

      {/* 再生/一時停止インジケーター */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl cursor-pointer" onClick={togglePlayPause}>
          ▶
        </div>
      )}

      {showSkipButton && (
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 bg-white bg-opacity-30 text-white px-6 py-3 rounded-full text-lg font-bold backdrop-blur-sm hover:bg-opacity-50 transition-all duration-200 z-30"
        >
          スキップ
        </button>
      )}
    </div>
  );
};

export default IntroVideo;
