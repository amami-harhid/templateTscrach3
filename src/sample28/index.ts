/**
 * sample28
 * スプライトをクリックしたとき、ステージをクリックしたときに
 * 質問を出す。
 */
import {Pg, Lib} from "tscratch3likejs/s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample28】質問をする(ネコをクリック、ステージをクリック)"

const Jurassic01:string = "Jurassic01";
const Chill:string = "Chill";
const Cat01:string = "Cat01";

let stage: S3Stage;
let cat: S3Sprite
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic01 );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat01 );
}
Pg.prepare = async function prepare() {

    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( Jurassic01 );
    // Chill を追加
    await stage.Sound.add( Chill );

    // スプライト(ネコ)を作る
    cat = new Lib.Sprite("cat");
    // コスチュームを追加
    await cat.Image.add( Cat01 );
}

Pg.setting = async function setting() {

    /**
     * 旗を押されたときの動き
     * STARTメッセージを送る
     */
    cat.Event.whenFlag(async function(this:S3Sprite){
        await this.Looks.sayForSecs('ステージやネコをクリックすると質問をするよ',2);
        await this.Looks.sayForSecs('連続してクリックすると前回の質問応答の後に質問が続くよ',2);
        await this.Looks.sayForSecs('答えはコンソールへ出力するよ',2);
        this.Looks.say('');
        // メッセージを送る
        this.Event.broadcast('START');
    });

    /**
     * STARTを受け取ったときの動き（ステージ） 
     */ 
    stage.Event.whenBroadcastReceived('START', async function*(this:S3Stage){
        // 音量 10
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 10);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })

    /**
     * STARTを受け取ったときの動き（ステージ） 
     */ 
    stage.Event.whenBroadcastReceived('START', async function(this:S3Stage){
        // STARTを受け取ったら クリックの動きを始める
        this.Event.whenClicked(async function(this:S3Stage){
            const answer = await this.Sensing.askAndWait('ステージから質問をするよ');
            console.log(`ステージからの質問への答えは 『${answer}』でした`);
        });
    });

    /**
     * STARTを受け取ったときの動き（ネコ） 
     */ 
    cat.Event.whenBroadcastReceived('START', async function(this:S3Sprite){
        // STARTを受け取ったら クリックの動きを始める
        this.Event.whenClicked(async function(this:S3Sprite){
            const answer = await this.Sensing.askAndWait('ネコから質問をするよ');
            console.log(`ネコからの質問への答えは 『${answer}』でした`);
        });
    });


}
