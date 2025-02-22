import {Pg,Lib,St,Images,Sounds} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample01】背景を表示する"

Pg.preload = function($this:S3PlayGround) {
    $this.Image.load('../assets/Jurassic.svg','Jurassic');
    $this.Sound.load('../assets/Chill.wav','Chill');
    $this.Image.load('../assets/Cat.svg','Cat');
}
Pg.prepare = function() {
    St.stage = new Lib.Stage();
    St.stage.Image.add( Images.Jurassic );
    St.cat = new Lib.Sprite("CAT");
    St.cat.Image.add( Images.Cat );
}
Pg.setting = function() {
    // すぐに実行する。
    const stage:S3Stage = <S3Stage>(St.stage);
    stage.Event.whenRightNow( async ($this:S3Stage)=>{
        // ここでの『this』は Proxy(stage)である。
        // 引数には『this』がわたされてくる。
        await $this.Sound.add( Sounds.Chill, { 'volume' : 100} );
    });
    stage.Event.whenFlag( async (stage:S3Stage)=>{ 
        // ここでの『this』は Proxy(stage)である。
        // 引数には『this』がわたされ,変数名=stageで受け取る。

        // 「終わるまで音を鳴らす」をずっと繰り返す
        await stage.Control.forever(async ($this:S3Stage)=>{
            // 処理が終わるまで待つために await をつける
            await $this.Sound.playUntilDone();
        });
    });
};
