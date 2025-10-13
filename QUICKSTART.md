# 🚀 クイックスタートガイド

## 今すぐ始める（3ステップ）

### 1️⃣ 依存関係のインストール
```bash
npm install
```

### 2️⃣ 開発サーバーの起動
```bash
npm run dev
```

### 3️⃣ ブラウザで開く
```
http://localhost:5173/
```

## 🎮 基本的な使い方

### デフォルトで遊ぶ
そのままアクセスすると、デフォルトの「新米社畜くん」でゲームを始められます。

### キャラクターを連携して遊ぶ
診断サイトからキャラクターデータをURLパラメータで受け取ります：

```javascript
// 診断サイト側のコード例
const character = {
  id: "unique-id",
  name: "あなたの社畜タイプ",
  type: "新入社員",
  stats: {
    stress: 50,
    communication: 50,
    endurance: 50,
    luck: 50
  },
  appearance: {
    color: "#3b82f6",
    style: "default"
  }
};

const url = `https://your-game-url.com/?character=${encodeURIComponent(JSON.stringify(character))}`;
window.location.href = url;
```

## 🎯 ゲームの流れ

1. **ホーム画面**: キャラクターの状態とシャチコインを確認
2. **イベント選択**: 3種類のイベント（上司・お局・出社）から選択
3. **選択肢を選ぶ**: 3つの選択肢から最適なものを選択
4. **報酬獲得**: シャチコインと経験値をゲット
5. **強化**: 貯めたシャチコインでステータスを強化

## 📱 スマホで遊ぶ

### 方法1: 同じWi-Fiで接続
```bash
# PCのIPアドレスを確認
ipconfig  # Windows
ifconfig  # Mac/Linux

# スマホのブラウザでアクセス
http://192.168.x.x:5173/
```

### 方法2: 本番環境にデプロイ
```bash
npm run build
# distフォルダをホスティングサービスにアップロード
```

推奨ホスティング：
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 🛠️ コマンド一覧

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# Lintチェック
npm run lint
```

## 💡 Tips

- **データは自動保存**: ブラウザのLocalStorageに保存されます
- **毎日イベント更新**: 日付が変わると新しいイベントに挑戦できます
- **PWA対応**: スマホのホーム画面に追加して、アプリのように使えます
- **オフライン対応**: 一度アクセスすれば、オフラインでも動作します

## 🎨 カスタマイズ

### イベントを追加
`src/data/events.ts` に新しいイベントを追加できます。

### キャラクタータイプを増やす
`src/types/character.ts` でキャラクタータイプを定義できます。

### デザインの変更
`tailwind.config.js` でカラーテーマを変更できます。

## 📞 サポート

質問や問題があれば、GitHubのIssueで報告してください。

---

**さあ、社畜育成を始めましょう！** 🏢✨

