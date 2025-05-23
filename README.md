# name
templateTscratch3

# Overview
template for TsScratch3

# Description

## スクリプト作成
srcディレクトリの下に サブディレクトリを作成し、サブディレクトリ内に index.ts を作成する
サブディレクトリの下には、次のファイルを用意する。

```
- scripts
 +- constants.ts
 +- index.ts
- index.html
```
### index.html
```html
<title>TscratchJsLibSample</title>
<meta charset='utf-8' />
<link rel='icon' href='data:,'>
<script type="module" src="scripts/index.ts"></script>
```
### constants.ts
```typescript
const Jurassic = 'Jurassic';
const Chill = 'Chill';
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";
export {Jurassic, Chill, AssetHost};
```
### index.ts
```typescript
/**
 * practice001
 * ネコが指定した色にさわったらスコアアップ
 */
import {Jurassic, Chill, AssetHost} from './scripts/constants';
import {Pg, Lib} from "@amami-harhid/tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
Pg.title = "タイトルを記述する";
Pg.preload = async function(this:S3PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic );
    this.Sound.load(AssetHost+"/assets/Chill.wav", Chill);
}
let stage:S3Stage; // ステージ変数を定義
Pg.prepare = async function() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
}


Pg.setting = async function() {
    stage.Event.whenFlag(async function*(this:S3Stage){
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield; // fps=30とするために少し待つ仕組み
        }
    })
}
```
## コンパイルとブラウザ表示
プロジェクトトップで実行する
```
node ./parceler.js [フォルダ名] --open

例： node ./parceler.js practice01 --open
これが実行される。
npx parcel src/practice01/index.html --open
⇒ コンパイルされた結果をOS規定のブラウザへ表示する
```
## ビルドする(後でブラウザ表示する)
プロジェクトトップで実行する
```
node ./parceler.js [フォルダ名] 

例： node ./parceler.js practice01
これが実行される。
npx parcel build src/practice01/index.html --public-url ./ --dist-dir ./build/practice01
⇒ build/practice01 へと ビルドされる。
⇒ LiveServerなどでブラウザに表示できる。
```
