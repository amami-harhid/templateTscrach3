/**
 * Sample05 旗クリックでスプライトを表示する
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample05】旗クリックでスプライトを表示する";

const Jurassic = "Jurassic";
const Cat = "Cat";
const SpriteCatName = "cat";

let stage: S3Stage;
let cat: S3Sprite;

// 事前ロード処理
Pg.preload = function(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
}
// イベント定義処理
Pg.setting = function() {
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function() {
        // ネコのスプライトを作る。
        cat = new Lib.Sprite( SpriteCatName );
    });
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function(){
        // コスチュームを１個登録する
        // whenFlagを定義した順番に実行されるので、
        // ここの『旗クリック』の処理ではネコのスプライトは
        // 作成済である。
        // 本来は同じタイミングで実行する方が分かりやすい
        // のだが、実験的に２箇所に分けている
        await cat.Image.add( Cat );
    });
};