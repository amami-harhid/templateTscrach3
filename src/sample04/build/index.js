import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample04】 旗をクリックした後、ステージをクリック（タッチ）したら音を鳴らす";
const ImageNameJurassic = "Jurassic";
let stage;
Pg.preload = async function () {
    this.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
};
Pg.prepare = async function () {
    stage = new Lib.Stage();
};
Pg.setting = async function () {
    // すぐに実行する。
    stage.Event.whenRightNow(async function () {
        await this.Image.add(ImageNameJurassic);
    });
};
//# sourceMappingURL=index.js.map