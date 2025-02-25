/**
 * Sample16
 * スプライト() : 回転方向⇒左右のみ回転
 * スプライト（CAT2) : 回転方向⇒自由に回転
 * スプライト（CAT3) : 回転方向⇒回転しない
 *
 * 各スプライトはマウスポインターに向いて追いかける。
 * ５秒ごとに元の位置に戻る。
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
Pg.title = "【Sample16】３匹のネコの回転方向を変える";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat1;
let cat2;
let cat3;
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
        cat1 = new Lib.Sprite("Cat1");
        cat1.Image.add(Cat);
        cat1.Motion.gotoXY({ x: -Lib.stageWidth / 4, y: +Lib.stageHeight / 4 });
        cat1.Looks.setEffect(Lib.ImageEffective.COLOR, 50);
        cat1.Motion.setRotationStyle(Lib.RotationStyle.LEFT_RIGHT);
        cat2 = new Lib.Sprite("Cat2");
        cat2.Image.add(Cat);
        cat2.Motion.gotoXY({ x: 0, y: 0 });
        cat3 = new Lib.Sprite("Cat3");
        cat3.Image.add(Cat);
        cat3.Motion.gotoXY({ x: Lib.stageWidth / 4, y: -Lib.stageHeight / 4 });
        cat3.Looks.setEffect(Lib.ImageEffective.COLOR, 10);
        cat3.Motion.setRotationStyle(Lib.RotationStyle.DONT_ROTATE);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はstageである。
                $this.Sound.add(Chill);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
            });
        });
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はProxy(stage)である。
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield this.Sound.playUntilDone();
                }));
            });
        });
        const WAIT_TIME = 5000; //5秒
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield Lib.wait(WAIT_TIME);
                    cat1.Motion.gotoXY({ x: -Lib.stageWidth / 4, y: +Lib.stageHeight / 4 });
                    cat2.Motion.gotoXY({ x: 0, y: 0 });
                    cat3.Motion.gotoXY({ x: Lib.stageWidth / 4, y: -Lib.stageHeight / 4 });
                }));
            });
        });
        const CAT_WALK_STEP = 2;
        cat1.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.pointToMouse();
                    $this.Motion.moveSteps(CAT_WALK_STEP);
                }));
            });
        });
        cat2.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.pointToMouse();
                    $this.Motion.moveSteps(CAT_WALK_STEP);
                }));
            });
        });
        cat3.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.pointToMouse();
                    $this.Motion.moveSteps(CAT_WALK_STEP);
                }));
            });
        });
    });
};
//# sourceMappingURL=index.js.map