import {Pg,Lib,St,Images,Sounds} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";

Pg.preload = function() {
    this.Image.load('../assets/Jurassic.svg','Jurassic');
    this.Sound.load('../assets/Chill.wav','Chill');
}
Pg.prepare = function() {
    St.stage = new Lib.Stage();
    St.stage.Image.add( Images.Jurassic );
}
Pg.setting = function() {
    // すぐに実行する。
    St.stage.Event.whenRightNow( function($this:S3Stage){
        // ここでの『this』は Proxy(stage)である。
        $this.Sound.add( Sounds.Chill, { 'volume' : 100 } );
    });
    St.stage.Event.whenFlag( function($this:S3Stage){ 
        // 「終わるまで音を鳴らす」をずっと繰り返す
        $this.Control.forever( async _=>{
            // 処理が終わるまで待つために await をつける
            await $this.Sound.playUntilDone();
        });
    });
};
