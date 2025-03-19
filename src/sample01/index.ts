import {Pg,Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";

Pg.title = "【Sample01】背景を表示する"

const Jurassic = "Jurassic";

let stage:S3Stage;

Pg.preload = function(this:S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
}
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
}
Pg.setting = function() {
    // Do nothing.
};
