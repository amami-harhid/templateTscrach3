/**
 * Dont modify this file.
 * このファイルは変更禁止です。
 */
// eslint-disable-next-line no-undef
const myScript = document.getElementsByTagName('script');
if(myScript && myScript[0]){
    // 元のscriptを削除して表示しない
    myScript[0].remove();
}
// bundle.js を参照する scriptを作成する
// eslint-disable-next-line no-undef
const href = location.href;
const simpleDirName = href.replace(/\/$/,'').replace(/^.+\//, '');
const bundleDir = `../../build/${simpleDirName}/bundle.js`;
// eslint-disable-next-line no-undef
const scriptTag = document.createElement("script");
scriptTag.setAttribute('src', bundleDir);
scriptTag.setAttribute('type','module');
// eslint-disable-next-line no-undef
document.head.appendChild(scriptTag);
