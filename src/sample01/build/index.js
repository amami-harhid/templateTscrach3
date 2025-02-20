var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PG, LIBS, ST, IMAGES, SOUNDS } from "./importer.js";
PG.title = "【Sample01】背景を表示する";
PG.preload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.loadImage('../assets/Jurassic.svg', 'Jurassic');
        this.loadSound('../assets/Chill.wav', 'Chill');
    });
};
PG.prepare = function () {
    return __awaiter(this, void 0, void 0, function* () {
        ST.stage = new LIBS.Stage();
        yield ST.stage.addImage(IMAGES.Jurassic);
    });
};
PG.setting = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // すぐに実行する。
        ST.stage.whenRightNow(($this) => __awaiter(this, void 0, void 0, function* () {
            // ここでの『this』は Proxy(stage)である。
            // 引数には『this』がわたされてくる。
            yield $this.addSound(SOUNDS.Chill, { 'volume': 100 });
        }));
        ST.stage.whenFlag((stage) => __awaiter(this, void 0, void 0, function* () {
            // ここでの『this』は Proxy(stage)である。
            // 引数には『this』がわたされてくる。
            // 「終わるまで音を鳴らす」をずっと繰り返す
            yield stage.while(true, ($this) => __awaiter(this, void 0, void 0, function* () {
                // 処理が終わるまで待つために await をつける
                yield $this.startSoundUntilDone();
            }));
        }));
    });
};
//# sourceMappingURL=index.js.map