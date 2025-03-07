import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample02】旗クリックで背景を表示する";

const Jurassic = "Jurassic";

let stage:S3Stage;

Pg.preload = function(this:S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
}
Pg.prepare = function() {
    stage = new Lib.Stage();
}
Pg.setting = function() {
    // すぐに実行する。
    stage.Event.whenRightNow( async function(this:S3Stage){
        this.Image.add( Jurassic );
    });
};