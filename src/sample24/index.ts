/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";


Pg.title = "【Sample24】上に10回、下に10回移動を繰り返す"

const NeonTunnel:string = "NeonTunnel";
const Chill:string = "Chill";
const BallA:string = "BallA";

let stage: S3Stage;
let ball: S3Sprite

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('../assets/Neon Tunnel.png', NeonTunnel );
    this.Sound.load('../assets/Chill.wav', Chill );
    this.Image.load('../assets/ball-a.svg', BallA );
}
Pg.prepare = async function prepare() {

    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( NeonTunnel );

    // スプライト(ball)を作る
    ball = new Lib.Sprite("ball");
    // コスチュームを追加
    await ball.Image.add( BallA );
    // 大きさを 横120%,縦120% にする
    ball.Looks.setSize(120, 120);
}

Pg.setting = async function setting() {

    stage.Event.whenFlag(async function(this:S3Stage){
        // Chill を追加
        await this.Sound.add( Chill );
        // 音量を 5にする
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        await this.Control.wait(1);
        this.Event.broadcast('START');
    });
    stage.Event.whenBroadcastReceived('START', async function*(this:S3Stage){

        // ずっと繰り返す
        for(;;){
            // 終わるまで鳴らす
            await this.Sound.playUntilDone();
            yield;
        }
    });
    ball.Event.whenFlag(async function(this:S3Sprite){
        this.Motion.setXY(0,0);
    });

    ball.Event.whenBroadcastReceived('START', async function*(this:S3Sprite){
        
        // 上に5回移動
        for(const _ of Lib.times(5)){
            this.Motion.changeY(+10);
            yield;
        }
        // ずっと繰り返す
        for(;;){
            // 下に10回移動
            for(const _ of Lib.times(10)){
                this.Motion.changeY(-10);
                yield;
            }
            // 上に10回移動
            for(const _ of Lib.times(10)){
                this.Motion.changeY(+10);
                yield;
            }
            yield;
        }
    });
    

}
