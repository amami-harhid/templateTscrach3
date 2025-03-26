/**
 * Sample16
 * スプライト() : 回転方向⇒左右のみ回転 
 * スプライト（CAT2) : 回転方向⇒自由に回転  
 * スプライト（CAT3) : 回転方向⇒回転しない
 * 
 * 各スプライトはマウスポインターに向いて追いかける。
 * ５秒ごとに元の位置に戻る。
 */

import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample16】３匹のネコの回転方向を変える"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat1: S3Sprite;
let cat2: S3Sprite;
let cat3: S3Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: S3PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}

// 事前準備処理
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );

    // ネコ１を作る
    cat1 = new Lib.Sprite("Cat1");
    await cat1.Image.add( Cat );
    cat1.Motion.gotoXY({x:-Lib.stageWidth/4, y:+Lib.stageHeight/4 });
    cat1.Looks.setEffect(Lib.ImageEffective.COLOR, 50);
    cat1.Motion.setRotationStyle( Lib.RotationStyle.LEFT_RIGHT );

    // ネコ２を作る
    cat2 = new Lib.Sprite("Cat2");
    await cat2.Image.add( Cat );
    cat2.Motion.gotoXY({x:0, y:0 });

    // ネコ３を作る
    cat3 = new Lib.Sprite("Cat3");
    await cat3.Image.add( Cat );
    cat3.Motion.gotoXY({x:Lib.stageWidth /4, y:-Lib.stageHeight/4 });
    cat3.Looks.setEffect( Lib.ImageEffective.COLOR, 10);
    cat3.Motion.setRotationStyle( Lib.RotationStyle.DONT_ROTATE );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*( this: S3Stage ) {
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 );
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    // 待つ時間
    const WAIT_TIME = 5;//5秒
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function*( this: S3Stage ){
        // ずっと繰り返す
        for(;;){
            // 待つ
            await this.Control.wait(WAIT_TIME);
            // ネコ１：横、縦の位置を ステージの -1/4, +1/4 にする
            cat1.Motion.gotoXY({x:-Lib.stageWidth/4, y:+Lib.stageHeight/4 });
            // ネコ２：横、縦の位置を (0,0)にする
            cat2.Motion.gotoXY({x:0, y:0 });
            // ネコ３：横、縦の位置を ステージの +1/4, -1/4 にする
            cat3.Motion.gotoXY({x:Lib.stageWidth/4, y:-Lib.stageHeight/4 });
            yield;
        }
    });

    // 進む速さ
    const CAT_WALK_STEP = 2;
    // 旗が押されたときの動作(ネコ１)
    cat1.Event.whenFlag(async function*( this: S3Sprite ){
        // ずっと繰り返す
        for(;;){
            // マウスカーソルの位置へ向く
            this.Motion.pointToMouse();
            // 向きの方向へ進む
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ２)
    cat2.Event.whenFlag(async function*( this: S3Sprite ){
        // ずっと繰り返す
        for(;;){
            // マウスカーソルの位置へ向く
            this.Motion.pointToMouse();
            // 向きの方向へ進む
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ３)
    cat3.Event.whenFlag( async function*( this: S3Sprite ){
        // ずっと繰り返す
        for(;;){
            // マウスカーソルの位置へ向く
            this.Motion.pointToMouse();
            // 向きの方向へ進む
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });
}