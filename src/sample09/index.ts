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
    $this.Sound.load('../assets/Cat.wav', Mya);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    cat = new Lib.Sprite( "Cat" );
    cat.Image.add( Cat );
}
const direction01 = 1;
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(this:S3Stage){
        // 『this』は Proxy(stage)である
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        while(true){
            await this.Sound.playUntilDone();
            yield;
        };
    });
    cat.Event.whenFlag(async function(this:S3Sprite){
        // 『this』は Proxy(cat)である
        await this.Sound.add( Mya );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
    });
    cat.Event.whenFlag( function(this:S3Sprite){
        // 初期化
        this.Motion.gotoXY({x:0, y:0});
        this.Motion.pointInDirection( 90 );
    });

    // { }の外側のスコープを参照できる
    const direction02 = 1;
    cat.Event.whenFlag( function*(this:S3Sprite) {
        while(true){
            this.Motion.turnRightDegrees(direction01+direction02);
            yield;
        }
    });
    cat.Event.whenClicked(function (this:S3Sprite) {
        this.Control.clone();
    });

    const catStep = 10;
    cat.Control.whenCloned( async function*(this:S3Sprite) {
        this.Looks.show();
        while(true){
            this.Motion.moveSteps(catStep);
            this.Motion.ifOnEdgeBounds();
            if(this.Sensing.isTouchingEdge() ){
                // ミャーと鳴く。
                this.Sound.play()
            }        
            yield;
        }
    });
}