/**
 * sample24
 * 上下・左右に移動を繰り返す
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample24】上下・左右に移動を繰り返す";
const NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const BallA = "BallA";
let stage;
let ball;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";
Pg.preload = async function preload() {
    this.Image.load(AssetHost + '/assets/Neon Tunnel.png', NeonTunnel);
    this.Sound.load(AssetHost + '/assets/Chill.wav', Chill);
    this.Image.load(AssetHost + '/assets/ball-a.svg', BallA);
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
    /**
     * 旗を押されたとき
     * 音を追加して、STARTメッセージを送る
     */
    stage.Event.whenFlag(async function () {
        // Chill を追加
        await this.Sound.add(Chill);
        // 音量を 5にする
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        await this.Control.wait(1);
        this.Event.broadcast('START');
    });
    /**
     * START を受け取ったとき
     * ずっと繰返し音を鳴らす
     */
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
    /**
     * START を受け取ったとき
     * 上下に動かす
     */
    ball.Event.whenBroadcastReceived('START', async function* () {
        // 上に5回移動
        for (const _ of Lib.Iterator(5)) {
            this.Motion.changeY(+10);
            yield;
        }
        // ずっと繰り返す
        for (;;) {
            // 下に10回移動
            for (const _ of Lib.Iterator(10)) {
                this.Motion.changeY(-10);
                yield;
            }
            // 上に10回移動
            for (const _ of Lib.Iterator(10)) {
                this.Motion.changeY(+10);
                yield;
            }
            yield;
        }
    });
    /**
     * START を受け取ったとき
     * 左右に動かす
     */
    ball.Event.whenBroadcastReceived('START', async function* () {
        // 右に5回移動
        for (const _ of Lib.Iterator(5)) {
            this.Motion.changeX(+10);
            yield;
        }
        // ずっと繰り返す
        for (;;) {
            // 左に10回移動
            for (const _ of Lib.Iterator(10)) {
                this.Motion.changeX(-10);
                yield;
            }
            // 右に10回移動
            for (const _ of Lib.Iterator(10)) {
                this.Motion.changeX(+10);
                yield;
            }
            yield;
        }
    });
};
//# sourceMappingURL=index.js.map