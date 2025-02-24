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
const direction01 = 1;
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($stage) {
            // function(){} と書くとき、『this』は Proxy(stage)である
            $stage.Sound.add(Chill);
            $stage.Sound.setOption(Lib.SoundOption.VOLUME, 50);
            $stage.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                yield $stage.Sound.playUntilDone();
            }));
        });
        cat.Event.whenFlag(function ($cat) {
            // function(){} と書くとき、『this』は Proxy(cat)である
            $cat.Sound.add(Mya);
            $cat.Sound.setOption(Lib.SoundOption.VOLUME, 20);
        });
        cat.Event.whenFlag(($cat) => __awaiter(this, void 0, void 0, function* () {
            // 初期化
            $cat.Motion.gotoXY({ x: 0, y: 0 });
            $cat.Motion.pointInDirection(90);
        }));
        // { }の外側のスコープを参照できる
        const direction02 = 1;
        cat.Event.whenFlag(function ($cat) {
            return __awaiter(this, void 0, void 0, function* () {
                $cat.Control.forever(_ => {
                    $cat.Motion.turnRightDegrees(direction01 + direction02);
                });
            });
        });
        cat.Event.whenClicked(function ($cat) {
            return __awaiter(this, void 0, void 0, function* () {
                $cat.Control.clone();
            });
        });
        const catStep = 10;
        cat.Control.whenCloned(function ($cat) {
            return __awaiter(this, void 0, void 0, function* () {
                $cat.Looks.show();
                $cat.Control.forever(_ => {
                    $cat.Motion.moveSteps(catStep);
                    $cat.Motion.ifOnEdgeBounds();
                    if ($cat.Sensing.isTouchingEdge()) {
                        // ミャーと鳴く。
                        $cat.Sound.play();
                    }
                });
            });
        });
    });
};
//# sourceMappingURL=index.js.map