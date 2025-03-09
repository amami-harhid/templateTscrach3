/**
 * Sample09 スプライトをクリックしたらクローンを作る。
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample09】スプライトをクリックしたらクローンを作る。端に触れたらミャーとないて折り返す。";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const Mya = "Mya";
let stage;
let cat;
Pg.preload = async function preload($this) {
    $this.Image.load('../assets/Jurassic.svg', Jurassic);
    $this.Sound.load('../assets/Chill.wav', Chill);
    $this.Image.load('../assets/cat.svg', Cat);
    $this.Sound.load('../assets/Cat.wav', Mya);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    cat = new Lib.Sprite("Cat");
    await cat.Image.add(Cat);
};
const direction01 = 1;
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function* () {
        // 『this』は Proxy(stage)である
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
        while (true) {
            await this.Sound.playUntilDone();
            yield;
        }
        ;
    });
    cat.Event.whenFlag(async function () {
        // 『this』は Proxy(cat)である
        await this.Sound.add(Mya);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
    });
    cat.Event.whenFlag(function () {
        // 初期化
        this.Motion.gotoXY({ x: 0, y: 0 });
        this.Motion.pointInDirection(90);
    });
    // { }の外側のスコープを参照できる
    const direction02 = 1;
    cat.Event.whenFlag(function* () {
        while (true) {
            this.Motion.turnRightDegrees(direction01 + direction02);
            yield;
        }
    });
    cat.Event.whenClicked(async function () {
        await this.Control.clone();
    });
    const catStep = 10;
    cat.Control.whenCloned(async function* () {
        this.Looks.show();
        while (true) {
            this.Motion.moveSteps(catStep);
            this.Motion.ifOnEdgeBounds();
            if (this.Sensing.isTouchingEdge()) {
                // ミャーと鳴く。
                this.Sound.play();
            }
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map