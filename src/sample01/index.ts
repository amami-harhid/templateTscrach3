import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample01】背景を表示する"

const Jurassic = "Jurassic";

let stage:S3Stage;

Pg.preload = function(this:S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
}
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
}
Pg.setting = function() {
    // Do nothing.
};
