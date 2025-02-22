import {Pg,Lib,St,Images,Sounds} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample02】旗クリックで背景を表示する";

Pg.preload = function($this:S3PlayGround) {
    // ここでの『this』は M(Mainインスタンス) である。
    $this.Image.load('../assets/Jurassic.svg','Jurassic');
}
Pg.prepare = function() {
    St.stage = new Lib.Stage();
}
Pg.setting = function() {
    // すぐに実行する。
    St.stage.Event.whenRightNow( function($this:S3Stage){
        // ここでの『this』は Proxy(Stage)である。
        $this.Image.add( Images.Jurassic );
    });
};