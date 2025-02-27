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
Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Jurassic.svg', 'Jurassic');
        $this.Sound.load('../assets/Chill.wav', 'Chill');
        $this.Image.load('../assets/cat.svg', 'Cat');
    });
};
Pg.prepare = function prepare($this) {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cat = new Lib.Sprite("Cat", { scale: { x: 200, y: 200 } }); //サイズを２倍にしています
        cat.Image.add(Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield $this.Sound.add(Chill);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
                yield $this.Control.while(true, () => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        // ネコにさわったらお話する
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                const words = `なになに？どうしたの？`;
                const properties = { 'pitch': 2, 'volume': 100 };
                $this.Control.while(true, (_) => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isMouseTouching()) {
                        $this.Looks.say(words);
                        yield $this.Event.broadcastAndWait('SPEECH', words, properties, 'male');
                        // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                        // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                        //await Libs.waitWhile( ()=>this.isMouseTouching()); 
                    }
                    else {
                        $this.Looks.say(""); // フキダシを消す
                    }
                }));
            });
        });
        // ネコをクリックしたらお話する
        let catSpeeking = false;
        cat.Event.whenClicked(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                const words = `そこそこ。そこがかゆいの。`;
                const properties = { 'pitch': 1.7, 'volume': 500 };
                if (catSpeeking === false) {
                    catSpeeking = true;
                    yield $this.Event.broadcastAndWait('SPEECH', words, properties, 'female');
                    catSpeeking = false;
                }
            });
        });
        cat.Event.whenBroadcastReceived('SPEECH', function (words_1, properties_1) {
            return __awaiter(this, arguments, void 0, function* (words, properties, gender = 'male', locale = 'ja-JP') {
                // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
                const $this = this;
                yield $this.Extensions.speechAndWait(words, properties, gender, locale);
            });
        });
    });
};
//# sourceMappingURL=index.js.map