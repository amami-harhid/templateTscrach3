/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
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
// Size変更した直後のdrawingDimensionsは変更適用後を取得できない
// これはバグかも。--> スレッド１回ループしたら適用されるっぽい。
// Size変更時は update() をかけるべきかも。
import { Pg, Lib } from "./importer.js";
Pg.title = "【Sample23】ボールがパドルに触れたら跳ね返る";
const NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const BallA = "BallA";
const Paddle = "Paddle";
const Block = "Block";
const Line = "Line";
const Pew = "Pew";
const YouWon = "YouWon";
const GameOver = "GameOver";
let stage;
let ball, paddle, block, line;
let title;
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
        $this.Image.load('./assets/YouWon.svg', YouWon);
        $this.Image.load('./assets/GameOver.svg', GameOver);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(NeonTunnel);
        ball = new Lib.Sprite("cat");
        ball.Image.add(BallA);
        ball.Motion.setXY(0, -100);
        ball.Looks.setSize(50, 50);
        paddle = new Lib.Sprite("paddle");
        paddle.Image.add(Paddle);
        paddle.Motion.setXY(0, -140);
        block = new Lib.Sprite("block");
        block.Image.add(Block);
        //    block.Looks.setSize({x:50, y:50});
        block.Motion.setXY(-220, 180);
        block.Looks.hide();
        line = new Lib.Sprite("line");
        line.Image.add(Line);
        line.Motion.setXY(0, -170);
        title = new Lib.Sprite("title");
        title.Image.add(YouWon);
        title.Image.add(GameOver);
        title.Looks.hide();
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
        ball.Event.whenBroadcastReceived('Start', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const $this = ball;
                score = 0;
                $this.Motion.pointInDirection(InitDirection);
                $this.Motion.setXY(0, -100);
                yield $this.Control.waitUntil(() => Lib.anyKeyIsDown());
                yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.moveSteps(BallSpeed);
                    $this.Motion.ifOnEdgeBounds();
                    if ($this.Sensing.isTouchingEdge()) {
                        const randomDegree = Lib.getRandomValueInRange(-25, 25);
                        $this.Motion.turnRightDegrees(randomDegree);
                    }
                }));
            });
        });
        ball.Event.whenBroadcastReceived('Start', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const $this = ball;
                yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isTouchingTarget(block)) {
                        $this.Motion.turnRightDegrees(Lib.getRandomValueInRange(-5, 5) + 180);
                    }
                }));
            });
        });
        ball.Event.whenBroadcastReceived('Start', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const $this = ball;
                yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isTouchingTarget(paddle)) {
                        $this.Motion.turnRightDegrees(Lib.getRandomValueInRange(-2, 2) + 180);
                        $this.Motion.moveSteps(BallSpeed * 2);
                        yield Lib.wait(0.2 * 1000);
                    }
                }));
            });
        });
        line.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    if ($this.Sensing.isTouchingTarget(ball)) {
                        // Ball に触れたとき
                        $this.Event.broadcast(GameOver);
                        Lib.Loop.break();
                    }
                }));
            });
        });
        paddle.Event.whenBroadcastReceived('Start', function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('paddle start');
                const $this = paddle;
                // whenBroadcastReceivedのなかで foreverが使えない様子
                // whenFlagなどの中では使える。バグです。
                yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                    const mousePos = Lib.mousePosition;
                    const selfPosition = $this.Motion.getCurrentPosition();
                    $this.Motion.moveTo(mousePos.x, selfPosition.y);
                    //const ballPosition = ball.Motion.getCurrentPosition();
                    //$this.Motion.moveTo(ballPosition.x, selfPosition.y);
                }));
            });
        });
        let blockCount = 0;
        block.Event.whenFlag(($this) => __awaiter(this, void 0, void 0, function* () {
            yield $this.Sound.add(Pew);
            $this.Looks.setSize({ x: 50, y: 50 });
            const pos = $this.Motion.getCurrentPosition();
            const demension = $this.Looks.drawingDimensions();
            let y = 0;
            blockCount = 0;
            yield $this.Control.repeat(3, () => __awaiter(this, void 0, void 0, function* () {
                let x = 0;
                yield $this.Control.repeat(10, () => __awaiter(this, void 0, void 0, function* () {
                    const blkPos = { x: pos.x + x * demension.width, y: pos.y + (-y) * demension.height };
                    yield $this.Control.clone({ position: blkPos });
                    x += 1;
                }));
                y += 1;
            }));
            $this.Event.broadcast('Start');
        }));
        block.Control.whenCloned(($this) => __awaiter(this, void 0, void 0, function* () {
            blockCount += 1;
            $this.Looks.show();
            yield $this.Control.forever(() => __awaiter(this, void 0, void 0, function* () {
                if ($this.Sensing.isTouchingTarget(ball)) {
                    score += 1;
                    //console.log('Touching score='+score);
                    $this.Sound.play();
                    $this.Looks.hide();
                    Lib.Loop.break();
                }
            }));
            if (score == blockCount) {
                $this.Event.broadcast(YouWon);
            }
            $this.Control.remove();
        }));
        title.Event.whenFlag(($this) => __awaiter(this, void 0, void 0, function* () {
            $this.Looks.hide();
        }));
        title.Event.whenBroadcastReceived(YouWon, () => __awaiter(this, void 0, void 0, function* () {
            title.Looks.switchCostume(YouWon);
            title.Looks.show();
            Pg.Control.stopAll();
        }));
        title.Event.whenBroadcastReceived(GameOver, () => __awaiter(this, void 0, void 0, function* () {
            title.Looks.switchCostume(GameOver);
            title.Looks.show();
            Pg.Control.stopAll();
        }));
    });
};
//# sourceMappingURL=index.js.map