# Vite を使った Web サイト用バンドル環境

## プロジェクト概要

このプロジェクトは、 Vite を使ってフロントエンドのバンドル、開発、ビルドを行う環境を提供します。

## 前提条件

- Node.js: `18.x` 以上
- Vite: プロジェクトにインストールされていますが、 `npm install` で依存関係を取得してください

## セットアップ手順

### 1. リポジトリのクローン

```terminal

```

### 2. 依存関係のインストール

```terminal
$ npm install
```

### 3. 開発サーバの起動

```terminal
$ npm run dev
```

### 4. ビルド

```terminal
$ npm run build
```

## ディレクトリ構成

```terminal
project-root/
├── src # 開発用コードベース
│   ├── components/ # コンポーネントファイル
│   ├── js/ # JavaScript ファイル
│   ├── public/ # 画像やフォント、バンドル対象外
│   ├── scss/ # SCSS ファイル
│   ├── index.html # メインの HTML ファイル、内容は hanblebars に準拠
├── utils # バンドルの中間処理
│   ├── assetFileUtils.js # アセットファイルの中間処理
│   ├── handlebarsConfig.js # handlebars のオプション設定
│   ├── htmlFileUtils.js # html ファイルの中間処理
├── .gitignore
├── package-lock.json # パッケージの依存関係、更新禁止
├── package.json # パッケージとスクリプト情報
├── postcss.config.cjs # PostCSS の設定
├── README.md # このファイル
├── vite.config.js # vite の設定
```

## Appendix

- [Vite 公式ドキュメント（日本語版）](https://ja.vitejs.dev/)
- [Node.js のインストール方法](https://nodejs.org/en)
