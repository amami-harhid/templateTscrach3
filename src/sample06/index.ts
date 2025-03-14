/**
 * Sample06 スプライトをタッチしたらＢＧＭを繰返し鳴らす
 */
import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample06】スプライトをタッチしたらＢＧＭを繰返し鳴らす";

const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const SpriteCatName = "cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    // スプライトを作り、コスチュームを１個登録する
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat );
    await cat.Sound.add( Chill );
    await cat.Sound.setOption( Lib.SoundOption.VOLUME, 10 );
    cat.Looks.hide(); // 非表示
}
Pg.setting = async function setting() {

    // フラグをクリックしたときの動作
    stage.Event.whenFlag( async function(){
        // アロー関数なので、ここでの『this』はPである
        cat.Looks.show(); // 表示
    });

    // スプライト（ネコ）をクリックしたときの動作
    cat.Event.whenClicked( async function*(this:S3Sprite){
        // 『this』は cat である
        // catのインスタンスは 『ネコ』として受け取っている。
        // 「終わるまで音を鳴らす」をずっと繰り返す
        while(true){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone();
            yield;
        }
    });
}
