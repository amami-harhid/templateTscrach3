/**
 * Sample08
 * スプライトを 動かす( 端に触れたら ミャーと鳴く)
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample08】スプライトが動き、端に触れたらミャーと鳴く";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Mya = "Mya";
const Cat = "Cat";
const SpriteCatName = "cat";
let stage;
let cat;
Pg.preload = async function preload() {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
    this.Sound.load('../assets/Chill.wav', Chill);
    this.Image.load('../assets/ball-a.svg', Cat);
    this.Sound.load('../assets/Cat.wav', Mya);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    cat = new Lib.Sprite(SpriteCatName);
    await cat.Image.add(Cat);
};
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function* () {
        // ここでの『this』は P であるので、this.sounds は P.soundsと同じである。 
        // stageのインスタンスは 『stage』の変数で受け取っている。
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
        while (true) {
            // ＢＧＭを鳴らし続ける（終わるまで待つ）
            await this.Sound.playUntilDone();
            yield;
        }
    });
    const catStep = 10;
    cat.Event.whenFlag(async function () {
        // 初期化
        this.Motion.gotoXY({ x: 0, y: 0 });
        this.Motion.pointInDirection(40);
    });
    cat.Event.whenFlag(async function* () {
        await this.Sound.add(Mya);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
        // ずっと「左右」に動く。端に触れたら跳ね返る。
        while (true) {
            this.Motion.moveSteps(catStep);
            this.Motion.ifOnEdgeBounds();
            if (this.Sensing.isTouchingEdge()) {
                this.Sound.play();
            }
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map