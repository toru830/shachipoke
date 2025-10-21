import React, { useRef, useEffect, useState } from 'react';

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnded = () => {
      onComplete();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);

    // 3秒後にスキップボタンを表示
    const timer = setTimeout(() => {
      setShowSkipButton(true);
    }, 3000);

    // 自動再生を試みる
    videoElement.play().catch(error => {
      console.log('Autoplay prevented:', error);
      setIsPlaying(false);
    });

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
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
        src="./intro-video.mp4"
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        muted
        onClick={togglePlayPause}
        onError={() => {
          console.log('Video not found, showing intro screen instead');
          // 動画が見つからない場合は3秒後に自動でスキップ
          setTimeout(() => {
            onComplete();
          }, 3000);
        }}
      >
        お使いのブラウザは動画タグをサポートしていません。
      </video>

      {/* 再生/一時停止インジケーター */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-5xl cursor-pointer" onClick={togglePlayPause}>
          ▶
        </div>
      )}

      {showSkipButton && (
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 bg-white bg-opacity-30 text-white px-6 py-3 rounded-full text-lg font-bold backdrop-blur-sm hover:bg-opacity-50 transition-all duration-200 z-10"
        >
          スキップ
        </button>
      )}
    </div>
  );
};

export default IntroVideo;
