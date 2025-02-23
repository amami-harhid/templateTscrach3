import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";

Pg.title = "【Sample04】旗クリックで背景を表示する";

let stage:S3Stage;

Pg.preload = async function($this:S3PlayGround) {
    // ここでの『this』は M(Mainインスタンス) である。
    $this.Image.load('../assets/Jurassic.svg','Jurassic');
}
Pg.prepare = async function() {
    stage = new Lib.Stage();
}
Pg.setting = async function() {
    // すぐに実行する。
    stage.Event.whenRightNow( function($this:S3Stage){
        // ここでの『this』は Proxy(Stage)である。
        $this.Image.add( "Jurassic" );
    });
};