import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample02】旗クリックで背景を表示する";

const ImageNameJurassic = "Jurassic";

let stage:S3Stage;

Pg.preload = function($pg:S3PlayGround) {
    $pg.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
}
Pg.prepare = function() {
    stage = new Lib.Stage();
}
Pg.setting = function() {
    // すぐに実行する。
    stage.Event.whenRightNow( function($stage:S3Stage){
        $stage.Image.add( ImageNameJurassic );
    });
};