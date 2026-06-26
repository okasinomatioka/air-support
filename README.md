# air ホームページ

放課後等デイサービス・日中一時支援 `air` の静的ホームページです。

## 確認方法

以下を実行して `http://localhost:8000/` を開いてください。

```bash
python3 -m http.server 8000
```

## 主なファイル

- `index.html`: ページ本文
- `styles.css`: レスポンシブデザイン
- `script.js`: スマートフォンメニュー
- `maps-config.js`: Google Maps APIキー設定
- `assets/`: サイトで使用中の画像
- `photo-candidates/`: 法人サイトから抽出した写真候補一覧
- `air-dining-candidates/`: Air食堂の写真候補一覧
- `HANDOFF.md`: 次回作業用の引き継ぎメモ

## Google Maps連携

`afterschool.html` と `daytime.html` の施設情報に Google Map を表示します。

1. Google Cloud Consoleで対象プロジェクトの課金と API を有効化する
2. `Maps Embed API` を有効化する
3. ブラウザ用 API キーを作成し、HTTPリファラーで公開ドメインを制限する
4. `maps-config.js` の空文字に API キーを設定する

```js
window.AIR_GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";
```

APIキーが空の場合、地図枠には案内文だけ表示され、既存の Google Map 外部リンクはそのまま使えます。

## 写真候補ページ

- `http://localhost:8000/photo-candidates/`
- `http://localhost:8000/air-dining-candidates/`

## 写真候補の再取得

Playwright導入済みです。

```bash
npm run find-images
npm run photo-gallery
npm run air-dining-gallery
```
