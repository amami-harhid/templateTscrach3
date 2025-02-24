/**
 * Sample09 スプライトをクリックしたらクローンを作る。
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample09】スプライトをクリックしたらクローンを作る。端に触れたらミャーとないて折り返す。";

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
    cat = new Lib.Sprite( "Cat" );
    cat.Image.add( Cat );
}
const direction01 = 1;
Pg.setting = async function setting() {

    stage.Event.whenFlag(function($stage:S3Stage){
        // function(){} と書くとき、『this』は Proxy(stage)である
        $stage.Sound.add( Chill );
        $stage.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        $stage.Control.forever( async _=>{
            await $stage.Sound.playUntilDone();
        })
    });
    cat.Event.whenFlag(function($cat:S3Sprite){
        // function(){} と書くとき、『this』は Proxy(cat)である
        $cat.Sound.add( Mya );
        $cat.Sound.setOption( Lib.SoundOption.VOLUME, 20);
    });
    cat.Event.whenFlag( async ($cat:S3Sprite)=> {
        // 初期化
        $cat.Motion.gotoXY({x:0, y:0});
        $cat.Motion.pointInDirection( 90 );
    });

    // { }の外側のスコープを参照できる
    const direction02 = 1;
    cat.Event.whenFlag( async function($cat:S3Sprite) {
        $cat.Control.forever( _=>{
            $cat.Motion.turnRightDegrees(direction01+direction02);
        });
    });
    cat.Event.whenClicked(async function ($cat:S3Sprite) {
        $cat.Control.clone();
    });

    const catStep = 10;
    cat.Control.whenCloned( async function($cat:S3Sprite) {
        $cat.Looks.show();
        $cat.Control.forever( _=>{
            $cat.Motion.moveSteps(catStep);
            $cat.Motion.ifOnEdgeBounds();
            if($cat.Sensing.isTouchingEdge() ){
                // ミャーと鳴く。
                $cat.Sound.play()
            }        
        });
    });
}