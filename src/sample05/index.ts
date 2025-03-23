/**
 * Sample05 旗クリックでスプライトを表示する
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample05】旗クリックでスプライトを表示する";

const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const SpriteCatName = "cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = function(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}

Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    await stage.Sound.setOption( Lib.SoundOption.VOLUME, 100)
}

Pg.setting = function() {
    // フラグをクリックしたときの動作
    // whenFlagのなかでStageの『this』を使わずに、
    // Pのthisとして使うのであれば、アロー式（引数省略）で書いて
    // this.cat として明示的に使うことでもよい。
    // ここでは、this.cat は P.catと同じ意味である。
    stage.Event.whenFlag( async function() {
        // 旗クリックしたタイミングでネコのスプライトを作り、
        // コスチュームを１個登録する
        cat = new Lib.Sprite( SpriteCatName );
    });
    stage.Event.whenFlag( async function(){
        // コスチュームを１個登録する
        // whenFlagを定義した順番に実行されるので、
        // ここの『旗クリック』の処理ではネコのスプライトは作成済である。
        await cat.Image.add( Cat );
    });
};