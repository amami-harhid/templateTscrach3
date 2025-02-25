/**
 * Sample19
 *
 * 吹き出し(SAY, THINK)
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
Pg.title = "【Sample19】いろんな文字列でフキダシ(言う, 思う)。20秒間。";
const Jurassic = "Jurassic";
const Cat1 = "Cat1";
const Cat2 = "Cat2";
let stage;
let cat;
let cat2;
import { bubble, bubbleTextArr, bubble2, bubbleTextArr2 } from './bubble.js';
Pg.preload = function preload($pg) {
    return __awaiter(this, void 0, void 0, function* () {
        $pg.Image.load('../assets/Jurassic.svg', Jurassic);
        $pg.Image.load('../assets/cat.svg', Cat1);
        $pg.Image.load('../assets/cat2.svg', Cat2);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cat = new Lib.Sprite("Cat");
        cat.Image.add(Cat1);
        cat.Image.add(Cat2);
        cat.Motion.pointInDirection(75);
        cat2 = new Lib.Sprite("Cat2");
        cat2.Image.add(Cat1);
        cat2.Image.add(Cat2);
        cat2.Motion.pointInDirection(115);
        cat2.Motion.moveTo({ x: -20, y: -120 });
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        const WALK_STEP = 1;
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.ifOnEdgeBounds();
                    $this.Motion.moveSteps(WALK_STEP);
                    if (bubble.exit === true) {
                        Lib.Loop.break();
                    }
                }));
            });
        });
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Lib.wait(100);
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Looks.nextCostume();
                    yield Lib.wait(100);
                    if (bubble.exit === true) {
                        Lib.Loop.break();
                    }
                }));
            });
        });
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Lib.wait(100);
                const MOVE_STEP = 2;
                const SCALE = { MIN: 50, MAX: 150 };
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                        $this.Looks.changeSizeBy({ x: -MOVE_STEP, y: -MOVE_STEP });
                        const scale = $this.Looks.getSize();
                        if (scale.x < SCALE.MIN)
                            Lib.Loop.break();
                    }));
                    yield $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                        $this.Looks.changeSizeBy({ x: +MOVE_STEP, y: +MOVE_STEP });
                        const scale = $this.Looks.getSize();
                        if (scale.x > SCALE.MAX)
                            Lib.Loop.break();
                    }));
                    if (bubble.exit === true) {
                        Lib.Loop.break();
                    }
                }));
            });
        });
        cat.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                let counter = 0;
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    const text = bubbleTextArr[Math.ceil(Math.random() * bubbleTextArr.length) - 1];
                    if ($this.Sensing.isTouchingEdge()) {
                        counter += 1;
                        counter = counter % 2;
                    }
                    if (counter == 0) {
                        $this.Looks.say(text);
                    }
                    else {
                        $this.Looks.think(text);
                    }
                    if (bubble.exit === true) {
                        $this.Looks.say();
                        Lib.Loop.break();
                    }
                    yield Lib.wait(500);
                }));
            });
        });
        cat2.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    $this.Motion.ifOnEdgeBounds();
                    $this.Motion.moveSteps(WALK_STEP);
                    if (bubble.exit === true) {
                        Lib.Loop.break();
                    }
                }));
            });
        });
        cat2.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                let scale = { x: 60, y: 60 };
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    const text = bubbleTextArr2[Math.ceil(Math.random() * bubbleTextArr2.length) - 1];
                    $this.Looks.think(text, { scale: scale });
                    if (bubble2.exit === true) {
                        $this.Looks.say();
                        Lib.Loop.break();
                    }
                    yield Lib.wait(500);
                }));
            });
        });
        stage.Event.whenFlag(function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield Lib.wait(20 * 1000); // 20秒たったらバブルループを終わらせる。
                bubble.exit = true;
                bubble2.exit = true;
            });
        });
    });
};
//# sourceMappingURL=index.js.map