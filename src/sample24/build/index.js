/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample24】上に10回、下に10回移動を繰り返す";
const NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const BallA = "BallA";
let stage;
let ball;
Pg.preload = async function preload() {
    this.Image.load('../assets/Neon Tunnel.png', NeonTunnel);
    this.Sound.load('../assets/Chill.wav', Chill);
    this.Image.load('../assets/ball-a.svg', BallA);
};
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add(NeonTunnel);
    // スプライト(ball)を作る
    ball = new Lib.Sprite("ball");
    // コスチュームを追加
    await ball.Image.add(BallA);
    // 大きさを 横120%,縦120% にする
    ball.Looks.setSize(120, 120);
};
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function () {
        // Chill を追加
        await this.Sound.add(Chill);
        // 音量を 5にする
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        await this.Control.wait(1);
        this.Event.broadcast('START');
    });
    stage.Event.whenBroadcastReceived('START', async function* () {
        // ずっと繰り返す
        for (;;) {
            // 終わるまで鳴らす
            await this.Sound.playUntilDone();
            yield;
        }
    });
    ball.Event.whenFlag(async function () {
        this.Motion.setXY(0, 0);
    });
    ball.Event.whenBroadcastReceived('START', async function* () {
        // 上に5回移動
        for (const _ of Lib.times(5)) {
            this.Motion.changeY(+10);
            yield;
        }
        // ずっと繰り返す
        for (;;) {
            // 下に10回移動
            for (const _ of Lib.times(10)) {
                this.Motion.changeY(-10);
                yield;
            }
            // 上に10回移動
            for (const _ of Lib.times(10)) {
                this.Motion.changeY(+10);
                yield;
            }
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map