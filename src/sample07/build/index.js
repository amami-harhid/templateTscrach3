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
 * Sample07 スプライトを左右に動かす。端に触れたら跳ね返る
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample07】スプライトが横向きに動き、端に触れたら跳ね返";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const SpriteCatName = "cat";
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
        stage.Sound.add(Chill);
        stage.Sound.setOption(Lib.SoundOption.VOLUME, 100);
        cat = new Lib.Sprite(SpriteCatName);
        cat.Image.add(Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        // フラグクリック
        stage.Event.whenFlag(($stage) => __awaiter(this, void 0, void 0, function* () {
            // 「終わるまで音を鳴らす」をずっと繰り返す、スレッドを起動する
            yield $stage.Control.while(true, (_) => __awaiter(this, void 0, void 0, function* () {
                yield $stage.Sound.playUntilDone();
            }));
        }));
        const catStep = 5;
        // フラグクリック
        cat.Event.whenFlag(($cat) => __awaiter(this, void 0, void 0, function* () {
            // 初期化
            $cat.Motion.gotoXY({ x: 0, y: 0 });
            $cat.Motion.pointInDirection(90);
        }));
        cat.Event.whenFlag(($cat) => __awaiter(this, void 0, void 0, function* () {
            // 「左右」に動く。端に触れたら跳ね返る。
            yield $cat.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                $cat.Motion.moveSteps(catStep);
                $cat.Motion.ifOnEdgeBounds();
            }));
        }));
    });
};
//# sourceMappingURL=index.js.map