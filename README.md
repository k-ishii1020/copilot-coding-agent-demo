# Todo デモ (GitHub Copilot Coding Agent)

シンプルなブラウザ向け Todo アプリのデモリポジトリです。以下の要件を満たしています。

- TypeScript + Vite を使用
- ブラウザの LocalStorage による永続化
- Vitest によるユニットテスト
- Dev Container 対応 (Node 20 ベース / 自動依存インストール)
- すべて日本語ドキュメント

## 機能概要

| 操作 | 説明 |
|------|------|
| 追加 | テキストを入力して Enter もしくは「追加」ボタンで新規タスク作成 |
| 完了トグル | チェックボックスをクリックすると完了/未完了切替 |
| 削除 | 「削除」ボタンでタスク削除 |

データは `localStorage` キー `demo_todos_v1` に保存され、ページを再読み込みしても保持されます。

## 開発環境 (Dev Container 推奨)

VS Code + Dev Containers 拡張を利用すると一発で再現可能な環境が立ち上がります。

1. このリポジトリをクローン
2. VS Code で開く
3. 「Reopen in Container」を選択
4. 自動で `npm install` が実行されます

## 手動セットアップ

Dev Container を使わない場合:

```bash
git clone <repo-url>
cd copilot-coding-agent-demo
npm install
```

## 開発サーバ起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

## ビルド

```bash
npm run build
```

`dist/` に成果物が生成されます。

## テスト実行

```bash
npm test
```

ウォッチモード:

```bash
npm run test:watch
```

## ディレクトリ構成

```
├─ index.html          # エントリ HTML
├─ src/
│  ├─ main.ts          # UI ロジック
│  ├─ todoService.ts   # ビジネスロジック (CRUD)
│  ├─ storage.ts       # LocalStorage I/O
│  ├─ types.ts         # 型定義
│  └─ style.css        # スタイル
├─ tests/
│  └─ todoService.test.ts # ユニットテスト
└─ .devcontainer/
	└─ devcontainer.json
```

## 今後の改善例 (任意)

- フィルタ (すべて / 未完了 / 完了)
- タイトル編集機能
- DnD による並び替え
- E2E テスト（Playwright 等）

## ライセンス

デモ用途。必要に応じて LICENSE ファイルを追加してください。

