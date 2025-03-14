import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample02】旗クリックで背景を表示する";
const Jurassic = "Jurassic";
let stage;
Pg.preload = function () {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
};
Pg.prepare = function () {
    stage = new Lib.Stage();
};
Pg.setting = function () {
    // すぐに実行する。
    stage.Event.whenRightNow(async function () {
        await this.Image.add(Jurassic);
    });
};
//# sourceMappingURL=index.js.map