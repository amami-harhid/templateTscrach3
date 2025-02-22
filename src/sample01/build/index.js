var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pg, Lib, St, Images, Sounds } from "./importer.js";
Pg.title = "【Sample01】背景を表示する";
Pg.preload = function ($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Jurassic.svg', 'Jurassic');
        $this.Sound.load('../assets/Chill.wav', 'Chill');
        $this.Image.load('../assets/Cat.svg', 'Cat');
    });
};
Pg.prepare = function () {
    return __awaiter(this, void 0, void 0, function* () {
        St.stage = new Lib.Stage();
        St.stage.Image.add(Images.Jurassic);
        St.cat = new Lib.Sprite("CAT");
        St.cat.Image.add(Images.Cat);
    });
};
Pg.setting = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // すぐに実行する。
        const stage = (St.stage);
        stage.Event.whenRightNow(($this) => __awaiter(this, void 0, void 0, function* () {
            // ここでの『this』は Proxy(stage)である。
            // 引数には『this』がわたされてくる。
            yield $this.Sound.add(Sounds.Chill, { 'volume': 100 });
        }));
        stage.Event.whenFlag((stage) => __awaiter(this, void 0, void 0, function* () {
            // ここでの『this』は Proxy(stage)である。
            // 引数には『this』がわたされ,変数名=stageで受け取る。
            // 「終わるまで音を鳴らす」をずっと繰り返す
            yield stage.Control.forever(($this) => __awaiter(this, void 0, void 0, function* () {
                // 処理が終わるまで待つために await をつける
                yield $this.Sound.playUntilDone();
            }));
        }));
    });
};
//# sourceMappingURL=index.js.map