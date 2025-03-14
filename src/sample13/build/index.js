/**
 * Sample13
 * スプライト（CAT) クリックした位置へ１秒で動く
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample13】クリックした位置へ１秒で動く";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = async function preload() {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    cat = new Lib.Sprite("Cat");
    await cat.Image.add(Cat);
};
Pg.setting = async function setting() {
    /** 旗をクリックしたときのステージのイベント */
    stage.Event.whenFlag(async function () {
        // function() の中なので、【this】はstageである。
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
    });
    /** 旗をクリックしたときのステージのイベント */
    stage.Event.whenFlag(async function* () {
        // function() の中なので、【this】はProxy(stage)である。
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
        while (true) {
            await this.Sound.playUntilDone();
            yield;
        }
    });
    /** ステージをクリックしたときのステージイベント */
    stage.Event.whenClicked(async function () {
        const mousePosition = Lib.mousePosition;
        // ステージイベント処理の中でネコを動かす
        await cat.Motion.glideToPosition(1, mousePosition);
    });
    /** 旗をクリックしたときのネコのイベント */
    cat.Event.whenFlag(async function () {
        this.Motion.gotoXY({ x: 0, y: 0 });
    });
};
//# sourceMappingURL=index.js.map