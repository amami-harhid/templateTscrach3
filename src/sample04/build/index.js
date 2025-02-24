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
Pg.title = "【Sample04】 旗をクリックした後、ステージをクリック（タッチ）したら音を鳴らす";
const ImageNameJurassic = "Jurassic";
let stage;
Pg.preload = function ($pg) {
    return __awaiter(this, void 0, void 0, function* () {
        $pg.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
    });
};
Pg.prepare = function () {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
    });
};
Pg.setting = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // すぐに実行する。
        stage.Event.whenRightNow(function ($stage) {
            $stage.Image.add(ImageNameJurassic);
        });
    });
};
//# sourceMappingURL=index.js.map