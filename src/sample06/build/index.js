/**
 * Sample06 スプライトをタッチしたらＢＧＭを繰返し鳴らす
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample06】スプライトをタッチしたらＢＧＭを繰返し鳴らす";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const SpriteCatName = "cat";
let stage;
let cat;
Pg.preload = async function preload() {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
    this.Sound.load('../assets/Chill.wav', Chill);
    this.Image.load('../assets/cat.svg', Cat);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add(Jurassic);
    // スプライトを作り、コスチュームを１個登録する
    cat = new Lib.Sprite(SpriteCatName);
    cat.Image.add(Cat);
    await cat.Sound.add(Chill);
    await cat.Sound.setOption(Lib.SoundOption.VOLUME, 10);
    cat.Looks.hide(); // 非表示
};
Pg.setting = async function setting() {
    // フラグをクリックしたときの動作
    stage.Event.whenFlag(async function () {
        // アロー関数なので、ここでの『this』はPである
        cat.Looks.show(); // 表示
    });
    // スプライト（ネコ）をクリックしたときの動作
    cat.Event.whenClicked(async function* () {
        // 『this』は cat である
        // catのインスタンスは 『ネコ』として受け取っている。
        // 「終わるまで音を鳴らす」をずっと繰り返す
        while (true) {
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone();
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map