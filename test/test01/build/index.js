var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js';
// @ts-ignore
const Lib = likeScratchLib;
(function (M, S) {
    M.preload = function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadImage('../assets/Jurassic.svg', 'Jurassic');
            this.loadSound('../assets/Chill.wav', 'Chill');
        });
    };
    M.prepare = function () {
        return __awaiter(this, void 0, void 0, function* () {
            const stage = new M.Stage();
            yield stage.addImage(M.images.Jurassic);
            S.stage = stage;
        });
    };
    M.setting = function () {
        return __awaiter(this, void 0, void 0, function* () {
            const stage = S.stage;
            // すぐに実行する。
            stage.whenRightNow(function (stage) {
                return __awaiter(this, void 0, void 0, function* () {
                    // ここでの『this』は Proxy(stage)である。
                    yield stage.addSound(M.sounds.Chill, { 'volume': 100 });
                });
            });
            stage.whenFlag(function (stage) {
                return __awaiter(this, void 0, void 0, function* () {
                    // 「終わるまで音を鳴らす」をずっと繰り返す
                    yield stage.while(true, () => __awaiter(this, void 0, void 0, function* () {
                        // 処理が終わるまで待つために await をつける
                        yield stage.startSoundUntilDone();
                    }));
                });
            });
        });
    };
})(Lib.Main, Lib.Space);
//# sourceMappingURL=index.js.map