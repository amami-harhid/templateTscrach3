import 'https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js';
// @ts-ignore
const Lib:LikeScratchLib = likeScratchLib;

(function(M:Process, S:any){

    M.preload = async function() {
        this.loadImage('../assets/Jurassic.svg','Jurassic');
        this.loadSound('../assets/Chill.wav','Chill');
    }
    M.prepare = async function() {
        const stage:Stage = new M.Stage();
        await stage.addImage( M.images.Jurassic );
        S.stage = stage;
    }
    M.setting = async function() {
        const stage:Stage = S.stage;
        // すぐに実行する。
        stage.whenRightNow( async function(stage:Entity){
            // ここでの『this』は Proxy(stage)である。
            await stage.addSound( M.sounds.Chill, { 'volume' : 100 } );
        });
        stage.whenFlag( async function(stage: Entity){ 
            // 「終わるまで音を鳴らす」をずっと繰り返す
            await stage.while(true, async (stage:Entity)=>{
                // 処理が終わるまで待つために await をつける
                await stage.startSoundUntilDone();
            });
        });
    };

})(Lib.Main, Lib.Space);
