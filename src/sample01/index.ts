import {PG,LIBS,ST,IMAGES,SOUNDS} from "./importer.js";
import {S3Stage} from "@typeJS/scratchjs/s3Stage";

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
    ST.stage.whenRightNow( async ($this:S3Stage)=>{
        // ここでの『this』は Proxy(stage)である。
        // 引数には『this』がわたされてくる。
        await $this.addSound( SOUNDS.Chill, { 'volume' : 100 } );
    });
    ST.stage.whenFlag( async (stage:S3Stage)=>{ 
        // ここでの『this』は Proxy(stage)である。
        // 引数には『this』がわたされてくる。
        // 「終わるまで音を鳴らす」をずっと繰り返す
        await stage.while(true, async ($this:S3Stage)=>{
            // 処理が終わるまで待つために await をつける
            await $this.startSoundUntilDone();
        });
    });
};
