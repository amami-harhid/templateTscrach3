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
 * Sample06 スプライトをタッチしたらＢＧＭを繰返し鳴らす
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample06】スプライトをタッチしたらＢＧＭを繰返し鳴らす";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
const SpriteCatName = "cat";
let stage;
let cat;
Pg.preload = function preload($pg) {
    return __awaiter(this, void 0, void 0, function* () {
        $pg.Image.load('../assets/Jurassic.svg', Jurassic);
        $pg.Sound.load('../assets/Chill.wav', Chill);
        $pg.Image.load('../assets/cat.svg', Cat);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        // スプライトを作り、コスチュームを１個登録する
        cat = new Lib.Sprite(SpriteCatName);
        cat.Image.add(Cat);
        cat.Sound.add(Chill);
        cat.Sound.setOption(Lib.SoundOption.VOLUME, 100);
        cat.Looks.hide(); // 非表示
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        // フラグをクリックしたときの動作
        stage.Event.whenFlag(_ => {
            // アロー関数なので、ここでの『this』はPである
            cat.Looks.show(); // 表示
        });
        // スプライト（ネコ）をクリックしたときの動作
        cat.Event.whenClicked((ネコ) => __awaiter(this, void 0, void 0, function* () {
            // アロー関数なので、ここでの『this』はPである
            // catのインスタンスは 『ネコ』として受け取っている。
            // 「終わるまで音を鳴らす」をずっと繰り返す
            ネコ.C.forever((_) => __awaiter(this, void 0, void 0, function* () {
                // 処理が終わるまで待つために await をつける
                yield ネコ.Sound.playUntilDone();
            }));
        }));
    });
};
//# sourceMappingURL=index.js.map