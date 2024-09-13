import fs from "node:fs";
import path from "node:path";

/**
 * 指定されたディレクトリ内のHTMLファイルを再帰的に検索します。
 *
 * @param {string} baseDir - 検索を開始するベースディレクトリのパス
 * @returns {Array<Object>} - 見つかったHTMLファイルの配列。各オブジェクトは { name, path } の形式
 */
export function findHtmlFiles(baseDir) {
  const files = [];
  readDirectory(baseDir, baseDir, files);
  return files;
}

/**
 * ディレクトリを再帰的に読み取り、HTMLファイルを検索します。
 *
 * @param {string} currentDir - 現在検索中のディレクトリパス
 * @param {string} baseDir - 検索を開始した元のベースディレクトリのパス
 * @param {Array<Object>} files - 見つかったファイルを格納する配列
 */
function readDirectory(currentDir, baseDir, files) {
  const items = fs.readdirSync(currentDir);
  for (const item of items) {
    const itemPath = path.join(currentDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      if (item !== "components") {
        readDirectory(itemPath, baseDir, files);
      }
    } else if (path.extname(itemPath) === ".html") {
      const relativePath = path.relative(baseDir, itemPath);
      const name = generateFileName(baseDir, itemPath);
      files.push({ name, path: `/${relativePath}` });
    }
  }
}

/**
 * ファイル名を生成します。
 *
 * @param {string} baseDir - ベースディレクトリのパス
 * @param {string} itemPath - ファイルの完全なパス
 * @returns {string} 生成されたファイル名
 */
function generateFileName(baseDir, itemPath) {
  const relativePath = path.relative(baseDir, itemPath);
  return path.dirname(relativePath) === "."
    ? path.parse(itemPath).name
    : `${path.dirname(relativePath).replace(/\//g, "_")}_${
        path.parse(itemPath).name
      }`;
}

/**
 * 見つかったHTMLファイルの配列から、Viteの設定で使用する入力ファイルオブジェクトを作成します。
 *
 * @param {Array<Object>} files - findHtmlFiles関数で見つかったファイルの配列
 * @param {string} baseDir - ベースディレクトリのパス
 * @returns {Object} - Viteの設定で使用する入力ファイルオブジェクト
 */
export function createInputFilesObject(files, baseDir) {
  return files.reduce((acc, file) => {
    acc[file.name] = path.resolve(baseDir, `.${file.path}`);
    return acc;
  }, {});
}
