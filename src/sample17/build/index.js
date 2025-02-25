var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Sample17
 * スプライト（CROSS) : 右側に回転 、マウスポインターに触れたら 蝶のクローンを作る（クローンの位置はマウスポインターの位置）
 * スプライト（butterfly) : 非表示、クローンされたら表示に切り替える、クローンは指定した時間数（ﾐﾘ秒）だけ生きている。
 *
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample17】十字にマウスポインターが触れたら 蝶のクローンを作る";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cross01 = "Cross01";
const Cross02 = "Cross02";
const Butterfly01 = "Butterfly01";
const Butterfly02 = "Butterfly02";
let stage;
let cross;
let butterfly;
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Jurassic.svg', Jurassic);
        $this.Sound.load('../assets/Chill.wav', Chill);
        $this.Image.load('../assets/cross1.svg', Cross01);
        $this.Image.load('../assets/cross2.svg', Cross02);
        $this.Image.load('../assets/butterfly1.svg', Butterfly01);
        $this.Image.load('../assets/butterfly2.svg', Butterfly02);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cross = new Lib.Sprite("Cross");
        cross.Image.add(Cross01);
        cross.Image.add(Cross02);
        cross.Looks.setSize({ x: 300, y: 300 });
        butterfly = new Lib.Sprite("Butterfly");
        butterfly.Image.add(Butterfly01);
        butterfly.Image.add(Butterfly02);
        butterfly.Looks.hide();
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はstageである。
                yield $this.Sound.add(Chill);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
                // function() の中なので、【this】はProxy(stage)である。
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        const ChangeDirection = 1;
        cross.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.turnRightDegrees(ChangeDirection);
                }));
            });
        });
        cross.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isMouseTouching()) {
                        $this.Looks.nextCostume();
                        yield Lib.waitWhile(() => $this.Sensing.isMouseTouching());
                        $this.Looks.nextCostume();
                    }
                }));
            });
        });
        cross.Event.whenFlag(function ($cross) {
            return __awaiter(this, void 0, void 0, function* () {
                $cross.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    if ($cross.Sensing.isMouseTouching()) {
                        const mousePosition = Lib.mousePosition;
                        butterfly.Motion.gotoXY(mousePosition);
                        const scale = { x: 15, y: 15 };
                        butterfly.Looks.setSize(scale);
                        butterfly.Motion.pointInDirection(Lib.randomDirection);
                        yield butterfly.Control.clone();
                        // 下をコメントアウトすると、十字にさわっている間は クローンを作り続ける
                        // 下を生かすと、十字に触ったときにクローンを作るが、次には進まない
                        //await Libs.waitUntil( this.isNotMouseTouching, this); // 「マウスポインターが触らない」迄待つ。
                        yield Lib.wait(100); // 100ミリ秒待つ。 <== クローン発生する間隔
                    }
                }));
            });
        });
        butterfly.Control.whenCloned(function ($this) {
            const clone = $this;
            clone.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                if (clone.life > 0) {
                    this.Looks.nextCostume();
                    yield Lib.wait(50);
                }
                else {
                    Lib.Loop.break();
                }
            }));
        });
        butterfly.Control.whenCloned(function ($this) {
            const clone = $this;
            clone.Looks.show();
            clone.life = 5000; // ミリ秒。クローンが生きている時間。（およその時間）
            clone.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                // ランダムな場所
                const randomPoint = Lib.randomPoint;
                // １秒でどこかに行く。
                yield $this.Motion.glideToPosition(5, randomPoint.x, randomPoint.y);
                // ライフがゼロになったら「繰り返し」を抜ける
                if ($this.life < 0) {
                    Lib.Loop.break();
                }
            }));
        });
    });
};
//# sourceMappingURL=index.js.map