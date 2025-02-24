var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Sample11
 * スプライト（CAT)を １秒で「どこかの」場所へ移動する
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample11】１秒で「どこかの」場所へ移動する";
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
        cat.Motion.gotoXY({ x: 0, y: 0 });
        cat.Image.add(Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($stage) {
            return __awaiter(this, void 0, void 0, function* () {
                $stage.Sound.add(Chill);
                $stage.Sound.setOption(Lib.SoundOption.VOLUME, 50);
            });
        });
        stage.Event.whenFlag(function ($stage) {
            return __awaiter(this, void 0, void 0, function* () {
                $stage.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield $stage.Sound.playUntilDone();
                }));
            });
        });
        cat.Event.whenFlag(function ($cat) {
            return __awaiter(this, void 0, void 0, function* () {
                $cat.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    // 繰り返すごとに 1秒待つ
                    yield Lib.wait(1000);
                    // １秒でどこかへ行く
                    const randomPoint = Lib.randomPoint;
                    yield $cat.Motion.glideToPosition(1, randomPoint.x, randomPoint.y);
                }));
            });
        });
    });
};
//# sourceMappingURL=index.js.map