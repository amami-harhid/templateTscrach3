# name

samplesTsScratch3

# Overview
A collection of samples written in TypeScript for using scratch3LikeJsLib.

# how to use (使い方)

## Motion (動き)

#### Move () Steps ( 〇 歩動かす )
```typescript
Sprite.Motion.moveSteps( step : number );
```
#### Turn Right () degrees ( 右方向へ 〇度回す )

```typescript
Sprite.Motion.turnRightDegrees( degree : number );
```

#### Turn Left () degrees ( 左方向へ 〇度回す )

```typescript
Sprite.Motion.turnLeftDegrees( degree : number );
```

#### Go to randam position ( どこかの場所へ行く )

```typescript
Sprite.Motion.gotoRandomPosition();
```

#### Go to mouse position ( マウスのポインターへ行く)

```typescript
Sprite.Motion.gotoMousePosition();
```

#### Go to other sprite position ( スプライトの場所へ行く )

```typescript
Sprite.Motion.gotoSprite( otherSprite: S3Sprite );
```

#### Go to x:(), y:()  ( x座標を〇、y座標を〇にする )

```typescript
Sprite.Motion.gotoXY( x: number, y: number );
```

```typescript
Sprite.Motion.moveXY( x: number, y: number );
```

```typescript
Sprite.Motion.setXY( x: number, y: number );
```

#### Glide ()secs to x:(), y:() ( 〇秒で x:〇,y:〇の場所へ行く)

```typescript
await Sprite.Motion.glideToPosition(secs:number, x:number, y:number);
```

#### Glide ()secs to random position ( 〇秒でどこかの場所へ行く)

```typescript
const secs = 1.0; // 1秒
const randomPoint = Lib.randomPoint;
await Sprite.Motion.glideToPosition(secs, randomPoint.x, randomPoint.y);
```

#### Glide ()secs to mouse pointer ( 〇秒でマウスのポインターへ行く)

```typescript
const secs = 1.0; // 1秒
const mousePosition = Lib.mousePosition;
await Sprite.Motion.glideToPosition(secs, mousePosition.x, mousePosition.y);
```

#### Point in derection() ( 〇度に向ける )

```typescript
Sprite.Motion.pointInDerection( degree: number );
```

#### Point towards mouse pointer ( マウスポインターへ向ける)

```typescript
Sprite.Motion.pointToMouse();
```

#### Point towards other sprite ( 他のスプライトへ向ける)

```typescript
Sprite.Motion.pointToTarget( otherSprite: S3Sprite );
```

#### Change x by ()  ( x座標を〇ずつ変える )

```typescript
Sprite.Motion.changeX( x: number);
```

#### Set x to ()  ( x座標を 〇にする )

```typescript
Sprite.Motion.setX( x: number );
```

#### Change y by ()  ( y座標を〇ずつ変える )

```typescript
Sprite.Motion.changeY( y: number);
```

#### Set y to ()  ( y座標を 〇にする )

```typescript
Sprite.Motion.setY( y: number );
```

#### If on edge, bounce  (もし端についたら跳ね返る)

```typescript
Sprite.Motion.ifOnEdgeBounds();
```

#### Set rotation style ()  ( 回転方法を〇にする )

```typescript
// 左右のみ
Sprite.Motion.setRotationStyle( Lib.RotationStyle.LEFT_RIGHT );
// 回転しない
Sprite.Motion.setRotationStyle( Lib.RotationStyle.DONT_ROTATE );
// 自由に回転
Sprite.Motion.setRotationStyle( Lib.RotationStyle.ALL_AROUND );
```

#### x position ( x座標 )

```typescript
const {x} = Sprite.Motion.getCurrentPosition();
```

#### y position ( y座標 )

```typescript
const {y} = Sprite.Motion.getCurrentPosition();
```

#### derection  ( 向き )

```typescript
const derection = Sprite.Motion.getCurrentDirection();
```

## Looks ( 見た目 )

#### Say () for () seconds ( ◎◎と〇秒言う )

```typescript
await Sprite.Looks.sayForSecs( text: string, secs: number);
```
```typescript
const scale = {w: 60, h:60};
await Sprite.Looks.sayForSecs( text: string, secs: number, {scale: scale} );
```
#### Say ()  ( ◎◎と言う )
```typescript
Sprite.Looks.say( text: string );
```
```typescript
const scale = {w: 60, h:60};
await Sprite.Looks.say( text: string, {scale: scale} );
```

#### Think () for () seconds ( ◎◎と〇秒考える )

```typescript
await Sprite.Looks.thinkForSecs( text: string, secs: number);
```
```typescript
const scale = {w: 60, h:60};
await Sprite.Looks.thinkForSecs( text: string, secs: number, {scale: scale} );
```
#### Think ()  ( ◎◎と考える )
```typescript
Sprite.Looks.think( text: string );
```
```typescript
const scale = {w: 60, h:60};
await Sprite.Looks.think( text: string, {scale: scale} );
```
#### Switch costume to ()  (コスチュームを〇にする)

```typescript
Sprite.Looks.switchCostume( constumeName: string );
```

#### Next costume  (次のコスチュームにする)

```typescript
Sprite.Looks.nextCostume();
```
#### Switch background to ()  ( 背景を〇にする ) 【工事中】

```typescript
Sprite.Looks.switchBackground( backgroundName: string );
```
#### Next background  (次の背景にする)【工事中】

```typescript
Sprite.Looks.nextBackground();
```
#### Change size by ()  ( 大きさを 〇ずつ変える)

```typescript
const size = {w: 10, h:10};
Sprite.Looks.changeSizeBy( size );
```
#### Set size to ()  ( 大きさを 〇%にする)

```typescript
const size = {w: 200, h:200};
Sprite.Looks.setSize( size );
```

#### Change () effect by ()  ( 画像の効果を〇ずつ変える )

```typescript
// 色の効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.COLOR, 10 ); 
```
```typescript
// 魚眼レンズの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.FISHEYE, 10 );
```
```typescript
// 渦巻きの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.WHIRL, 10 );
```
```typescript
// ピクセル化の効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.PIXELATE, 10 );
```
```typescript
// モザイクの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.MOSAIC, 10 );
```
```typescript
// モザイクの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.MOSAIC, 10 );
```
```typescript
// 明るさの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.BRIGHTNESS, 10 );
```
```typescript
// 幽霊の効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.GHOST, 10 );
```
#### Set () effect to ()  ( 画像の効果を〇にする )
```typescript
// 幽霊の効果
Sprite.Looks.setEffect( Lib.ImageEffective.GHOST, 100 );
// 他の効果は前述changeEffectBy()のとおりです
```
#### Clear graphic effects  ( 画像効果をなくす )
```typescript
Sprite.Looks.clearEffects();
```

#### Show  ( 表示する )
```typescript
Sprite.Looks.show();
```
#### Hide  ( 隠す )
```typescript
Sprite.Looks.hide();
```

#### Go to front  ( 最前面に移動する )
```typescript
Sprite.Looks.goToFront();
```
#### Go to back  ( 最背面に移動する )
```typescript
Sprite.Looks.goToBack();
```
#### Go forward () layers  ( 〇階層 手前に出す )
```typescript
Sprite.Looks.goForwardLayers( layer: number );
```
#### Go backward () layers  ( 〇階層 奥に下げる )
```typescript
Sprite.Looks.goBackwardLayers( layer: number );
```








# Requirement

- Node ( > v18)
- EsLinker
- @eslint/js, 
- @types/node
- eslint
- glob
- globals
- ts-loader
- typescript
- typescript-eslint
- webpack-cli

# Features

Assisting with JavaScript(TypeScript) programming in the style of Scratch 3.

# Usage

npm install https://github.com/amami-harhid/tscratch3likejs.git --save-dev 

npm install @eslint/js @types/node eslint glob globals ts-loader typescript typescript-eslint webpack-cli --save-dev

# samples

[一覧ページ](https://amami-harhid.github.io/samplesTsScratch3/src/)

# Description

srcディレクトリの下に サブディレクトリを作成し、サブディレクトリ内に index.ts を作成する
サブディレクトリの下には、次のファイルを用意する。

- index.html
- index.ts
- tsconfig.json
- webpack.config.js

## index.html
```html
<title>TscratchJsLibSample</title>
<meta charset="utf-8" />
<link rel="icon" href="data:,">
<script src="../common/scriptLoader.js"></script>
```
## index.ts
```typescript
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
Pg.title = "[description]"
// 画像名
const Jurassic = "Jurassic";
// Stage変数
let stage:S3Stage;
// プレロード部
Pg.preload = function(this:S3PlayGround) {
    // イメージのロード
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
}
// プリペア部
Pg.prepare = async function() {
    // ステージインスタンス作成
    stage = new Lib.Stage();
    // イメージの設定
    await stage.Image.add( Jurassic );
}
Pg.setting = function() {
    // ここでイベントを記述する
};
```
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
## webpack
### コンパイルする場所にて(webpack)
npx webpack --mode development

### 全部をコンパイル(webpack)

トップディレクトリにて、
node ./build.js

#### build.js

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

### buildされたbundle.js

buildディレクトリの下にソースディレクトリと同名のディレクトリを作り、webpackされたbundle.jsを格納される。

# Author

amami-harhid

# Licence

[AGPL-3](https://www.gnu.org/licenses/agpl-3.0.en.html)

