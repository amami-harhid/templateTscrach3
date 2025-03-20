/**
 * Sample17
 * スプライト（CROSS) : 右側に回転 、マウスポインターに触れたら 蝶のクローンを作る（クローンの位置はマウスポインターの位置）
 * スプライト（butterfly) : 非表示、クローンされたら表示に切り替える、クローンは指定した時間数（ﾐﾘ秒）だけ生きている。
 * 
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample17】十字にマウスポインターが触れたら 蝶のクローンを作る"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cross01:string = "Cross01";
const Cross02:string = "Cross02";
const Butterfly01:string = "Butterfly01";
const Butterfly02:string = "Butterfly02";

let stage: S3Stage;
let cross: S3Sprite;
let butterfly: S3Sprite;

Pg.preload = async function(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic );
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill );
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cross1.svg', Cross01 );
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cross2.svg', Cross02 );
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/butterfly1.svg', Butterfly01 );
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/butterfly2.svg', Butterfly02 );
}
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );

    cross = new Lib.Sprite("Cross");
    await cross.Image.add( Cross01 );
    await cross.Image.add( Cross02 );
    cross.Looks.setSize({x:300,y:300});

    butterfly = new Lib.Sprite("Butterfly");
    await butterfly.Image.add( Butterfly01 );
    await butterfly.Image.add( Butterfly02 );
    butterfly.Looks.hide();
}
Pg.setting = async function() {

    stage.Event.whenFlag( async function*( this:S3Stage ) {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20 )
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    });

    const ChangeDirection = 1;
    cross.Event.whenFlag( async function*( this: S3Sprite ){
        while(true){
            this.Motion.turnRightDegrees(ChangeDirection);
            yield;
        }
    });
    cross.Event.whenFlag( async function*( this: S3Sprite ){
        while(true){
            if ( this.Sensing.isMouseTouching() ) {
                this.Looks.nextCostume();
                await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching());
                this.Looks.nextCostume();
            }
            yield;
        }
    });
    cross.Event.whenFlag(async function*( this: S3Sprite ){
        const self:S3Sprite = this;
        while(true){
            if ( self.Sensing.isMouseTouching() ) {
                const mousePosition = Lib.mousePosition;
                butterfly.Motion.gotoXY(mousePosition);
                const scale = {x: 15, y: 15}
                butterfly.Looks.setSize(scale);
                butterfly.Motion.pointInDirection(Lib.randomDirection);
                await butterfly.Control.clone();
                // 下をコメントアウトすると、十字にさわっている間は クローンを作り続ける
                // 下を生かすと、十字に触ったときにクローンを作るが、次には進まない
                //await Libs.waitUntil( this.isNotMouseTouching, this); // 「マウスポインターが触らない」迄待つ。
                await butterfly.Control.wait(0.01); // 100ミリ秒待つ。 <== クローン発生する間隔
            }
            yield;
        }
    });
    butterfly.Control.whenCloned( async function*( this: S3Sprite ) {
        const clone = this;
        while(true){
            if(clone.life > 0 ){
                this.Looks.nextCostume();
                await clone.Control.wait(0.05);    
            }else{
                break;
            }
            yield;
        }
    });
    butterfly.Control.whenCloned( async function*( this: S3Sprite ) {
        const clone = this;
        clone.Looks.show();
        clone.life = 5000; // ミリ秒。クローンが生きている時間。（およその時間）
        while(true){
            // ランダムな場所
            const randomPoint = Lib.randomPoint;
            // １秒でどこかに行く。
            await this.Motion.glideToPosition(5, randomPoint.x, randomPoint.y);
            // ライフがゼロになったら「繰り返し」を抜ける
            if( this.life < 0) {
                break;
            }        
            yield;
        }
        clone.Control.remove();
    });
}