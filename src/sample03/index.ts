import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";

const ImageNameJurassic = "Jurassic";
const SoundNameChill = "Chill";

let stage:S3Stage;

Pg.preload = function(this:S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
    this.Sound.load('../assets/Chill.wav', SoundNameChill);
}
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( ImageNameJurassic );
}
Pg.setting = function() {
    // すぐに実行する。
    stage.Event.whenRightNow( async function(this:S3Stage){
        // ここでの『this』は Proxy(stage)である。
        await this.Sound.add( SoundNameChill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 100);
    });
    stage.Event.whenFlag( async function*(this:S3Stage){ 
        // 「終わるまで音を鳴らす」をずっと繰り返す
        while(true){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone();
            yield;
        }
    });
};
