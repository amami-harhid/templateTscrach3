import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";

Pg.title = "【Sample02】旗クリックで背景を表示する";

const Jurassic = "Jurassic";

let stage:S3Stage;

// 事前ロード処理
Pg.preload = function(this:S3PlayGround) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
}
// 事前準備処理
Pg.prepare = function() {
    stage = new Lib.Stage();
}
// イベント定義処理
Pg.setting = function() {
    
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function(this:S3Stage){
        await this.Image.add( Jurassic );
    });
};