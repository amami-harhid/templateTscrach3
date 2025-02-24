/**
 * Sample05 旗クリックでスプライトを表示する
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample05】旗クリックでスプライトを表示する";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const SpriteCatName = "cat";
let stage;
let cat;
Pg.preload = function ($pg) {
    $pg.Image.load('../assets/Jurassic.svg', Jurassic);
    $pg.Sound.load('../assets/Chill.wav', Chill);
    $pg.Image.load('../assets/cat.svg', Cat);
};
Pg.prepare = function () {
    stage = new Lib.Stage();
    stage.Image.add(Jurassic);
    stage.Sound.add(Chill);
    stage.Sound.setOption(Lib.SoundOption.VOLUME, 100);
};
Pg.setting = function () {
    // フラグをクリックしたときの動作
    // whenFlagのなかでStageの『this』を使わずに、
    // Pのthisとして使うのであれば、アロー式（引数省略）で書いて
    // this.cat として明示的に使うことでもよい。
    // ここでは、this.cat は P.catと同じ意味である。
    stage.Event.whenFlag(_ => {
        // 旗クリックしたタイミングでネコのスプライトを作り、
        // コスチュームを１個登録する
        cat = new Lib.Sprite(SpriteCatName);
    });
    stage.Event.whenFlag(_ => {
        // コスチュームを１個登録する
        // whenFlagを定義した順番に実行されるので、
        // ここの『旗クリック』の処理ではネコのスプライトは作成済である。
        cat.Image.add(Cat);
    });
};
//# sourceMappingURL=index.js.map