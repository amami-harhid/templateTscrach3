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

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    cat1 = new Lib.Sprite("Cat1");
    await cat1.Image.add( Cat );
    cat1.Motion.gotoXY({x:-Lib.stageWidth/4, y:+Lib.stageHeight/4 });
    cat1.Looks.setEffect(Lib.ImageEffective.COLOR, 50);
    cat1.Motion.setRotationStyle( Lib.RotationStyle.LEFT_RIGHT );

    cat2 = new Lib.Sprite("Cat2");
    await cat2.Image.add( Cat );
    cat2.Motion.gotoXY({x:0, y:0 });

    cat3 = new Lib.Sprite("Cat3");
    await cat3.Image.add( Cat );
    cat3.Motion.gotoXY({x:Lib.stageWidth /4, y:-Lib.stageHeight/4 });
    cat3.Looks.setEffect( Lib.ImageEffective.COLOR, 10);
    cat3.Motion.setRotationStyle( Lib.RotationStyle.DONT_ROTATE );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*( this: S3Stage ) {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 )
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    });
    const WAIT_TIME = 5;//5秒
    stage.Event.whenFlag( async function*( this: S3Stage ){
        while(true){
            await this.Control.wait(WAIT_TIME);
            cat1.Motion.gotoXY({x:-Lib.stageWidth/4, y:+Lib.stageHeight/4 });
            cat2.Motion.gotoXY({x:0, y:0 });
            cat3.Motion.gotoXY({x:Lib.stageWidth/4, y:-Lib.stageHeight/4 });
            yield;
        }
    });

    const CAT_WALK_STEP = 2;
    cat1.Event.whenFlag(async function*( this: S3Sprite ){
        while(true){
            this.Motion.pointToMouse();
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });

    cat2.Event.whenFlag(async function*( this: S3Sprite ){
        while(true){
            this.Motion.pointToMouse();
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });

    cat3.Event.whenFlag( async function*( this: S3Sprite ){
        while(true){
            this.Motion.pointToMouse();
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });
}