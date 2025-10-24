import React, { useRef, useState } from 'react';

interface VideoGalleryProps {
  onBack: () => void;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ onBack }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleRetry = () => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // 自動再生がブロックされた場合は無視
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">動画ギャラリー</h1>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            設定に戻る
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">イントロビデオ</h2>
              <p className="text-sm text-gray-600">ゲームの概要をいつでも見返せます。</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              常設アーカイブ
            </span>
          </div>

          <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              controlsList="nodownload"
              onError={() => setHasError(true)}
              onLoadedData={() => setHasError(false)}
            >
              <source src="/1024(3).mp4" type="video/mp4" />
              お使いのブラウザは動画に対応していません。
            </video>

            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 text-center px-4">
                <p className="text-red-600 font-semibold mb-2">動画を読み込めませんでした。</p>
                <p className="text-sm text-gray-600 mb-4">通信状況をご確認のうえ、再試行してください。</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  再試行する
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
