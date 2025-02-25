/**
 * Sample18
 *
 * キーボード操作
 * 左矢印、右矢印で、シップが左右に動く。
 * スペースキーで 弾を発射（発射する弾はクローン）
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
Pg.title = "【Sample18】左右矢印でシップが左右に動き、スペースキーで弾を発射。";
const Jurassic = "Jurassic";
const Chill = "Chill";
const Cross01 = "Cross01";
const Cross02 = "Cross02";
const Pew = "Pew";
let stage;
let cross;
Pg.preload = function preload($play) {
    return __awaiter(this, void 0, void 0, function* () {
        $play.Image.load('../assets/Jurassic.svg', Jurassic);
        $play.Sound.load('../assets/Chill.wav', Chill);
        $play.Image.load('../assets/cross1.svg', Cross01);
        $play.Image.load('../assets/cross2.svg', Cross02);
        $play.Sound.load('../assets/Pew.wav', Pew);
    });
};
Pg.prepare = function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        stage = new Lib.Stage();
        stage.Image.add(Jurassic);
        cross = new Lib.Sprite("Cross");
        cross.Motion.setY(-Lib.stageHeight / 2 * 0.6);
        cross.Image.add(Cross01);
        cross.Image.add(Cross02);
        cross.Looks.setSize({ x: 100, y: 100 });
    });
};
Pg.setting = function setting() {
    return __awaiter(this, void 0, void 0, function* () {
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はstageである。
                $this.Sound.add(Chill).then(me => {
                    me.Sound.setOption(Lib.SoundOption.VOLUME, 50);
                });
            });
        });
        cross.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                yield $this.Sound.add(Pew);
                $this.Sound.setOption(Lib.SoundOption.VOLUME, 10);
                $this.Sound.setOption(Lib.SoundOption.PITCH, 150);
            });
        });
        stage.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                // function() の中なので、【this】はProxy(stage)である。
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    yield $this.Sound.playUntilDone();
                }));
            });
        });
        const MoveSteps = 15;
        cross.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Motion.pointInDirection(90);
                $this.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    if (Lib.keyIsDown('RightArrow')) {
                        $this.Motion.moveSteps(MoveSteps);
                    }
                    if (Lib.keyIsDown('LeftArrow')) {
                        $this.Motion.moveSteps(-MoveSteps);
                    }
                }));
            });
        });
        cross.Event.whenFlag(function ($this) {
            return __awaiter(this, void 0, void 0, function* () {
                $this.Control.while(true, (_) => __awaiter(this, void 0, void 0, function* () {
                    // 矢印キーを押しながら、スペースキーを検知させたい
                    if (Lib.keyIsDown('Space')) {
                        $this.Sound.play();
                        const options = { scale: { x: 20, y: 20 }, direction: 0 };
                        $this.Control.clone(options);
                        //次をコメントアウトしているときは キー押下中連続してクローン作る  
                        //await Libs.waitWhile( ()=>Libs.keyIsDown('Space'));
                    }
                }));
            });
        });
        cross.Control.whenCloned(function (clone) {
            return __awaiter(this, void 0, void 0, function* () {
                const { height } = clone.Looks.drawingDimensions();
                clone.Motion.changeY(height / 2);
                clone.Looks.nextCostume();
                clone.Looks.show();
            });
        });
        cross.Control.whenCloned(function (clone) {
            return __awaiter(this, void 0, void 0, function* () {
                // while の後に処理があるときは await 忘れないようにしましょう
                yield clone.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    clone.Motion.changeY(+10); // 10だけ上にする
                    if (clone.Sensing.isTouchingEdge()) {
                        Lib.Loop.break();
                    }
                }));
                clone.Control.remove();
            });
        });
        const TURN_RIGHT_DEGREE = 25;
        cross.Control.whenCloned(function (clone) {
            return __awaiter(this, void 0, void 0, function* () {
                // while の後に処理があるときは await 忘れないようにしましょう
                clone.Sound.setOption(Lib.SoundOption.VOLUME, 100);
                clone.Sound.setOption(Lib.SoundOption.PITCH, 90);
                yield clone.Control.forever((_) => __awaiter(this, void 0, void 0, function* () {
                    clone.Motion.turnRightDegrees(TURN_RIGHT_DEGREE);
                    if (clone.Sensing.isTouchingEdge()) {
                        clone.Sound.play();
                        yield Lib.wait(500);
                        Lib.Loop.break();
                    }
                }));
                clone.Control.remove();
            });
        });
    });
};
//# sourceMappingURL=index.js.map