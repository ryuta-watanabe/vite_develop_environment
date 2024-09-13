import path from "node:path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { generateAssetFileName } from "./utils/assetFileUtils";
import { getHandlebarsConfig } from "./utils/handlebarsConfig";
import { createInputFilesObject, findHtmlFiles } from "./utils/htmlFileUtils";

// プロジェクトのソースディレクトリを指定
const srcDir = path.resolve(__dirname, "./src");
const distDir = path.resolve(__dirname, "./dist");

// HTMLファイルを検索し、入力ファイルオブジェクトを作成
const htmlFiles = findHtmlFiles(srcDir);
const inputFiles = createInputFilesObject(htmlFiles, srcDir);

export default defineConfig({
  root: srcDir,
  build: {
    outDir: distDir,
    rollupOptions: {
      input: inputFiles, // 動的に生成された入力ファイルオブジェクトを使用
      output: {
        assetFileNames: generateAssetFileName, // カスタムアセットファイル名生成関数を使用
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
    },
    emptyOutDir: true, // ビルド前に出力ディレクトリをクリーンアップ
  },
  plugins: [
    handlebars(getHandlebarsConfig(srcDir)), // Handlebarsプラグインの設定を適用
  ],
});
