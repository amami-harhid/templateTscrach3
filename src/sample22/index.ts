import {Pg,Lib} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;


Pg.preload = async function preload($this:S3PlayGround) {
    $this.Image.load('../assets/Jurassic.svg','Jurassic');
    $this.Sound.load('../assets/Chill.wav','Chill');
    $this.Image.load('../assets/cat.svg','Cat');
}
Pg.prepare = async function prepare($this:S3PlayGround) {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    cat = new Lib.Sprite("Cat", {scale:{x:200,y:200}});//サイズを２倍にしています
    cat.Image.add( Cat );
}

Pg.setting = async function setting() {

    stage.Event.whenFlag(async function($this:S3Stage){
        await $this.Sound.add( Chill );
        $this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
        await $this.Control.while(true, async ()=>{
            await $this.Sound.playUntilDone();
        });
    })
    
    // ネコにさわったらお話する
    cat.Event.whenFlag( async function(){
        this.__waitTouching = false;
        const words = `なになに？どうしたの？`;
        const properties = {'pitch': 2, 'volume': 100}
        this.C.while(true, async _=>{
            if( this.Sensing.isMouseTouching() ) {
                this.Looks.say(words);
                await this.Event.broadcastAndWait('SPEECH', words, properties, 'male');
                
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                //await Libs.waitWhile( ()=>this.isMouseTouching()); 
            }else{
                this.Looks.say(""); // フキダシを消す
            }
        });
    });
    // ネコをクリックしたらお話する
    let catSpeeking = false;
    cat.Event.whenClicked(async function($this:S3Sprite){
        const words = `そこそこ。そこがかゆいの。`;
        const properties = {'pitch': 1.7, 'volume': 500}
        if(catSpeeking === false){
            catSpeeking = true;
            await $this.Event.broadcastAndWait('SPEECH', words, properties, 'female');
            catSpeeking = false;
        }
    });
    
    cat.Event.whenBroadcastReceived('SPEECH', async function(words:string, properties:any, gender:string='male', locale:string='ja-JP') {
        // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
        const $this:S3Sprite = this;
        await $this.Extensions.speechAndWait(words, properties, gender, locale);
    });

}