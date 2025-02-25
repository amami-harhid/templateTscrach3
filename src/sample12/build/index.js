/**
 * Sample12
 * スプライト（CAT)を クリックした場所へ移動する
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
Pg.title = "【Sample12】クリックした場所へ移動する";
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
        // ここはfunction式の中なので 【this】= P である
        // ここをアロー式にすると 【this】= window となる
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
                $this.Control.while(true, (_) => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        stage.Event.whenClicked(() => __awaiter(this, void 0, void 0, function* () {
            // アロー関数の中なので、【this】は 上の階層 の this = P である。
            const mousePosition = Lib.mousePosition;
            cat.Motion.gotoXY(mousePosition);
        }));
        cat.Event.whenFlag(($this) => __awaiter(this, void 0, void 0, function* () {
            $this.Motion.gotoXY({ x: 0, y: 0 });
        }));
    });
};
//# sourceMappingURL=index.js.map