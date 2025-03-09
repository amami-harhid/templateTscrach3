import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";
let stage;
let cat;
Pg.preload = async function preload() {
    this.Image.load('../assets/Jurassic.svg', 'Jurassic');
    this.Sound.load('../assets/Chill.wav', 'Chill');
    this.Image.load('../assets/cat.svg', 'Cat');
};
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add(Jurassic);
    cat = new Lib.Sprite("Cat", { scale: { x: 200, y: 200 } }); //サイズを２倍にしています
    cat.Image.add(Cat);
};
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function* () {
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
        for (;;) {
            await this.Sound.playUntilDone();
            yield;
        }
    });
    // ネコにさわったらお話する
    cat.Event.whenFlag(async function* () {
        const words = `なになに？どうしたの？`;
        const properties = { 'pitch': 2, 'volume': 100 };
        while (true) {
            if (this.Sensing.isMouseTouching()) {
                this.Looks.say(words);
                await this.Event.broadcastAndWait('SPEECH', words, properties, 'male');
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                // await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching()); 
            }
            else {
                this.Looks.say(""); // フキダシを消す
            }
            yield;
        }
    });
    // ネコをクリックしたらお話する
    let catSpeeking = false;
    cat.Event.whenClicked(async function () {
        const words = `そこそこ。そこがかゆいの。`;
        const properties = { 'pitch': 1.7, 'volume': 500 };
        if (catSpeeking === false) {
            catSpeeking = true;
            await this.Event.broadcastAndWait('SPEECH', words, properties, 'female');
            catSpeeking = false;
        }
    });
    cat.Event.whenBroadcastReceived('SPEECH', async function (words, properties, gender = 'male', locale = 'ja-JP') {
        // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
        await this.Extensions.speechAndWait(words, properties, gender, locale);
    });
};
//# sourceMappingURL=index.js.map