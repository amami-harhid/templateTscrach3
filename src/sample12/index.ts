/**
 * Sample12
 * スプライト（CAT)を クリックした場所へ移動する
 */

import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample12】クリックした場所へ移動する"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
    this.Sound.load('../assets/Chill.wav', Chill);
    this.Image.load('../assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    cat = new Lib.Sprite("Cat");
    cat.Motion.gotoXY({x:0, y:0});
    cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    // ここはfunction式の中なので 【this】= P である
    // ここをアロー式にすると 【this】= window となる

    stage.Event.whenFlag(async function*( this:S3Stage ) {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 );
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    });
    stage.Event.whenClicked(function() {
        // アロー関数の中なので、【this】は 上の階層 の this = P である。
        const mousePosition = Lib.mousePosition;
        cat.Motion.gotoXY(mousePosition)
    });
    cat.Event.whenFlag(function( this:S3Sprite ){
        this.Motion.gotoXY({x:0, y:0});
    });
}