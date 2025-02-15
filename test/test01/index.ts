import 'https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js';
// @ts-ignore
const Lib:LikeScratchLib = likeScratchLib;
(function(M:Process, S:any){

    M.preload = async function() {
        this.loadImage('../assets/Jurassic.svg','Jurassic');
        this.loadSound('../assets/Chill.wav','Chill');
    }
    M.prepare = async function() {
        S.stage = new M.Stage();
        S.stage.addImage( M.images.Jurassic );
    }
    M.setting = async function() {
        // すぐに実行する。
        S.stage.whenRightNow( function(stage:Entity){
            // ここでの『this』は Proxy(stage)である。
            stage.addSound( M.sounds.Chill, { 'volume' : 100 } );
        });
        S.stage.whenFlag( function(stage: Entity){ 
            // 「終わるまで音を鳴らす」をずっと繰り返す
            stage.while(true, async (stage: Entity)=>{
                // 処理が終わるまで待つために await をつける
                await stage.startSoundUntilDone();
            });
        });
    };

})(Lib.Main, Lib.Space);
