# 🎮 シャチポケ - デモとテスト方法

## 開発サーバーの起動

```bash
npm run dev
```

サーバーが起動したら、ブラウザで以下のURLを開いてください：
- **デフォルト**: http://localhost:5173/

## テスト用URL

### 1. デフォルトキャラクターで開始
```
http://localhost:5173/
```
デフォルトの「新米社畜くん」でゲームを開始します。初回ボーナスとして50シャチをもらえます。

### 2. カスタムキャラクターで開始（例1: 優秀な新入社員）
```
http://localhost:5173/?character=%7B%22id%22%3A%22test-001%22%2C%22name%22%3A%22%E5%84%AA%E7%A7%80%E3%81%AA%E6%96%B0%E4%BA%BA%22%2C%22type%22%3A%22%E6%96%B0%E5%85%A5%E7%A4%BE%E5%93%A1%22%2C%22stats%22%3A%7B%22stress%22%3A70%2C%22communication%22%3A80%2C%22endurance%22%3A60%2C%22luck%22%3A75%7D%2C%22appearance%22%3A%7B%22color%22%3A%22%2310b981%22%2C%22style%22%3A%22default%22%7D%7D
```

元のJSONデータ：
```json
{
  "id": "test-001",
  "name": "優秀な新人",
  "type": "新入社員",
  "stats": {
    "stress": 70,
    "communication": 80,
    "endurance": 60,
    "luck": 75
  },
  "appearance": {
    "color": "#10b981",
    "style": "default"
  }
}
```

### 3. カスタムキャラクター（例2: ベテラン社畜）
```
http://localhost:5173/?character=%7B%22id%22%3A%22test-002%22%2C%22name%22%3A%22%E3%83%99%E3%83%86%E3%83%A9%E3%83%B3%E7%A4%BE%E7%95%9C%E3%81%95%E3%82%93%22%2C%22type%22%3A%22%E4%B8%AD%E5%A0%85%E7%A4%BE%E5%93%A1%22%2C%22stats%22%3A%7B%22stress%22%3A95%2C%22communication%22%3A85%2C%22endurance%22%3A90%2C%22luck%22%3A40%7D%2C%22appearance%22%3A%7B%22color%22%3A%22%23ef4444%22%2C%22style%22%3A%22default%22%7D%7D
```

元のJSONデータ：
```json
{
  "id": "test-002",
  "name": "ベテラン社畜さん",
  "type": "中堅社員",
  "stats": {
    "stress": 95,
    "communication": 85,
    "endurance": 90,
    "luck": 40
  },
  "appearance": {
    "color": "#ef4444",
    "style": "default"
  }
}
```

## 📱 スマホでのテスト方法

### 1. 同じネットワークに接続
スマートフォンとPCを同じWi-Fiネットワークに接続します。

### 2. PCのIPアドレスを確認
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### 3. スマホのブラウザでアクセス
```
http://<PCのIPアドレス>:5173/
```
例: `http://192.168.1.10:5173/`

### 4. ホーム画面に追加
- **iOS Safari**: 共有ボタン → 「ホーム画面に追加」
- **Android Chrome**: メニュー → 「ホーム画面に追加」

## 🎯 ゲームプレイのテスト項目

### 基本機能
- [ ] キャラクターの表示と情報確認
- [ ] シャチコインの表示
- [ ] レベルとEXPバーの表示
- [ ] 各ステータスの表示

### イベントシステム
- [ ] 上司イベントの実行
  - [ ] 3つの選択肢から選択
  - [ ] 結果画面の表示
  - [ ] シャチコイン獲得
  - [ ] 経験値獲得
  - [ ] イベント完了フラグ
- [ ] お局イベントの実行
- [ ] 出社チェックイベントの実行

### 強化システム
- [ ] 強化画面を開く
- [ ] 各ステータスを強化
  - [ ] シャチコインが消費される
  - [ ] ステータスが上昇する
  - [ ] 強化コストが増加する
- [ ] シャチコイン不足時のメッセージ

### データ永続化
- [ ] ブラウザをリロードしてもデータが保持される
- [ ] 日付が変わるとイベントがリセットされる

### レスポンシブデザイン
- [ ] スマホ（縦向き）での表示
- [ ] スマホ（横向き）での表示
- [ ] タブレットでの表示
- [ ] デスクトップでの表示

## 🔧 キャラクターURL生成スクリプト

診断サイトから連携する場合、以下のようなJavaScriptコードを使用します：

```javascript
// キャラクターデータを作成
const characterData = {
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`, // ユニークID
  name: "診断結果の名前",
  type: "新入社員", // または他のタイプ
  stats: {
    stress: Math.floor(Math.random() * 50) + 30,
    communication: Math.floor(Math.random() * 50) + 30,
    endurance: Math.floor(Math.random() * 50) + 30,
    luck: Math.floor(Math.random() * 50) + 30,
  },
  appearance: {
    color: "#3b82f6", // キャラクターに応じた色
    style: "default",
  }
};

// URLを生成
const gameUrl = "https://your-game-domain.com"; // 本番環境のURL
const encoded = encodeURIComponent(JSON.stringify(characterData));
const fullUrl = `${gameUrl}/?character=${encoded}`;

// リダイレクトまたはリンク表示
window.location.href = fullUrl; // 自動遷移
// または
// <a href="${fullUrl}">ゲームを始める</a>
```

## 📊 デバッグ情報の確認

ブラウザの開発者ツール（F12）を開いて：

1. **Console**: エラーメッセージの確認
2. **Application > Local Storage**: 保存されたゲームデータの確認
3. **Network**: PWAマニフェストとサービスワーカーの確認

## 🚀 本番ビルドのテスト

```bash
# ビルド
npm run build

# プレビュー
npm run preview
```

ビルド後、`http://localhost:4173/` でプレビューできます。

## 🐛 既知の問題と対処法

### PWAアイコンが表示されない
現在、pwa-192x192.pngとpwa-512x512.pngはプレースホルダーです。
本番環境では、以下のツールで実際のPNG画像を生成してください：
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### LocalStorageがクリアされる
- プライベートモード/シークレットモードでは永続化されません
- ブラウザの設定でLocalStorageが無効になっていないか確認

## 📝 テストシナリオ例

### シナリオ1: 新規プレイヤー
1. アプリを開く（キャラクターパラメータなし）
2. デフォルトキャラクターとウェルカム画面を確認
3. 「ゲームスタート」をクリック
4. ホーム画面でキャラクター情報を確認
5. 上司イベントに挑戦
6. 選択肢を選んで結果を確認
7. シャチコインと経験値の獲得を確認
8. 同じイベントが完了済みになっているか確認

### シナリオ2: キャラクター連携
1. カスタムキャラクターURLでアプリを開く
2. URLのキャラクターデータが正しく読み込まれているか確認
3. ステータスが正しく表示されているか確認
4. ゲームプレイを開始

### シナリオ3: 育成プレイ
1. 複数のイベントをクリア
2. シャチコインを貯める
3. 強化画面でステータスを強化
4. レベルアップを確認
5. 統計情報が更新されているか確認

---

**楽しいテストを！** 🎮✨

