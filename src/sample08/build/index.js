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
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Jurassic.svg', Jurassic);
        $this.Sound.load('../assets/Chill.wav', Chill);
        $this.Image.load('../assets/cat.svg', Cat);
        $this.Sound.load('../assets/Cat.wav', Mya);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cat = new Lib.Sprite(SpriteCatName);
        cat.Image.add(Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(($stage) => __awaiter(this, void 0, void 0, function* () {
            // ここでの『this』は P であるので、this.sounds は P.soundsと同じである。 
            // stageのインスタンスは 『stage』の変数で受け取っている。
            yield $stage.Sound.add(Chill);
            $stage.Sound.setOption(Lib.SoundOption.VOLUME, 100);
            yield $stage.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                // ＢＧＭを鳴らし続ける（終わるまで待つ）
                yield $stage.Sound.playUntilDone();
            }));
        }));
        const catStep = 10;
        cat.Event.whenFlag((_cat) => __awaiter(this, void 0, void 0, function* () {
            _cat.Sound.add(Mya, { 'volume': 50 });
        }));
        cat.Event.whenFlag((_cat) => __awaiter(this, void 0, void 0, function* () {
            // 初期化
            _cat.Motion.gotoXY({ x: 0, y: 0 });
            _cat.Motion.pointInDirection(90);
        }));
        cat.Event.whenFlag((_cat) => __awaiter(this, void 0, void 0, function* () {
            // ずっと「左右」に動く。端に触れたら跳ね返る。
            _cat.Control.forever(_ => {
                _cat.Motion.moveSteps(catStep);
                _cat.Motion.ifOnEdgeBounds();
                if (_cat.Sensing.isTouchingEdge()) {
                    _cat.Sound.play();
                }
            });
        }));
    });
};
//# sourceMappingURL=index.js.map