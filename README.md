# 🏢 シャチポケ - 社畜育成ゲーム

社畜ライフキャラクター診断から遷移してきたキャラクターを育成する、社畜ライフシミュレーションゲームです！

## 🎮 ゲーム概要

怖い上司との問答、お局様からの嫌がらせ、朝の出社チェックなど、リアルな社畜ライフの試練に挑戦！
正しい選択をしてシャチコインを集め、キャラクターを強化していこう。

### 主な機能

- **キャラクター受け取り**: 診断サイトからキャラクターデータを受け取って育成開始
- **3種類のイベント**:
  - 😠 上司との問答
  - 👵 お局様の嫌がらせ
  - ⏰ 出社チェック
- **シャチコイン**: イベントクリアで獲得できる通貨
- **ステータス強化**: シャチコインを使ってキャラクターを強化
- **レベルシステム**: 経験値を貯めてレベルアップ
- **毎日プレイ**: 日替わりでイベントに挑戦可能

## 🌐 ライブデモ

**本番環境**: [https://shachipoke.syachiku-life.com/](https://shachipoke.syachiku-life.com/)

**診断テスト**: [https://shachipoke.syachiku-life.com/test-diagnosis.html](https://shachipoke.syachiku-life.com/test-diagnosis.html)

**GitHub Pages**: [https://toru830.github.io/shachipoke/](https://toru830.github.io/shachipoke/)

## 🚀 セットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### 開発サーバー起動後

ブラウザで `http://localhost:5173` を開いてください。

## 📱 PWA対応

このアプリはPWA（Progressive Web App）として動作します。
スマートフォンのホーム画面に追加して、ネイティブアプリのように使用できます。

## 🔗 キャラクターデータの連携

診断サイトからキャラクターデータを受け取る場合、以下のようなURLパラメータを使用します：

```
http://localhost:5173/?character=<JSON_DATA>
```

JSONデータの形式：
```json
{
  "id": "unique-id",
  "name": "キャラクター名",
  "type": "新入社員",
  "stats": {
    "stress": 50,
    "communication": 50,
    "endurance": 50,
    "luck": 50
  },
  "appearance": {
    "color": "#3b82f6",
    "style": "default"
  }
}
```

URLエンコードが必要です：
```javascript
const characterData = { /* ... */ };
const encoded = encodeURIComponent(JSON.stringify(characterData));
const url = `https://your-game-url.com/?character=${encoded}`;
```

## 🎨 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: TailwindCSS
- **PWA**: vite-plugin-pwa
- **ルーティング**: React Router DOM
- **ストレージ**: LocalStorage

## 📂 プロジェクト構造

```
src/
├── components/         # Reactコンポーネント
│   ├── Welcome.tsx    # ウェルカム画面
│   ├── Home.tsx       # ホーム画面
│   ├── EventScreen.tsx # イベント画面
│   └── UpgradeScreen.tsx # 強化画面
├── data/              # ゲームデータ
│   └── events.ts      # イベントデータ
├── types/             # TypeScript型定義
│   └── character.ts   # キャラクター型
├── utils/             # ユーティリティ関数
│   ├── storage.ts     # ストレージ管理
│   └── gameLogic.ts   # ゲームロジック
├── App.tsx            # メインアプリケーション
├── main.tsx           # エントリーポイント
└── index.css          # グローバルスタイル
```

## 🎯 ゲームプレイの流れ

1. **キャラクター受け取り**: 診断サイトから遷移、またはデフォルトキャラクターで開始
2. **イベント選択**: 3種類のイベントから選択
3. **選択肢を選ぶ**: イベントごとに3つの選択肢から1つを選択
4. **結果と報酬**: 選択の結果に応じてシャチコインと経験値を獲得
5. **キャラクター強化**: 貯めたシャチコインでステータスを強化
6. **レベルアップ**: 経験値を貯めてキャラクターをレベルアップ

## 📊 ステータスの種類

- **💪 ストレス耐性**: 上司からの理不尽な指示に耐える力
- **💬 コミュニケーション力**: 人間関係を円滑にする能力
- **⚡ 体力**: 長時間労働に耐える持久力
- **🍀 運**: 良い出来事が起こる確率

## 🎮 イベントの種類

### 😠 上司との問答
厳しい上司からの突然の依頼や指示に、適切に対応できるか？

### 👵 お局様の嫌がらせ
職場のベテラン社員からの理不尽な要求やマウンティングに対処！

### ⏰ 出社チェック
早朝出社、休日の過ごし方、残業時間など、社畜としての自覚をチェック！

## 🔄 データ保存

ゲームデータはブラウザのLocalStorageに自動保存されます。
同じブラウザで再訪問すると、前回のデータから続きをプレイできます。

## 📝 ライセンス

MIT License

## 🤝 貢献

プルリクエストを歓迎します！

---

**楽しい社畜ライフを！** 🏢✨

