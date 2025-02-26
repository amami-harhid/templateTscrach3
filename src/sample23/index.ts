/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample23】ボールがパドルに触れたら跳ね返る"

const NeonTunnel:string = "NeonTunnel";
const Chill:string = "Chill";
const BallA:string = "BallA";
const Paddle:string = "Paddle";

let stage: S3Stage;
let ball: S3Sprite, paddle: S3Sprite;

let score = 0;

/**
 * 【課題】
 * ball のコスチュームにすると 端に触れたときに動きが止まりがち
 * これはバグである
 */

Pg.preload = async function preload($this:S3PlayGround) {
    $this.Image.load('../assets/Neon Tunnel.png', NeonTunnel );
    $this.Sound.load('../assets/Chill.wav', Chill );
    $this.Image.load('../assets/ball-a.svg', BallA );
    $this.Image.load('../assets/paddle.svg', Paddle );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( NeonTunnel );
    ball = new Lib.Sprite("Cat");
    ball.Image.add( BallA );
    paddle = new Lib.Sprite("Paddle");
    paddle.Image.add( Paddle );
    paddle.Looks.hide();
}

Pg.setting = async function setting() {

    stage.Event.whenFlag(async function($this:S3Stage){
        await $this.Sound.add( Chill );
        $this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        await $this.Control.while(true, async ()=>{
            await $this.Sound.playUntilDone();
        });
    })
    const BallSpeed = 10;
    ball.Event.whenFlag( async function($this:S3Sprite){
        $this.Motion.pointInDirection(40);
        $this.Control.forever(async ()=>{
            $this.Motion.moveSteps(BallSpeed);
            $this.Motion.ifOnEdgeBounds();
            if($this.Sensing.isTouchingEdge()){
                const randomDegree = Lib.getRandomValueInRange(-15, 15);
                $this.Motion.turnRightDegrees(randomDegree);    
            }
        });
    });
    ball.Event.whenFlag( async function($this:S3Sprite){
        score = 0;
        $this.Event.whenBroadcastReceived("TOUCH",()=>{
            score += 1;
            const randomDegree = Lib.getRandomValueInRange(150, 200);
            $this.Motion.turnRightDegrees(randomDegree);
        });
    });

    paddle.Event.whenFlag( async function($this:S3Sprite){       
        $this.Control.forever(async ()=>{
            $this.Control.clone();
            await Lib.wait(2*1000);
        });
    });
    paddle.Control.whenCloned(async function($clone: S3Sprite){
        $clone.Motion.gotoRandomPosition();
        $clone.Looks.show();
        $clone.Control.forever(async ()=>{
            if( $clone.Sensing.ifTouchingTarget(ball)){
                $clone.Event.broadcast('TOUCH');
                $clone.Control.remove();
            }
        });

    });
    

}