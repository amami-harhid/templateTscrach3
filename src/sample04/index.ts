import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample04】 旗をクリックした後、ステージをクリック（タッチ）したら音を鳴らす";

const ImageNameJurassic = "Jurassic";
let stage: S3Stage;

Pg.preload = async function(this:S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
}
Pg.prepare = async function() {
    stage = new Lib.Stage();
}
Pg.setting = async function() {
    // すぐに実行する。
    stage.Event.whenRightNow( function(this:S3Stage){
        this.Image.add( ImageNameJurassic );
    });
};