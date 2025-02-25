/**
 * Sample14
 * スプライト（CAT) がマウスポインターを追いかける
 * マウスポインターがステージの外に出た最後の位置へ追いかける
 * 5秒経過したら 1秒かけて移動する！に切り替わる
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample14】マウスポインターを追いかける（５秒経過後『１秒間でマウスポインターの位置へ移動する』に変化する）";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Jurassic.svg', Jurassic);
        $this.Sound.load('../assets/Chill.wav', Chill);
        $this.Image.load('../assets/cat.svg', Cat);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cat = new Lib.Sprite("Cat");
        cat.Image.add(Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はstageである。
                yield $this.Sound.add(Chill);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
            });
        });
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はProxy(stage)である。
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Motion.gotoXY({ x: 0, y: 0 });
            });
        });
        // ms の値
        const ms1000 = 1000;
        const ms5000 = 5000;
        // 5秒経過した？
        let _5SecondsTimerOn = false;
        // ネコの速度
        const catStep = 5;
        cat.Event.whenFlag(function () {
            return __awaiter(this, void 0, void 0, function* () {
                _5SecondsTimerOn = false;
                yield Lib.wait(ms1000 + ms5000);
                _5SecondsTimerOn = true;
            });
        });
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // 1秒待ってからマウスカーソルを追跡する
                yield Lib.wait(ms1000);
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    // マウスの方向へ向く
                    $this.Motion.pointToMouse();
                    if (_5SecondsTimerOn) {
                        // 枠内にあった最後の場所
                        const mousePosition = Lib.mousePosition;
                        // マウスカーソルの場所へ1秒かけて移動する
                        yield $this.Motion.glideToPosition(1, mousePosition.x, mousePosition.y);
                    }
                    else {
                        $this.Motion.moveSteps(catStep);
                    }
                }));
            });
        });
    });
};
//# sourceMappingURL=index.js.map