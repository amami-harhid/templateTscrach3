/**
 * Sample07 スプライトを左右に動かす。端に触れたら跳ね返る
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample07】スプライトが横向きに動き、端に触れたら跳ね返る";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";
const SpriteCatName:string = "cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill);
    await stage.Sound.setOption( Lib.SoundOption.VOLUME, 100);
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    // フラグクリック
    stage.Event.whenFlag( async function*(this:S3Stage){
        // 「終わるまで音を鳴らす」をずっと繰り返す、スレッドを起動する
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    });

    cat.Event.whenBroadcastReceived('Start', async function(this:S3Sprite){
        this.Motion.setXY({x:0, y:0});
    })

    const catStep = 5;
    // フラグクリック
    cat.Event.whenFlag( async function(this:S3Sprite){
        // 初期化
        this.Motion.gotoXY({x:0, y:0});
        this.Motion.pointInDirection( 90 );
    });

    cat.Event.whenFlag( async function*(this:S3Sprite){
        // 「左右」に動く。端に触れたら跳ね返る。
        while(true){
            this.Motion.moveSteps(catStep);
            this.Motion.ifOnEdgeBounds();
            yield;
        }
    });
}