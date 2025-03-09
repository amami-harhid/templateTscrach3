/**
 * Sample21
 * Scratch3 スピーチの実験
 * 
 * Scratch3のスピーチは 次の仕組みです
 * 
 * https://github.com/scratchfoundation/scratch-vm/blob/develop/src/extensions/scratch3_text2speech/index.js#L742
 *
 * (1) URL を組み立てる
 * (2) fetchして音をGETする
 * (3) 音を soundPlayer に食わせて
 * (4) ピッチや音量を与えて 再生する
 * (5) soundPlayer.play() の中で stop を EMIT している。それを受けて SoundPlayerをdeleteしている。
 * 
 * ■ ja-JP, male, あいうえお 
 * https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=male&text=%E3%81%82%E3%81%84%E3%81%86%E3%81%88%E3%81%8A
 * 
 */

import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample21】スピーチ機能：ネコに触る、タッチするとお話しをす"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('../assets/Jurassic.svg', Jurassic);
    this.Sound.load('../assets/Chill.wav', Chill);
    this.Image.load('../assets/cat.svg', Cat);
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    cat = new Lib.Sprite("Cat");
    cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*( this: S3Stage ){

        await this.Sound.add( Chill );
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20 )
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    })
    
    // ネコにさわったらお話する
    cat.Event.whenFlag( async function*( this: S3Sprite ){
        const words = `おっと`;
        const properties = {'pitch': 2, 'volume': 100}
        while(true){
            if( this.Sensing.isMouseTouching() ) {
                this.Event.broadcast('SPEAK', words, properties, 'male');
                
                // 「送って待つ」ではないので次のループに進ませないように、
                // 「マウスタッチしない迄待つ」をする。
                await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching() ); 
            }
            yield;
        }
    });
    // ネコをクリックしたらお話する
    cat.Event.whenClicked(function( this: S3Sprite ){
        const words = `そこそこ`;
        const properties = {'pitch': 1.7, 'volume': 500}
        this.Event.broadcast('SPEAK', words, properties, 'female')
    });
    
    /** SPEAK を受信したらスピーチする */
    cat.Event.whenBroadcastReceived('SPEAK', 
                    async function(this:S3Sprite, 
                                    words:string, 
                                    properties:{'pitch': number, 'volume': number}, 
                                    gender='male', 
                                    locale='ja-JP'
                                ) {
        this.Extensions.speech(words, properties, gender, locale);

    });
}