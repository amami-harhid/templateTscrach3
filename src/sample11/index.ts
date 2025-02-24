/**
 * Sample11
 * スプライト（CAT)を １秒で「どこかの」場所へ移動する
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample11】１秒で「どこかの」場所へ移動する"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload($this: S3PlayGround) {
    $this.Image.load('../assets/Jurassic.svg', Jurassic);
    $this.Sound.load('../assets/Chill.wav', Chill);
    $this.Image.load('../assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    cat = new Lib.Sprite("Cat");
    cat.Motion.gotoXY({x:0, y:0});
    cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function( $stage:S3Stage ) {
        $stage.Sound.add( Chill );
        $stage.Sound.setOption( Lib.SoundOption.VOLUME, 50);
    });

    stage.Event.whenFlag(async function( $stage:S3Stage ) {
        $stage.Control.forever(async _=>{
            await $stage.Sound.playUntilDone();
        });
    });
    cat.Event.whenFlag(async function( $cat:S3Sprite ) {
        $cat.Control.forever(async _=>{
            // 繰り返すごとに 1秒待つ
            await Lib.wait(1000);
            // １秒でどこかへ行く
            const randomPoint = Lib.randomPoint;
            await $cat.Motion.glideToPosition(1,  randomPoint.x, randomPoint.y);
        })
    });
}