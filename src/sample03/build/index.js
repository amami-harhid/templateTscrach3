import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";
const ImageNameJurassic = "Jurassic";
const SoundNameChill = "Chill";
let stage;
Pg.preload = function () {
    this.Image.load('../assets/Jurassic.svg', ImageNameJurassic);
    this.Sound.load('../assets/Chill.wav', SoundNameChill);
};
Pg.prepare = function () {
    stage = new Lib.Stage();
    stage.Image.add(ImageNameJurassic);
};
Pg.setting = function () {
    // すぐに実行する。
    stage.Event.whenRightNow(async function () {
        // ここでの『this』は Proxy(stage)である。
        await this.Sound.add(SoundNameChill);
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 100);
    });
    stage.Event.whenFlag(async function* () {
        // 「終わるまで音を鳴らす」をずっと繰り返す
        while (true) {
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone();
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map