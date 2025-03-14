/**
 * Sample14
 * スプライト（CAT) がマウスポインターを追いかける
 * マウスポインターがステージの外に出た最後の位置へ追いかける
 * 5秒経過したら 1秒かけて移動する！に切り替わる
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample14】マウスポインターを追いかける（５秒経過後『１秒間でマウスポインターの位置へ移動する』に変化する）";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = async function preload($this) {
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    $this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    $this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    cat = new Lib.Sprite("Cat");
    await cat.Image.add(Cat);
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
    cat.Event.whenFlag(async function () {
        this.Motion.gotoXY({ x: 0, y: 0 });
    });
    // ms の値
    const sec1 = 1;
    const sec5 = 5;
    // 5秒経過した？
    let _5SecondsTimerOn = false;
    // ネコの速度
    const catStep = 5;
    cat.Event.whenFlag(async function () {
        _5SecondsTimerOn = false;
        await this.Control.wait(sec1 + sec5);
        _5SecondsTimerOn = true;
    });
    cat.Event.whenFlag(async function* () {
        // 1秒待ってからマウスカーソルを追跡する
        await this.Control.wait(sec1);
        while (true) {
            // マウスの方向へ向く
            this.Motion.pointToMouse();
            if (_5SecondsTimerOn) {
                // 枠内にあった最後の場所
                const mousePosition = Lib.mousePosition;
                // マウスカーソルの場所へ1秒かけて移動する
                await this.Motion.glideToPosition(1, mousePosition.x, mousePosition.y);
            }
            else {
                this.Motion.moveSteps(catStep);
            }
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map