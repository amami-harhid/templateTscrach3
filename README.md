# samplesTsScratch3
A collection of samples written in TypeScript for using scratch3LikeJsLib.

# 手順
npm install --save-dev @eslint/js, @types/node, eslint, glob, globals, ts-loader, typescript, typescript-eslint, webpack-cli

npm install --save-dev https://github.com/amami-harhid/tscratch3likejs.git

# samples

https://amami-harhid.github.io/samplesTsScratch3/src/

# src

srcディレクトリの下に サブディレクトリを作成し、サブディレクトリ内に index.ts を作成する
サブディレクトリの下には、次のファイルを用意する。

- index.html
- tsconfig.json
- webpack.config.js

## tsconfig.json
```json
{
  "extends": "../../tsconfig",
  "include": ["./*.ts"],
}
```
## webpack.config.js

```javascript
const path = require('path');
const currentDir = __dirname;
const simpleDirName = currentDir.replace(/\\/g,'/').replace(/^.+\//, '');
module.exports = {
    extends: require.resolve('../../base-webpack.config.js'),
    output: {
        path: path.resolve(__dirname, "../../build/"+simpleDirName),
        filename: './bundle.js',
    },
}
```
# webpack
## コンパイルする場所にて(webpack)
npx webpack --mode development

## 全部をコンパイル(webpack)

トップディレクトリにて、
node ./build.js

### build.js

```javascript
const fs = require('fs');
const {glob} = require('glob');
const { execSync } = require('child_process');

const entries = glob.sync('./src/**/index.ts');
const absolutePath = fs.realpathSync('./');
const npxWebpack = "npx webpack --mode development"
const dirArr = [];
try{
    for(const _entry of entries){
        const directory = _entry.replace('src\\','').replace(/\\.*.ts$/,'');
        dirArr.push(directory);
    }
    dirArr.sort();
    for(const _dir of dirArr){
        console.log(_dir)
        const workingDir = absolutePath+'/src/'+_dir;
        process.chdir(workingDir);
        execSync(npxWebpack);
    }
    
}catch(e){
    throw e;
}
```

## buildされたbundle.js

buildディレクトリの下にソースディレクトリと同名のディレクトリを作り、webpackされたbundle.jsを格納される。



