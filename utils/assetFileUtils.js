/**
 * ファイルタイプごとの出力ディレクトリを定義するオブジェクト
 * @type {Object.<string, RegExp>}
 */
const fileTypeMap = {
  fonts: /ttf|otf|eot|woff|woff2/i,
  images: /png|jpe?g|svg|gif|tiff|bmp|ico/i,
};

/**
 * アセットファイル名を生成する関数
 * この関数は、与えられたアセット情報に基づいて適切なファイルパスを生成します。
 * フォント、画像、CSSファイルに対して個別の処理を行い、その他のファイルタイプに対してはデフォルトのパスを返します。
 *
 * @param {Object} assetInfo - アセット情報オブジェクト
 * @param {string} assetInfo.name - アセットのファイル名
 * @returns {string} 生成されたアセットファイルパス
 */
export function generateAssetFileName(assetInfo) {
  const extType = assetInfo.name.split(".").pop().toLowerCase();

  // フォントと画像ファイルの処理
  for (const [type, regex] of Object.entries(fileTypeMap)) {
    if (regex.test(extType)) {
      return `assets/${type}/[name][extname]`;
    }
  }

  // CSSファイルの処理
  if (extType === "css") {
    return "assets/css/style.css";
  }

  // その他のファイルタイプのデフォルト処理
  return `assets/${extType}/[name][extname]`;
}
