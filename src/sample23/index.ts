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
const Block:string = "Block";
const Line:string = "Line";
const Pew: string = "Pew";

let stage: S3Stage;
let ball: S3Sprite, paddle: S3Sprite, block:S3Sprite, line:S3Sprite;

let score = 0;

Pg.preload = async function preload($this:S3PlayGround) {
    $this.Image.load('../assets/Neon Tunnel.png', NeonTunnel );
    $this.Sound.load('../assets/Chill.wav', Chill );
    $this.Image.load('../assets/ball-a.svg', BallA );
    $this.Image.load('../assets/paddle.svg', Paddle );
    $this.Image.load('../assets/button3-b.svg', Block );
    $this.Image.load('../assets/line.svg', Line );
    $this.Sound.load('../assets/Pew.wav', Pew);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( NeonTunnel );
    ball = new Lib.Sprite("cat");
    ball.Image.add( BallA );
    ball.Motion.setY(-100);
    ball.Looks.setSize(50, 50);
    paddle = new Lib.Sprite("paddle");
    paddle.Image.add( Paddle );
    paddle.Motion.setXY(0, -140);
    block = new Lib.Sprite( "block");
    block.Image.add( Block );
    block.Looks.setSize({x:50, y:50});
    block.Motion.setXY(-220,180);
    block.Looks.hide();
    line = new Lib.Sprite( "line" );
    line.Image.add( Line );
    line.Motion.setXY(0, -170);
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
    const InitDirection = 25;
    ball.Event.whenFlag( async function($this:S3Sprite){
        $this.Motion.pointInDirection(InitDirection);
        await $this.Control.waitUntil(()=>Lib.anyKeyIsDown());
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
        $this.Control.forever(async ()=>{
            if($this.Sensing.isTouchingTarget(paddle)){
                $this.Motion.turnRightDegrees( Lib.getRandomValueInRange(-40, 40)+180 );
                $this.Motion.moveSteps(BallSpeed);
                await Lib.wait(0.5 * 1000);
            }
        });
    });
    line.Event.whenFlag(async function($this:S3Sprite){
        $this.Control.forever(async ()=>{
            if( $this.Sensing.isTouchingTarget(ball)){
                // Ball に触れたとき
                Pg.Control.stopAll();
            }
        });
    });
    paddle.Event.whenFlag(async function($this: S3Sprite){
        $this.Control.forever(async ()=>{
            const mousePos = Lib.mousePosition;
            const selfPosition = $this.Motion.getCurrentPosition();
            $this.Motion.moveTo(mousePos.x, selfPosition.y);
        });

    });
    block.Event.whenFlag(async ($this:S3Sprite)=>{      
        await $this.Sound.add(Pew);
        const pos = $this.Motion.getCurrentPosition();
        // Size変更した直後のdrawingDimensionsは変更適用後を取得できない
        // これはバグかも。--> スレッド１回ループしたら適用されるっぽい。
        // Size変更時は update() をかけるべきかも。
        const demension = $this.Looks.drawingDimensions();
        let y=0;
        $this.Control.repeat(5, ()=>{
            let x=0;
            $this.Control.repeat(10, ()=>{
                const blkPos = { x: pos.x + x*demension.width, y: pos.y + (-y)*demension.height };
                $this.Control.clone({position: blkPos});
                x+=1;
            });
            y+=1;
        })
    });
    block.Control.whenCloned(async ($this:S3Sprite)=>{
        $this.Looks.show();
        await $this.Control.forever(async ()=>{
            if($this.Sensing.isTouchingTarget(ball)){
                score += 1;
                console.log('Touching score='+score);
                $this.Sound.play();
                $this.Looks.hide();
                Lib.Loop.break();
            }    
        })
        //await Lib.wait(0.5*1000);
        $this.Control.remove();
    })

}