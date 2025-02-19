import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import {PG, ST, LIBS, IMAGES, SOUNDS} from "./common/JsLibUrl.js";

PG.title = "【Sample01】背景を表示する"

PG.preload = async function() {
    this.loadImage('../assets/Jurassic.svg','Jurassic');
    this.loadSound('../assets/Chill.wav','Chill');
}
PG.prepare = async function() {
    ST.stage = new LIBS.Stage();
    await ST.stage.addImage( IMAGES.Jurassic );
}
PG.setting = async function() {
    // すぐに実行する。
    ST.stage.whenRightNow( async (stage:S3Stage)=>{
        // ここでの『this』は Proxy(stage)である。
        // 引数には『this』がわたされてくる。
        await stage.addSound( SOUNDS.Chill, { 'volume' : 100 } );
    });
    ST.stage.whenFlag( async (stage:S3Stage)=>{ 
        // ここでの『this』は Proxy(stage)である。
        // 引数には『this』がわたされてくる。
        // 「終わるまで音を鳴らす」をずっと繰り返す
        await stage.while(true, async ()=>{
            // 処理が終わるまで待つために await をつける
            await stage.startSoundUntilDone();
        });
    });
};
