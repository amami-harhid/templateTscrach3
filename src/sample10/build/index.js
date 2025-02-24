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
 * Sample10
 * スプライトのクローンを作る（スプライトに触ったらクローンを作る）
 * クローンされたら動きだす（端に触れたらミャーとないて折り返す）
 */
import { Pg, Lib } from "./importer.js";
import { EffectType } from "/src/types/scratchjs/s3LooksFunctions";
Pg.title = "【Sample10】スプライトに触ったらクローンを作る(5秒で死ぬ)";
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
        cat.Motion.gotoXY({ x: 200, y: 150 });
        cat.Motion.pointInDirection(90);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($stage) {
            return __awaiter(this, void 0, void 0, function* () {
                $stage.Sound.add(Chill, { 'volume': 50 });
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
                // 音を登録する
                $cat.Sound.add(Mya, { 'volume': 20 });
            });
        });
        cat.Event.whenFlag(($cat) => __awaiter(this, void 0, void 0, function* () {
            // 初期化
            $cat.Motion.gotoXY({ x: 200, y: 150 });
            $cat.Motion.pointInDirection(90);
        }));
        const _changeDirection = 1;
        cat.Event.whenFlag(function ($cat) {
            return __awaiter(this, void 0, void 0, function* () {
                // ずっと繰り返して回転する
                $cat.Control.forever(_ => {
                    $cat.Motion.turnRightDegrees(_changeDirection); // 外側Scope 参照可能
                });
            });
        });
        cat.Event.whenFlag(function ($cat) {
            return __awaiter(this, void 0, void 0, function* () {
                // 次をずっと繰り返す
                // マウスカーソルでタッチしたら、クローンを作る
                $cat.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    if ($cat.Sensing.isMouseTouching()) {
                        $cat.Control.clone();
                    }
                    // マウスタッチしないまで待つ
                    yield Lib.waitWhile(() => $cat.Sensing.isMouseTouching());
                }));
            });
        });
        const steps = 10;
        cat.Control.whenCloned(function (clone) {
            return __awaiter(this, void 0, void 0, function* () {
                clone.Motion.gotoXY({ x: 100, y: -100 });
                clone.Looks.setSize({ x: 50, y: 50 });
                clone.Looks.setEffect(EffectType.color, 50);
                clone.life = 5000;
                clone.Looks.show();
                // ずっと繰り返す
                clone.Control.forever(_ => {
                    clone.Motion.moveSteps(steps);
                    // 端に触れたら
                    clone.Motion.ifOnEdgeBounds();
                    if (clone.Sensing.isTouchingEdge()) {
                        // ミャーと鳴く。
                        clone.Sound.play();
                    }
                });
            });
        });
    });
};
//# sourceMappingURL=index.js.map