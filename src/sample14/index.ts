/**
 * Sample14
 * スプライト（CAT) がマウスポインターを追いかける
 * マウスポインターがステージの外に出た最後の位置へ追いかける
 * 5秒経過したら 1秒かけて移動する！に切り替わる
 */

import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample14】マウスポインターを追いかける（５秒経過後『１秒間でマウスポインターの位置へ移動する』に変化する）"

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
    cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag( async function*( this:S3Stage ) {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        while(true){
            await this.Sound.playUntilDone();
            yield;            
        }
    });
    
    cat.Event.whenFlag( function( this: S3Sprite ){
        this.Motion.gotoXY({x:0, y:0});
    })

    // ms の値
    const ms1000 = 1000;
    const ms5000 = 5000;
    // 5秒経過した？
    let _5SecondsTimerOn = false;
    // ネコの速度
    const catStep = 5;

    cat.Event.whenFlag( async function(){
        _5SecondsTimerOn = false;
        await Lib.wait(ms1000+ms5000);
        _5SecondsTimerOn = true;
    });

    cat.Event.whenFlag( async function*( this:S3Sprite ){
        // 1秒待ってからマウスカーソルを追跡する
        await Lib.wait(ms1000);
        while(true){
            // マウスの方向へ向く
            this.Motion.pointToMouse();
            if(_5SecondsTimerOn){
                // 枠内にあった最後の場所
                const mousePosition = Lib.mousePosition;
                // マウスカーソルの場所へ1秒かけて移動する
                await this.Motion.glideToPosition( 1, mousePosition.x, mousePosition.y );
            }else{
                this.Motion.moveSteps(catStep);
            }
            yield;
        }
    });

}