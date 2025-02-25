/**
 * Sample21
 * Scratch3 スピーチの実験
 *
 * Scratch3のスピーチは 次の仕組みです
 *
 * https://github.com/scratchfoundation/scratch-vm/blob/develop/src/extensions/scratch3_text2speech/index.js#L742
 *
 * (1) URL を組み立てる
 * (2) fetchして音をGETする
 * (3) 音を soundPlayer に食わせて
 * (4) ピッチや音量を与えて 再生する
 * (5) soundPlayer.play() の中で stop を EMIT している。それを受けて SoundPlayerをdeleteしている。
 *
 * ■ ja-JP, male, あいうえお
 * https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=male&text=%E3%81%82%E3%81%84%E3%81%86%E3%81%88%E3%81%8A
 *
 */
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
Pg.title = "【Sample21】スピーチ機能：ネコに触る、タッチするとお話しをす";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Jurassic.svg', Jurassic);
        $this.Sound.load('../assets/Chill.wav', Chill);
        $this.Image.load('../assets/cat.svg', Cat);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cat = new Lib.Sprite("Cat");
        cat.Image.add(Cat);
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield $this.Sound.add(Chill);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
                yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        // ネコにさわったらお話する
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                const words = `おっと`;
                const properties = { 'pitch': 2, 'volume': 100 };
                $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isMouseTouching()) {
                        $this.Event.broadcast('SPEAK', words, properties, 'male');
                        // 「送って待つ」ではないので次のループに進ませないように、
                        // 「マウスタッチしない迄待つ」をする。
                        yield Lib.waitWhile(() => $this.Sensing.isMouseTouching());
                    }
                }));
            });
        });
        // ネコをクリックしたらお話する
        cat.Event.whenClicked(function ($this) {
            const words = `そこそこ`;
            const properties = { 'pitch': 1.7, 'volume': 500 };
            $this.Event.broadcast('SPEAK', words, properties, 'female');
        });
        /** SPEAK を受信したらスピーチする */
        cat.Event.whenBroadcastReceived('SPEAK', function (words_1, properties_1) {
            return __awaiter(this, arguments, void 0, function* (words, properties, gender = 'male', locale = 'ja-JP') {
                const $this = this;
                $this.Extensions.speech(words, properties, gender, locale);
            });
        });
    });
};
//# sourceMappingURL=index.js.map