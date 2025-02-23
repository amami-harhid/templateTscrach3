import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";

const ImageNameJurassic = "Jurassic";
const SoundNameChill = "Chill";

let stage:S3Stage;

Pg.preload = function($pg:S3PlayGround) {
    $pg.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
    $pg.Sound.load('../assets/Chill.wav', SoundNameChill);
}
Pg.prepare = function() {
    stage = new Lib.Stage();
    stage.Image.add( ImageNameJurassic );
}
Pg.setting = function() {
    // すぐに実行する。
    stage.Event.whenRightNow( function($stage:S3Stage){
        // ここでの『this』は Proxy(stage)である。
        $stage.Sound.add( SoundNameChill, { 'volume' : 100 } );
    });
    stage.Event.whenFlag( function($stage:S3Stage){ 
        // 「終わるまで音を鳴らす」をずっと繰り返す
        $stage.Control.forever( async _=>{
            // 処理が終わるまで待つために await をつける
            await $stage.Sound.playUntilDone();
        });
    });
};
