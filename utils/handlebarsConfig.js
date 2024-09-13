import path from "node:path";

/**
 * 各HTMLページの固有データを定義します。
 * @type {Object.<string, {isHome: boolean, title: string}>}
 */

/**
 * ウェブサイトの固定タイトル
 * @type {string}
 */
const WEBSITE_TITLE = "My Website";

/**
 * タイトル要素間のデリミタ
 * @type {string}
 */
const TITLE_DELIMITER = " - ";

/**
 * ページタイトルを生成します。
 * @param {string} pageTitle - ページ固有のタイトル
 * @param {boolean} [includeWebsiteTitle=true] - ウェブサイトのタイトルを含めるかどうか
 * @returns {string} 生成されたページタイトル
 */
function generatePageTitle(pageTitle, includeWebsiteTitle = true) {
  if (includeWebsiteTitle) {
    return `${pageTitle}${TITLE_DELIMITER}${WEBSITE_TITLE}`;
  }
  return pageTitle;
}

/**
 * 各HTMLページのコンテキストデータを定義します。
 * @type {Object.<string, {isHome: boolean, title: string}>}
 */
const pageContextMap = {
  "/index.html": {
    isHome: true,
    title: generatePageTitle("home"),
  },
  "/about/index.html": {
    isHome: false,
    title: generatePageTitle("about"),
  },
};

/**
 * Handlebarsプラグインの設定オブジェクトを生成します。
 * @param {string} srcDir - プロジェクトのソースディレクトリ
 * @returns {Object} Handlebarsプラグインの設定オブジェクト
 */
export function getHandlebarsConfig(srcDir) {
  return {
    partialDirectory: path.resolve(__dirname, `${srcDir}/components`),
    context(pagePath) {
      return pageContextMap[pagePath];
    },
  };
}
