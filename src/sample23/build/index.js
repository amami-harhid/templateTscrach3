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
const Block = "Block";
const Line = "Line";
const Pew = "Pew";
let stage;
let ball, paddle, block, line;
let score = 0;
Pg.preload = function preload($this) {
    return __awaiter(this, void 0, void 0, function* () {
        $this.Image.load('../assets/Neon Tunnel.png', NeonTunnel);
        $this.Sound.load('../assets/Chill.wav', Chill);
        $this.Image.load('../assets/ball-a.svg', BallA);
        $this.Image.load('../assets/paddle.svg', Paddle);
        $this.Image.load('../assets/button3-b.svg', Block);
        $this.Image.load('../assets/line.svg', Line);
        $this.Sound.load('../assets/Pew.wav', Pew);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(NeonTunnel);
        ball = new Lib.Sprite("cat");
        ball.Image.add(BallA);
        ball.Motion.setY(-100);
        ball.Looks.setSize(50, 50);
        paddle = new Lib.Sprite("paddle");
        paddle.Image.add(Paddle);
        paddle.Motion.setXY(0, -140);
        block = new Lib.Sprite("block");
        block.Image.add(Block);
        block.Looks.setSize({ x: 50, y: 50 });
        block.Motion.setXY(-220, 180);
        block.Looks.hide();
        line = new Lib.Sprite("line");
        line.Image.add(Line);
        line.Motion.setXY(0, -170);
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
        const InitDirection = 25;
        ball.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Motion.pointInDirection(InitDirection);
                yield $this.Control.waitUntil(() => Lib.anyKeyIsDown());
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
                $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isTouchingTarget(paddle)) {
                        $this.Motion.turnRightDegrees(Lib.getRandomValueInRange(-40, 40) + 180);
                        $this.Motion.moveSteps(BallSpeed);
                        yield Lib.wait(0.5 * 1000);
                    }
                }));
            });
        });
        line.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isTouchingTarget(ball)) {
                        // Ball に触れたとき
                        Pg.Control.stopAll();
                    }
                }));
            });
        });
        paddle.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    const mousePos = Lib.mousePosition;
                    const selfPosition = $this.Motion.getCurrentPosition();
                    $this.Motion.moveTo(mousePos.x, selfPosition.y);
                }));
            });
        });
        block.Event.whenFlag(($this) => __awaiter(this, void 0, void 0, function* () {
            yield $this.Sound.add(Pew);
            const pos = $this.Motion.getCurrentPosition();
            // Size変更した直後のdrawingDimensionsは変更適用後を取得できない
            // これはバグかも。--> スレッド１回ループしたら適用されるっぽい。
            // Size変更時は update() をかけるべきかも。
            const demension = $this.Looks.drawingDimensions();
            let y = 0;
            $this.Control.repeat(5, () => {
                let x = 0;
                $this.Control.repeat(10, () => {
                    const blkPos = { x: pos.x + x * demension.width, y: pos.y + (-y) * demension.height };
                    $this.Control.clone({ position: blkPos });
                    x += 1;
                });
                y += 1;
            });
        }));
        block.Control.whenCloned(($this) => __awaiter(this, void 0, void 0, function* () {
            $this.Looks.show();
            yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                if ($this.Sensing.isTouchingTarget(ball)) {
                    score += 1;
                    console.log('Touching score=' + score);
                    $this.Sound.play();
                    $this.Looks.hide();
                    Lib.Loop.break();
                }
            }));
            //await Lib.wait(0.5*1000);
            $this.Control.remove();
        }));
    });
};
//# sourceMappingURL=index.js.map