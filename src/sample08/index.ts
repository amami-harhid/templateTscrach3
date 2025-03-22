/**
 * Sample08
 * スプライトを 動かす( 端に触れたら ミャーと鳴く)
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample08】スプライトが動き、端に触れたらミャーと鳴く";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Mya: string = "Mya";
const Cat1:string = "Cat1";
const Cat2:string = "Cat2";
const SpriteCatName:string = "cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat1);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat2.svg', Cat2);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Cat.wav', Mya);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat1 );
    await cat.Image.add( Cat2 );
    // 位置の初期化
    cat.Motion.gotoXY({x:0, y:0});
    // 向きの初期化
    cat.Motion.pointInDirection( 40 );
}
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*(this:S3Stage){
        // ここでの『this』は P であるので、this.sounds は P.soundsと同じである。 
        // stageのインスタンスは 『stage』の変数で受け取っている。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
        // ずっと繰り返す
        for(;;){
            // ＢＧＭを鳴らし続ける（終わるまで待つ）
            await this.Sound.playUntilDone();
            yield;
        }
    });

    // 旗が押される前の動作(ネコ)
    cat.Event.whenRightNow( async function(this:S3Sprite){
        console.log('cat.Event.whenRightNow'); // <--- whenRightNow が動かなくなっている？
        // 位置の初期化
        this.Motion.gotoXY({x:0, y:0});
        // 向きの初期化
        this.Motion.pointInDirection( 40 );
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:S3Sprite){
        // ずっと繰り返す
        for(;;){
            // 次のコスチュームに切り替える
            this.Looks.nextCostume();
            // ０．１秒待つ
            await this.Control.wait(0.1);
            yield;
        }
    });

    // ネコが進む速さ
    const catStep = 5;
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:S3Sprite){
        await this.Sound.add( Mya );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと「左右」に動く。端に触れたら跳ね返る。
        for(;;){
            // ネコが進む
            this.Motion.moveSteps(catStep);
            // もし端に触れたら跳ね返る
            this.Motion.ifOnEdgeBounds();
            // もし端に触れていたら
            if(this.Sensing.isTouchingEdge()){
                // ネコの音を鳴らす
                this.Sound.play();
            }
            yield;
        }
    });

}