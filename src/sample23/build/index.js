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
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample23】ボールがパドルに触れたら跳ね返る";
const NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const BallA = "BallA";
const Paddle = "Paddle";
let stage;
let ball, paddle;
let score = 0;
/**
 * 【課題】
 * ball のコスチュームにすると 端に触れたときに動きが止まりがち
 * これはバグである
 */
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Neon Tunnel.png', NeonTunnel);
        $this.Sound.load('../assets/Chill.wav', Chill);
        $this.Image.load('../assets/ball-a.svg', BallA);
        $this.Image.load('../assets/paddle.svg', Paddle);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(NeonTunnel);
        ball = new Lib.Sprite("Cat");
        ball.Image.add(BallA);
        paddle = new Lib.Sprite("Paddle");
        paddle.Image.add(Paddle);
        paddle.Looks.hide();
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield $this.Sound.add(Chill);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
                yield $this.Control.while(true, () => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        const BallSpeed = 10;
        ball.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Motion.pointInDirection(40);
                $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.moveSteps(BallSpeed);
                    $this.Motion.ifOnEdgeBounds();
                    if ($this.Sensing.isTouchingEdge()) {
                        const randomDegree = Lib.getRandomValueInRange(-15, 15);
                        $this.Motion.turnRightDegrees(randomDegree);
                    }
                }));
            });
        });
        ball.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                score = 0;
                $this.Event.whenBroadcastReceived("TOUCH", () => {
                    score += 1;
                    const randomDegree = Lib.getRandomValueInRange(150, 200);
                    $this.Motion.turnRightDegrees(randomDegree);
                });
            });
        });
        paddle.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    $this.Control.clone();
                    yield Lib.wait(2 * 1000);
                }));
            });
        });
        paddle.Control.whenCloned(function ($clone) {
            return __awaiter(this, void 0, void 0, function* () {
                $clone.Motion.gotoRandomPosition();
                $clone.Looks.show();
                $clone.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($clone.Sensing.ifTouchingTarget(ball)) {
                        $clone.Event.broadcast('TOUCH');
                        $clone.Control.remove();
                    }
                }));
            });
        });
    });
};
//# sourceMappingURL=index.js.map