var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pg, Libs, St, Images, Sounds } from "./importer.js";
Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける";
Pg.preload = function preload() {
    return __awaiter(this, void 0, void 0, function* () {
        this.loadImage('../assets/Jurassic.svg', 'Jurassic');
        this.loadSound('../assets/Chill.wav', 'Chill');
        this.loadImage('../assets/cat.svg', 'Cat');
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        St.stage = new Libs.Stage("stage");
        St.stage.addImage(Images.Jurassic);
        St.cat = new Libs.Sprite("Cat", { scale: { x: 200, y: 200 } }); //サイズを２倍にしています
        St.cat.addImage(Images.Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        St.stage.whenFlag(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.addSound(Sounds.Chill, { 'volume': 20 });
                yield this.while(true, () => __awaiter(this, void 0, void 0, function* () {
                    yield this.startSoundUntilDone();
                }));
            });
        });
        // ネコにさわったらお話する
        St.cat.whenFlag(function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.__waitTouching = false;
                const words = `なになに？どうしたの？`;
                const properties = { 'pitch': 2, 'volume': 100 };
                this.while(true, (_) => __awaiter(this, void 0, void 0, function* () {
                    if (this.isMouseTouching()) {
                        this.say(words);
                        yield this.broadcastAndWait('SPEECH', words, properties, 'male');
                        // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                        // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                        //await Libs.waitWhile( ()=>this.isMouseTouching()); 
                    }
                    else {
                        this.say(""); // フキダシを消す
                    }
                }));
            });
        });
        // ネコをクリックしたらお話する
        let catSpeeking = false;
        St.cat.whenClicked(function () {
            return __awaiter(this, void 0, void 0, function* () {
                const words = `そこそこ。そこがかゆいの。`;
                const properties = { 'pitch': 1.7, 'volume': 500 };
                if (catSpeeking === false) {
                    catSpeeking = true;
                    yield this.broadcastAndWait('SPEECH', words, properties, 'female');
                    catSpeeking = false;
                }
            });
        });
        St.cat.whenBroadcastReceived('SPEECH', function (words_1, properties_1) {
            return __awaiter(this, arguments, void 0, function* (words, properties, gender = 'male', locale = 'ja-JP') {
                // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
                const $this = this;
                yield $this.speechAndWait(words, properties, gender, locale);
            });
        });
    });
};
//# sourceMappingURL=index.js.map