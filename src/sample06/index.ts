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

Pg.preload = async function preload($pg:S3PlayGround) {
    $pg.Image.load('../assets/Jurassic.svg', Jurassic);
    $pg.Sound.load('../assets/Chill.wav', Chill);
    $pg.Image.load('../assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    // スプライトを作り、コスチュームを１個登録する
    cat = new Lib.Sprite( SpriteCatName );
    cat.Image.add( Cat );
    cat.Sound.add( Chill, { 'volume' : 100 } );
    cat.Looks.hide(); // 非表示
}
Pg.setting = async function setting() {

    // フラグをクリックしたときの動作
    stage.Event.whenFlag( _=> {
        // アロー関数なので、ここでの『this』はPである
        cat.Looks.show(); // 表示
    });

    // スプライト（ネコ）をクリックしたときの動作
    cat.Event.whenClicked( async (ネコ) => {
        // アロー関数なので、ここでの『this』はPである
        // catのインスタンスは 『ネコ』として受け取っている。
        // 「終わるまで音を鳴らす」をずっと繰り返す
        ネコ.C.forever(async _=>{
            // 処理が終わるまで待つために await をつける
            await ネコ.Sound.playUntilDone();
        });
    });
}
