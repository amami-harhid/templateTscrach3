/**
 * Sample15
 * スプライト（CAT) は端を越えて進めない。
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample15】端を越えては進めない。";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
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
    cat = new Lib.Sprite("Cat");
    cat.Motion.gotoXY({ x: 0, y: 0 });
    cat.Image.add(Cat);
};
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function* () {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
        while (true) {
            await this.Sound.playUntilDone();
            yield;
        }
    });
    cat.Event.whenFlag(function () {
        this.Motion.gotoXY({ x: 0, y: 0 });
    });
    const CAT_WALK_STEP = 5;
    cat.Event.whenFlag(async function* () {
        while (true) {
            this.Motion.moveSteps(CAT_WALK_STEP);
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map