/**
 * Sample19
 * 
 * 吹き出し(SAY, THINK)
 */

import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample19】いろんな文字列でフキダシ(言う, 思う)。20秒間。"

const Jurassic:string = "Jurassic";
const Cat1:string = "Cat1";
const Cat2:string = "Cat2";

let stage: S3Stage;
let cat: S3Sprite;
let cat2: S3Sprite;

import {bubble, bubbleTextArr, bubble2, bubbleTextArr2} from './bubble.js'

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
    this.Image.load('../assets/cat.svg', Cat1 );
    this.Image.load('../assets/cat2.svg', Cat2 );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );

    cat = new Lib.Sprite("Cat");
    await cat.Image.add( Cat1 );
    await cat.Image.add( Cat2 );
    cat.Motion.pointInDirection(75);
    cat2 = new Lib.Sprite("Cat2");
    await cat2.Image.add( Cat1 );
    await cat2.Image.add( Cat2 );
    cat2.Motion.pointInDirection(115);
    cat2.Motion.moveTo({x: -20, y: -120});
}
Pg.setting = async function setting() {

    const WALK_STEP = 1;
    cat.Event.whenFlag( async function*( this: S3Sprite ) {
        while(true){
            this.Motion.ifOnEdgeBounds();
            this.Motion.moveSteps(WALK_STEP);
            if( bubble.exit === true) {
                break;
            }
            yield;
        }
    });
    cat.Event.whenFlag( async function*( this: S3Sprite ) {
        await this.Control.wait(100); // <--- なぜ 100ms 待つようにしたのか？
        while(true){
            this.Looks.nextCostume();
            await this.Control.wait(100)
            if( bubble.exit === true) {
                break;
            }
            yield;
        }
    });
    cat.Event.whenFlag( async function*( this: S3Sprite ) {
        await this.Control.wait(100); // <--- なぜ 100ms 待つようにしたのか？
        const MOVE_STEP = 2;
        const SCALE = {MIN:50, MAX:150};
        while(true){
            while(true){
                this.Looks.changeSizeBy({x:-MOVE_STEP, y: -MOVE_STEP});
                const scale = this.Looks.getSize();
                if(scale.x < SCALE.MIN) break;
                yield;
            }
            while(true){
                this.Looks.changeSizeBy({x: +MOVE_STEP, y: +MOVE_STEP});
                const scale = this.Looks.getSize();
                if(scale.x > SCALE.MAX) break;
                yield;
            }
            if( bubble.exit === true) {
                break;
            }
            yield;
        }
    });
    cat.Event.whenFlag( async function*( this: S3Sprite ) {
        let counter = 0;
        while(true){
            const text = bubbleTextArr[ Math.ceil(Math.random() * bubbleTextArr.length) - 1 ];
            if( this.Sensing.isTouchingEdge() ) {
                counter += 1;
                counter = counter % 2;
            }
            if( counter == 0 ) {
                this.Looks.say(text);

            }else{
                this.Looks.think(text);

            }
            if( bubble.exit === true) {
                this.Looks.say();
                break;
            }
            await this.Control.wait(500); // <--- なぜ 500ms待つのか？
            yield;
        }
    });
    cat2.Event.whenFlag( async function*( this: S3Sprite ) {
        while(true){
            this.Motion.ifOnEdgeBounds();
            this.Motion.moveSteps(WALK_STEP);
            if( bubble.exit === true) {
                break;
            }
            yield;
        }
    });
    cat2.Event.whenFlag( async function*( this: S3Sprite ) {
        const scale = {x: 60, y:60};
        while(true){
            const text = bubbleTextArr2[ Math.ceil(Math.random() * bubbleTextArr2.length) - 1 ]
            this.Looks.think(text, {scale:scale});
            if( bubble2.exit === true) {
                this.Looks.say();
                break;
            }
            await this.Control.wait(500)
            yield;
        }
    });

    stage.Event.whenFlag( async function(this:S3Stage) {
        await this.Control.wait(20*1000); // 20秒たったらバブルループを終わらせる。
        bubble.exit = true;
        bubble2.exit = true;
    });

}