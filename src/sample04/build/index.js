import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample04】 旗をクリックした後、ステージをクリック（タッチ）したら音を鳴らす";
const ImageNameJurassic = "Jurassic";
const Chill = "Chill";
let stage;
Pg.preload = async function () {
    this.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
    this.Sound.load('../assets/Chill.wav', Chill);
};
Pg.prepare = async function () {
    stage = new Lib.Stage();
    await stage.Image.add(ImageNameJurassic);
};
Pg.setting = async function () {
    // すぐに実行する。
    stage.Event.whenFlag(async function () {
        await this.Sound.add(Chill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 100);
    });
    // ステージをクリックしたときの動作
    // 音が鳴っている最中に再度クリックしたときの
    // 動作に着目してください（前回のイベント=音を鳴らす)をキャンセルした
    // うえで音が鳴り始めます。
    stage.Event.whenClicked(async function* () {
        // 「終わるまで音を鳴らす」をずっと繰り返す
        for (;;) {
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone();
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map