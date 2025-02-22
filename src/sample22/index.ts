import {Pg,Lib,St,Images,Sounds} from "./importer.js";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Stage} from "@typeJS/scratchjs/s3Stage";
import type {S3Sprite} from "@typeJS/scratchjs/s3Sprite";

Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける"

Pg.preload = async function preload($this:S3PlayGround) {
    $this.Image.load('../assets/Jurassic.svg','Jurassic');
    $this.Sound.load('../assets/Chill.wav','Chill');
    $this.Image.load('../assets/cat.svg','Cat');
}
Pg.prepare = async function prepare($this:S3PlayGround) {
    St.stage = new Lib.Stage();
    St.stage.Sound.add( Images.Jurassic );
    St.cat = new Lib.Sprite("Cat", {scale:{x:200,y:200}});//サイズを２倍にしています
    St.cat.Image.add(Images.Cat);
}

Pg.setting = async function setting() {

    St.stage.Event.whenFlag(async function($this:S3Stage){
        await $this.Sound.add( Sounds.Chill, { 'volume' : 20 } );
        await $this.Control.while(true, async ()=>{
            await $this.Sound.playUntilDone();
        });
    })
    
    // ネコにさわったらお話する
    St.cat.Event.whenFlag( async function(){
        this.__waitTouching = false;
        const words = `なになに？どうしたの？`;
        const properties = {'pitch': 2, 'volume': 100}
        this.while(true, async _=>{
            if( this.isMouseTouching() ) {
                this.say(words);
                await this.broadcastAndWait('SPEECH', words, properties, 'male');
                
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                //await Libs.waitWhile( ()=>this.isMouseTouching()); 
            }else{
                this.say(""); // フキダシを消す
            }
        });
    });
    // ネコをクリックしたらお話する
    let catSpeeking = false;
    St.cat.Event.whenClicked(async function($this:S3Sprite){
        const words = `そこそこ。そこがかゆいの。`;
        const properties = {'pitch': 1.7, 'volume': 500}
        if(catSpeeking === false){
            catSpeeking = true;
            await $this.Event.broadcastAndWait('SPEECH', words, properties, 'female');
            catSpeeking = false;
        }
    });
    
    St.cat.Event.whenBroadcastReceived('SPEECH', async function(words:string, properties:any, gender:string='male', locale:string='ja-JP') {
        // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
        const $this:S3Sprite = this;
        await $this.Extensions.speechAndWait(words, properties, gender, locale);
    });

}