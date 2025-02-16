var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "../common/JsLibUrl.js";
// @ts-ignore
const lib = likeScratchLib;
(function (M, L, P) {
    M.preload = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadImage('../assets/Jurassic.svg', 'Jurassic');
            this.loadSound('../assets/Chill.wav', 'Chill');
        });
    };
    M.prepare = function () {
        return __awaiter(this, void 0, void 0, function* () {
            const _stage = new L.Stage();
            yield _stage.addImage(M.images.Jurassic);
            P.stage = _stage;
        });
    };
    M.setting = function () {
        return __awaiter(this, void 0, void 0, function* () {
            const _stage = P.stage;
            // すぐに実行する。
            _stage.whenRightNow((stage) => __awaiter(this, void 0, void 0, function* () {
                // ここでの『this』は Proxy(stage)である。
                // 引数には『this』がわたされてくる。
                yield stage.addSound(M.sounds.Chill, { 'volume': 100 });
            }));
            _stage.whenFlag((stage) => __awaiter(this, void 0, void 0, function* () {
                // ここでの『this』は Proxy(stage)である。
                // 引数には『this』がわたされてくる。
                // 「終わるまで音を鳴らす」をずっと繰り返す
                yield stage.while(true, () => __awaiter(this, void 0, void 0, function* () {
                    // 処理が終わるまで待つために await をつける
                    yield stage.startSoundUntilDone();
                }));
            }));
        });
    };
})(lib.process, lib.libs, lib.pool);
//# sourceMappingURL=index.js.map