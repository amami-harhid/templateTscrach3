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
Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";
const ImageNameJurassic = "Jurassic";
const SoundNameChill = "Chill";
let stage;
Pg.preload = function ($pg) {
    $pg.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
    $pg.Sound.load('../assets/Chill.wav', SoundNameChill);
};
Pg.prepare = function () {
    stage = new Lib.Stage();
    stage.Image.add(ImageNameJurassic);
};
Pg.setting = function () {
    // すぐに実行する。
    stage.Event.whenRightNow(function ($stage) {
        // ここでの『this』は Proxy(stage)である。
        $stage.Sound.add(SoundNameChill);
        $stage.Sound.setOption(Lib.SoundOption.VOLUME, 100);
    });
    stage.Event.whenFlag(function ($stage) {
        // 「終わるまで音を鳴らす」をずっと繰り返す
        $stage.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
            // 処理が終わるまで待つために await をつける
            yield $stage.Sound.playUntilDone();
        }));
    });
};
//# sourceMappingURL=index.js.map