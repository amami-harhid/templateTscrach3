/**
 * Sample18
 * 
 * キーボード操作
 * 左矢印、右矢印で、シップが左右に動く。
 * スペースキーで 弾を発射（発射する弾はクローン）
 */

import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample18】左右矢印でシップが左右に動き、スペースキーで弾を発射。"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cross01:string = "Cross01";
const Cross02:string = "Cross02";
const Pew:string = "Pew";

let stage: S3Stage;
let cross: S3Sprite;

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic );
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill );
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cross1.svg', Cross01 );
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cross2.svg', Cross02 );
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Pew.wav', Pew );
}

Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );

    cross = new Lib.Sprite("Cross");
    cross.Motion.setY(-Lib.stageHeight/2 * 0.6); 
    await cross.Image.add( Cross01 );
    await cross.Image.add( Cross02 );
    cross.Looks.setSize({x:100,y:100});

}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*( this: S3Stage) {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 );
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    });

    cross.Event.whenFlag(async function( this: S3Sprite ){
        await this.Sound.add( Pew );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 10 );
        await this.Sound.setOption( Lib.SoundOption.PITCH, 150 );
    });

    const MoveSteps = 15;
    cross.Event.whenFlag( async function*( this: S3Sprite ){
        this.Motion.pointInDirection( 90 );
        while(true){
            if(Lib.keyIsDown('RightArrow')){
                this.Motion.moveSteps(MoveSteps);
            }
            if(Lib.keyIsDown('LeftArrow')){
                this.Motion.moveSteps(-MoveSteps);
            }
            yield;
        }
    });
    cross.Event.whenFlag( async function*( this: S3Sprite ){
        while(true){
            // 矢印キーを押しながら、スペースキーを検知させたい
            if(Lib.keyIsDown('Space')){
                this.Sound.play();
                const options = {scale:{x:20,y:20}, direction:0}
                await this.Control.clone(options);
                //次をコメントアウトしているときは キー押下中連続してクローン作る  
                //await this.Control.waitWhile( ()=>Libs.keyIsDown('Space'));
            }
            yield;
        }
    });
    cross.Control.whenCloned( async function( this: S3Sprite ){
        const clone = this;
        const {height} = clone.Looks.drawingDimensions();
        clone.Motion.changeY( height / 2);
        clone.Looks.nextCostume();
        clone.Looks.show();
    });
    cross.Control.whenCloned( async function*( this: S3Sprite ) {
        // while の後に処理があるときは await 忘れないようにしましょう
        const clone = this;
        while(true){
            clone.Motion.changeY(+10); // 10だけ上にする
            if(clone.Sensing.isTouchingEdge()){
                break;
            }
            yield;
        }
        clone.Control.remove();
    });
    const TURN_RIGHT_DEGREE= 25;
    cross.Control.whenCloned( async function*( this: S3Sprite ) {
        const clone = this;
        // while の後に処理があるときは await 忘れないようにしましょう
        await clone.Sound.setOption( Lib.SoundOption.VOLUME, 100 );
        await clone.Sound.setOption( Lib.SoundOption.PITCH, 90 );
        while(true){
            clone.Motion.turnRightDegrees(TURN_RIGHT_DEGREE);
            if(clone.Sensing.isTouchingEdge()){
                clone.Sound.play();
                await this.Control.wait(0.5); //0.5秒待つ
                break;
            }
            yield;
        }
        clone.Control.remove();
    });
}