# 🔗 社畜診断サイト連携ガイド

## 概要

社畜診断サイト（https://shindan.syachiku-life.com/）からシャチポケ（https://shachipoke.syachiku-life.com/）への連携システムです。
診断結果をそのままキャラクターとして受け取って、育成ゲームを開始できます。

## 📋 連携データ形式

### 診断サイト側で送信するデータ

```javascript
const diagnosisResult = {
  id: "unique-diagnosis-id", // 診断結果のユニークID
  name: "診断結果の名前", // 例: "新米社畜くん", "疲れ切った社員"
  type: "社畜タイプ", // 例: "新入社員", "中堅社員", "管理職候補"
  description: "診断結果の説明文", // オプション
  stats: {
    stress: 70,        // ストレス耐性 (0-100)
    communication: 60, // コミュニケーション力 (0-100)
    endurance: 80,     // 体力・持久力 (0-100)
    luck: 40           // 運 (0-100)
  },
  appearance: {
    color: "#3b82f6",     // キャラクターの背景色（HEX）
    style: "default",     // スタイル（将来の拡張用）
    emoji: "😤",          // 絵文字（オプション）
    avatar: "https://...", // カスタム画像URL（オプション）
    iconId: 5             // 社畜アイコンID（1-16）
  },
  diagnosisData: {        // 診断サイト固有のデータ（オプション）
    rawScore: 85,
    category: "ストレス耐性型",
    traits: ["真面目", "責任感が強い", "完璧主義"]
  }
};
```

## 🎨 社畜アイコン対応

シャチポケには16種類の社畜アイコンが用意されています：

| ID | ファイル名 | 説明 |
|----|------------|------|
| 1  | 001.png | 新米社畜くん |
| 2  | 002.png | 疲れ切った社員 |
| 3  | 003.png | 燃え尽き症候群 |
| 4  | 004.png | 完璧主義者 |
| 5  | 005.png | 残業マスター |
| 6  | 006.png | ストレス耐性MAX |
| 7  | 007.png | コミュ力不足 |
| 8  | 008.png | 運のない人 |
| 9  | 009.png | 上司のペット |
| 10 | 010.png | お局様のターゲット |
| 11 | 011.png | 朝活社畜 |
| 12 | 012.png | 夜型社畜 |
| 13 | 013.png | 完璧な社畜 |
| 14 | 014.png | 問題児社畜 |
| 15 | 015.png | 影の実力者 |
| 16 | 016.png | 透明人間 |

## 🔧 実装例

### 診断サイト側の実装

```javascript
// 診断結果を取得
function getDiagnosisResult() {
  // 診断ロジック...
  const result = {
    id: crypto.randomUUID(),
    name: "新米社畜くん",
    type: "新入社員",
    description: "あなたは新米社畜です。これからが本番！",
    stats: {
      stress: 50,
      communication: 60,
      endurance: 70,
      luck: 40
    },
    appearance: {
      color: "#3b82f6",
      style: "default",
      iconId: 1 // 新米社畜くんのアイコン
    }
  };
  
  return result;
}

// シャチポケにリダイレクト
function redirectToShachipoke() {
  const diagnosis = getDiagnosisResult();
  const gameUrl = "https://your-shachipoke-url.com"; // 本番環境のURL
  const encoded = encodeURIComponent(JSON.stringify(diagnosis));
  window.location.href = `${gameUrl}/?diagnosis=${encoded}`;
}

// ボタンクリック時の処理
document.getElementById('start-game-btn').addEventListener('click', redirectToShachipoke);
```

### HTML例

```html
<!DOCTYPE html>
<html>
<head>
    <title>社畜診断結果</title>
</head>
<body>
    <div id="diagnosis-result">
        <h1>あなたの社畜タイプは...</h1>
        <div id="result-display">
            <!-- 診断結果の表示 -->
        </div>
        <button id="start-game-btn" class="btn-primary">
            🎮 シャチポケで育成開始！
        </button>
    </div>

    <script>
        // 上記のJavaScriptコード
    </script>
</body>
</html>
```

## 🧪 テスト用URL

### 各アイコンでテスト

```
# アイコン1（新米社畜くん）
http://localhost:5173/?diagnosis=%7B%22id%22%3A%22test-001%22%2C%22name%22%3A%22%E6%96%B0%E7%B1%B3%E7%A4%BE%E7%95%9C%E3%81%8F%E3%82%93%22%2C%22type%22%3A%22%E6%96%B0%E5%85%A5%E7%A4%BE%E5%93%A1%22%2C%22description%22%3A%22%E6%96%B0%E7%B1%B3%E7%A4%BE%E7%95%9C%E3%81%8F%E3%82%93%22%2C%22stats%22%3A%7B%22stress%22%3A50%2C%22communication%22%3A60%2C%22endurance%22%3A70%2C%22luck%22%3A40%7D%2C%22appearance%22%3A%7B%22color%22%3A%22%233b82f6%22%2C%22style%22%3A%22default%22%2C%22iconId%22%3A1%7D%7D

# アイコン5（残業マスター）
http://localhost:5173/?diagnosis=%7B%22id%22%3A%22test-005%22%2C%22name%22%3A%22%E6%AE%8B%E6%A5%AD%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC%22%2C%22type%22%3A%22%E4%B8%AD%E5%A0%85%E7%A4%BE%E5%93%A1%22%2C%22description%22%3A%22%E6%AE%8B%E6%A5%AD%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC%22%2C%22stats%22%3A%7B%22stress%22%3A90%2C%22communication%22%3A70%2C%22endurance%22%3A95%2C%22luck%22%3A30%7D%2C%22appearance%22%3A%7B%22color%22%3A%22%23dc2626%22%2C%22style%22%3A%22default%22%2C%22iconId%22%3A5%7D%7D

# アイコン16（透明人間）
http://localhost:5173/?diagnosis=%7B%22id%22%3A%22test-016%22%2C%22name%22%3A%22%E9%80%8F%E6%98%8E%E4%BA%BA%E9%96%93%22%2C%22type%22%3A%22%E3%83%95%E3%83%AA%E3%83%BC%E3%82%BF%E3%83%BC%E5%87%BA%E8%BA%AB%22%2C%22description%22%3A%22%E9%80%8F%E6%98%8E%E4%BA%BA%E9%96%93%22%2C%22stats%22%3A%7B%22stress%22%3A20%2C%22communication%22%3A10%2C%22endurance%22%3A30%2C%22luck%22%3A90%7D%2C%22appearance%22%3A%7B%22color%22%3A%22%236b7280%22%2C%22style%22%3A%22default%22%2C%22iconId%22%3A16%7D%7D
```

## 📱 モバイル対応

診断サイトもモバイル対応している場合、シャチポケも自動的にモバイル最適化されます。

### PWA対応

シャチポケはPWA対応しているため、スマートフォンのホーム画面に追加可能です。

## 🔒 セキュリティ考慮事項

1. **データ検証**: 受信したデータの妥当性をチェック
2. **XSS対策**: ユーザー入力の適切なエスケープ
3. **URL長制限**: 長すぎるURLパラメータの制限

## 🚀 本番環境での設定

### 環境変数

```bash
# シャチポケのURL
VITE_GAME_URL=https://your-shachipoke-domain.com

# 診断サイトのURL
VITE_DIAGNOSIS_URL=https://shindan.syachiku-life.com
```

### CORS設定

診断サイトとシャチポケが異なるドメインの場合、適切なCORS設定が必要です。

## 📊 分析・追跡

診断からゲームへの遷移率を追跡する場合：

```javascript
// Google Analytics例
gtag('event', 'diagnosis_to_game', {
  'diagnosis_type': diagnosis.type,
  'character_name': diagnosis.name,
  'icon_id': diagnosis.appearance.iconId
});
```

## 🐛 トラブルシューティング

### よくある問題

1. **アイコンが表示されない**
   - iconIdが1-16の範囲内か確認
   - 画像ファイルが正しく配置されているか確認

2. **データが正しく渡されない**
   - URLエンコードが正しく行われているか確認
   - 必須フィールド（name, type, stats）が含まれているか確認

3. **モバイルで表示が崩れる**
   - レスポンシブデザインの確認
   - タッチ操作の最適化確認

---

**診断サイトとシャチポケの連携で、より楽しい社畜ライフを！** 🏢✨
