import "../common/JsLibUrl.js";
import { ScratchJsLib,Libs,Process,Pool,Stage,Sprite } from "../common/TypeLikeScratch";
// @ts-ignore
const lib:ScratchJsLib = likeScratchLib;
console.log(lib.libs.Stage);
(function(R:Process, L: Libs, S:Pool){

    R.preload = async function() {
        this.loadImage('../assets/Jurassic.svg','Jurassic');
        this.loadSound('../assets/Chill.wav','Chill');
    }
    R.prepare = async function() {
        const _stage:Stage = new L.Stage();
        await _stage.addImage( R.images.Jurassic );
        S.stage = _stage;
    }
    R.setting = async function() {
        const _stage:Stage = S.stage;
        // すぐに実行する。
        _stage.whenRightNow( async (stage:Stage)=>{
            // ここでの『this』は Proxy(stage)である。
            // 引数には『this』がわたされてくる。
            await stage.addSound( R.sounds.Chill, { 'volume' : 100 } );
        });
        _stage.whenFlag( async (stage:Stage)=>{ 
            // ここでの『this』は Proxy(stage)である。
            // 引数には『this』がわたされてくる。
            // 「終わるまで音を鳴らす」をずっと繰り返す
            await stage.while(true, async ()=>{
                // 処理が終わるまで待つために await をつける
                await stage.startSoundUntilDone();
            });
        });
    };

})(lib.process, lib.libs, lib.pool);
