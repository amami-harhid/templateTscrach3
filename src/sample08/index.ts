/**
 * Sample08
 * スプライトを 動かす( 端に触れたら ミャーと鳴く)
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample08】スプライトが動き、端に触れたらミャーと鳴く";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Mya: string = "Mya";
const Cat:string = "Cat";
const SpriteCatName:string = "cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload($this: S3PlayGround) {
    $this.Image.load('../assets/Jurassic.svg', Jurassic);
    $this.Sound.load('../assets/Chill.wav', Chill);
    $this.Image.load('../assets/cat.svg', Cat);
    $this.Sound.load('../assets/Cat.wav', Mya);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    cat = new Lib.Sprite( SpriteCatName );
    cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async $stage=>{
        // ここでの『this』は P であるので、this.sounds は P.soundsと同じである。 
        // stageのインスタンスは 『stage』の変数で受け取っている。
        await $stage.Sound.add( Chill, { 'volume' : 50 } );
        await $stage.C.forever(async _=>{
            // ＢＧＭを鳴らし続ける（終わるまで待つ）
            await $stage.Sound.playUntilDone();
        })
    });

    const catStep = 10;

    cat.Event.whenFlag( async _cat=>{
        _cat.Sound.add( Mya, { 'volume' : 50 } );
    });
    
    cat.Event.whenFlag( async (_cat:S3Sprite)=> {
        // 初期化
        _cat.Motion.gotoXY({x:0, y:0});
        _cat.Motion.pointInDirection( 90 );
    });

    cat.Event.whenFlag( async (_cat:S3Sprite)=>{
        // ずっと「左右」に動く。端に触れたら跳ね返る。
        _cat.Control.forever( _=> {
            _cat.Motion.moveSteps(catStep);
            _cat.Motion.ifOnEdgeBounds();
            if(_cat.Sensing.isTouchingEdge()){
                _cat.Sound.play();
            }
        });
    });


}