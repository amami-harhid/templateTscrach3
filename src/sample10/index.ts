/**
 * Sample10
 * スプライトのクローンを作る（スプライトに触ったらクローンを作る）
 * クローンされたら動きだす（端に触れたらミャーとないて折り返す）
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample10】スプライトに触ったらクローンを作る(5秒で死ぬ)";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";
const Mya:string = "Mya";

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
    cat.Motion.gotoXY({x:200, y:150});
    cat.Motion.pointInDirection( 90 );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function($stage:S3Stage) {
        $stage.Sound.add( Chill, { 'volume' : 50 } );
    });
    stage.Event.whenFlag(async function($stage) {
        $stage.Control.forever(async _=>{
            await $stage.Sound.playUntilDone();
        })
    });

    cat.Event.whenFlag( async function($cat:S3Sprite) {
        // 音を登録する
        $cat.Sound.add( Mya, { 'volume' : 20 } );
    });
    cat.Event.whenFlag( async ($cat:S3Sprite)=> {
        // 初期化
        $cat.Motion.gotoXY({x:200, y:150});
        $cat.Motion.pointInDirection( 90 );
    });

    const _changeDirection = 1;
    cat.Event.whenFlag( async function($cat:S3Sprite) {
        // ずっと繰り返して回転する
        $cat.Control.forever( _=>{
            $cat.Motion.turnRightDegrees(_changeDirection);// 外側Scope 参照可能
        });
    });
    cat.Event.whenFlag( async function($cat:S3Sprite) {
        // 次をずっと繰り返す
        // マウスカーソルでタッチしたら、クローンを作る
        $cat.Control.forever(async _=>{
            if( $cat.Sensing.isMouseTouching() ) {
                $cat.Control.clone();
            }
            // マウスタッチしないまで待つ
            await Lib.waitWhile( ()=>$cat.Sensing.isMouseTouching() ); 
        });
    });

    const steps = 10;
    cat.Control.whenCloned(async function(clone:S3Sprite){
        clone.Motion.gotoXY({x:100, y:-100});
        clone.Looks.setSize({x:50, y:50});
        clone.Looks.setEffect(Lib.Looks.COLOR, 50);
        clone.life = 5000;
        clone.Looks.show();
        // ずっと繰り返す
        clone.Control.forever( _=>{
            clone.Motion.moveSteps( steps );
            // 端に触れたら
            clone.Motion.ifOnEdgeBounds();
            if(clone.Sensing.isTouchingEdge() ){
                // ミャーと鳴く。
                clone.Sound.play()
            }
        });
    });
}