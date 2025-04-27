/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const fs = require('fs');
const { execSync } = require('child_process');

if(process.argv.length < 3 ) {
    console.log('パラメータが不足しています(フォルダ名)');
    process.exit(1);
}

const dir = process.argv[2];
const absolutePath = fs.realpathSync('./');
const srcPath = `${absolutePath}/src/${dir}`;
if( !fs.existsSync( srcPath )) {
    console.log('srcフォルダの中に指定フォルダがありません');
    process.exit(1);
}
if( !fs.existsSync( srcPath+"/index.html" )) {
    console.log('指定フォルダの中にindex.htmlがありません');
    process.exit(1);
}
const open = (process.argv.length > 3)? process.argv[3] : '';
if( open == '--open') {
    const npxParcel = `npx parcel ./src/${dir}/index.html --open`;
    execSync(npxParcel);

} else {
    const npxParcel = `npx parcel build ./src/${dir}/index.html --public-url ./ --dist-dir ./build/${dir}`
    execSync(npxParcel);
}
