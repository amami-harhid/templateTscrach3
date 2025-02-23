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
Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";
Pg.preload = function () {
    this.Image.load('../assets/Jurassic.svg', 'Jurassic');
    this.Sound.load('../assets/Chill.wav', 'Chill');
};
Pg.prepare = function () {
    St.stage = new Lib.Stage();
    St.stage.Image.add(Images.Jurassic);
};
Pg.setting = function () {
    // すぐに実行する。
    St.stage.Event.whenRightNow(function ($this) {
        // ここでの『this』は Proxy(stage)である。
        $this.Sound.add(Sounds.Chill, { 'volume': 100 });
    });
    St.stage.Event.whenFlag(function ($this) {
        // 「終わるまで音を鳴らす」をずっと繰り返す
        $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
            // 処理が終わるまで待つために await をつける
            yield $this.Sound.playUntilDone();
        }));
    });
};
//# sourceMappingURL=index.js.map