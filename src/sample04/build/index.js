var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pg, Lib, St, Images } from "./importer.js";
Pg.title = "【Sample02】旗クリックで背景を表示する";
Pg.preload = function ($this) {
    return __awaiter(this, void 0, void 0, function* () {
        // ここでの『this』は M(Mainインスタンス) である。
        $this.Image.load('../assets/Jurassic.svg', 'Jurassic');
    });
};
Pg.prepare = function () {
    return __awaiter(this, void 0, void 0, function* () {
        St.stage = new Lib.Stage();
    });
};
Pg.setting = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // すぐに実行する。
        St.stage.Event.whenRightNow(function ($this) {
            // ここでの『this』は Proxy(Stage)である。
            $this.Image.add(Images.Jurassic);
        });
    });
};
//# sourceMappingURL=index.js.map