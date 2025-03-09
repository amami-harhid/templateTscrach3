import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample01】背景を表示する";
const Jurassic = "Jurassic";
let stage;
Pg.preload = function () {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
};
Pg.prepare = async function () {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
};
Pg.setting = function () {
    // Do nothing.
};
//# sourceMappingURL=index.js.map