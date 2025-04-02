# Comparison with Scratch3 ( Scratch3 との比較 )

## Motion (動き)

#### Move () Steps ( 〇 歩動かす )
```typescript
S3Sprite.Motion.moveSteps( step : number ) :void;
```
#### Turn Right () degrees ( 右方向へ 〇度回す )

```typescript
Sprite.Motion.turnRightDegrees( degree : number ): void;
```

#### Turn Left () degrees ( 左方向へ 〇度回す )

```typescript
S3S3Sprite.Motion.turnLeftDegrees( degree : number ): void;
```

#### Go to randam position ( どこかの場所へ行く )

```typescript
S3Sprite.Motion.gotoRandomPosition():void;
```

#### Go to mouse position ( マウスのポインターへ行く)

```typescript
S3Sprite.Motion.gotoMousePosition() : void;
```

#### Go to other sprite position ( スプライトの場所へ行く )

```typescript
S3Sprite.Motion.gotoSprite( otherSprite: S3Sprite ) :void;
```

#### Go to x:(), y:()  ( x座標を〇、y座標を〇にする )

```typescript
S3Sprite.Motion.gotoXY( x: number, y: number ) : void;
```
#### Glide ()secs to x:(), y:() ( 〇秒で x座標を〇に,y座標を〇に変える)
```typescript
S3Sprite.Motion.glideToPosition(secs, mousePosition.x, mousePosition.y): Promise<void>;
```
```typescript
await sprite.Motion.glideToPosition(secs:number, x:number, y:number);
```

#### Glide ()secs to random position ( 〇秒でどこかの場所へ行く)
```typescript
S3Sprite.Motion.glideToPosition(secs, mousePosition.x, mousePosition.y): Promise<void>;
```

```typescript
const secs = 1.0; // 1秒
const randomPoint = Lib.randomPoint;
await sprite.Motion.glideToPosition(secs, randomPoint.x, randomPoint.y);
```

#### Glide ()secs to mouse pointer ( 〇秒でマウスのポインターへ行く)

```typescript
S3Sprite.Motion.glideToPosition(secs, mousePosition.x, mousePosition.y): Promise<void>;
```
```typescript
const secs = 1.0; // 1秒
const mousePosition = Lib.mousePosition;
await sprite.Motion.glideToPosition(secs, mousePosition.x, mousePosition.y);
```

#### Point in derection() ( 〇度に向ける )

```typescript
S3Sprite.Motion.pointInDerection( degree: number ): void;
```

#### Point towards mouse pointer ( マウスポインターへ向ける)

```typescript
S3Sprite.Motion.pointToMouse() : void;
```

#### Point towards other sprite ( 他のスプライトへ向ける)

```typescript
S3Sprite.Motion.pointToTarget( otherSprite: S3Sprite ) : void;
```

#### Change x by ()  ( x座標を〇ずつ変える )

```typescript
S3Sprite.Motion.changeX( x: number) : void;
```

#### Set x to ()  ( x座標を 〇にする )

```typescript
S3Sprite.Motion.setX( x: number ) : void;
```

#### Change y by ()  ( y座標を〇ずつ変える )

```typescript
S3Sprite.Motion.changeY( y: number) : void;
```

#### Set y to ()  ( y座標を 〇にする )

```typescript
S3Sprite.Motion.setY( y: number ) : void;
```

#### If on edge, bounce  (もし端についたら跳ね返る)

```typescript
S3Sprite.Motion.ifOnEdgeBounds() : void;
```

#### Set rotation style ()  ( 回転方法を〇にする )

```typescript
// 左右のみ
S3Sprite.Motion.setRotationStyle( Lib.RotationStyle.LEFT_RIGHT ) : void;
// 回転しない
S3Sprite.Motion.setRotationStyle( Lib.RotationStyle.DONT_ROTATE ) : void;
// 自由に回転
S3Sprite.Motion.setRotationStyle( Lib.RotationStyle.ALL_AROUND ) : void;
```

#### x position ( x座標 )

```typescript
S3Sprite.Motion.getCurrentPosition() : {x:number, y:number};
```

```typescript
const {x} = sprite.Motion.getCurrentPosition();
```

#### y position ( y座標 )
```typescript
S3Sprite.Motion.getCurrentPosition() : {x:number, y:number};
```
```typescript
const {y} = sprite.Motion.getCurrentPosition();
```

#### derection  ( 向き )

```typescript
S3Sprite.Motion.getCurrentDirection() : number;
```

```typescript
const derection:number = Sprite.Motion.getCurrentDirection();
```

## Looks ( 見た目 )

#### Say () for () seconds ( ◎◎と〇秒言う )

```typescript
S3Sprite.Looks.sayForSecs( text: string, secs: number) : Promise<void>;
```
```typescript
S3Sprite.Looks.sayForSecs( text: string, secs: number, option: {scale: {w:number, h:number}}) : Promise<void>;
```
```typescript
const scale = {w: 60, h:60};
await Sprite.Looks.sayForSecs( text: string, secs: number, {scale: scale} );
```
#### Say ()  ( ◎◎と言う )
```typescript
S3Sprite.Looks.say( text: string ) : void;
```
```typescript
S3Sprite.Looks.say( text: string, option: {scale: {w:number, h:number}} ) : void;
```
```typescript
const scale = {w: 60, h:60};
sprite.Looks.say( text: string, {scale: scale} );
```

#### Think () for () seconds ( ◎◎と〇秒考える )

```typescript
S3Sprite.Looks.thinkForSecs( text: string, secs: number): Promise<void>;
```
```typescript
S3Sprite.Looks.thinkForSecs( text: string, secs: number, option: {scale:{w:number,h:number}}): Promise<void>;
```
```typescript
const scale = {w: 60, h:60};
await sprite.Looks.thinkForSecs( text: string, secs: number, {scale: scale} );
```
#### Think ()  ( ◎◎と考える )
```typescript
S3Sprite.Looks.think( text: string ) : void;
```
```typescript
S3Sprite.Looks.think( text: string, option: {scale:{w:number,h:number}} ) : void;
```
```typescript
const scale = {w: 60, h:60};
sprite.Looks.think( text: string, {scale: scale} );
```
#### Switch costume to ()  (コスチュームを〇にする)

```typescript
S3Sprite.Looks.switchCostume( constumeName: string ) : void;
```

#### Next costume  (次のコスチュームにする)

```typescript
S3Sprite.Looks.nextCostume() : void;
```
#### Switch backdrop to ()  ( 背景を〇にする )

```typescript
S3Entity.Looks.switchBackdrop( backdropName: string ) : void;
```
#### Next backdrop  (次の背景にする)

```typescript
S3Entity.Looks.nextBackdrop() : void;
```

#### Change size by ()  ( 大きさを 〇ずつ変える)

```typescript
const size = {w: 10, h:10};
Sprite.Looks.changeSizeBy( size );
```
#### Set size to ()  ( 大きさを 〇%にする)

```typescript
const size = {w: 200, h:200};
Sprite.Looks.setSize( size );
```

#### Change () effect by ()  ( 画像の効果〇を〇ずつ変える )

```typescript
// 色の効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.COLOR, 10 ); 
```
```typescript
// 魚眼レンズの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.FISHEYE, 10 );
```
```typescript
// 渦巻きの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.WHIRL, 10 );
```
```typescript
// ピクセル化の効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.PIXELATE, 10 );
```
```typescript
// モザイクの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.MOSAIC, 10 );
```
```typescript
// モザイクの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.MOSAIC, 10 );
```
```typescript
// 明るさの効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.BRIGHTNESS, 10 );
```
```typescript
// 幽霊の効果
Sprite.Looks.changeEffectBy( Lib.ImageEffective.GHOST, 10 );
```
#### Set () effect to ()  ( 画像の効果を〇にする )
```typescript
// 幽霊の効果
Sprite.Looks.setEffect( Lib.ImageEffective.GHOST, 100 );
// 他の効果は前述changeEffectBy()のとおりです
```
#### Clear graphic effects  ( 画像効果をなくす )
```typescript
Sprite.Looks.clearEffects();
```

#### Show  ( 表示する )
```typescript
Sprite.Looks.show();
```
#### Hide  ( 隠す )
```typescript
Sprite.Looks.hide();
```

#### Go to front  ( 最前面に移動する )
```typescript
Sprite.Looks.goToFront();
```
#### Go to back  ( 最背面に移動する )
```typescript
Sprite.Looks.goToBack();
```
#### Go forward () layers  ( 〇階層 手前に出す )
```typescript
Sprite.Looks.goForwardLayers( layer: number );
```
#### Go backward () layers  ( 〇階層 奥に下げる )
```typescript
Sprite.Looks.goBackwardLayers( layer: number );
```
#### Costumes number  ( コスチュームの番号 )
```typescript
// 工事中
```
#### Costumes name  ( コスチュームの名前 )
```typescript
// 工事中
```
#### Backgrounds number  ( 背景の番号 )
```typescript
// 工事中
```
#### Backgrounds name  ( 背景の名前 ) 
```typescript
// 工事中
```
#### Size  ( 大きさ ) 
```typescript
const scale = Sprite.Looks.getSize();
console.log(`w=${scale.w}, h=${scale.h}`);
```

#### 縦横表示サイズ 【Tscratch3 のみ】
```typescript
const size = Sprite.Looks.drawingDimensions();
console.log(`width=${size.width}, h=${size.height}`);
```

## Sounds ( 音 )

#### Play sound ( ) until done  ( 終わるまで〇の音を鳴らす )
```typescript
await Sprite.Sound.playUntilDone( name : string );
```
#### Play sound ( )   ( 〇の音を鳴らす )
```typescript
Sprite.Sound.play( name : string );
```

#### Stop all sounds  (すべての音をとめる)
```typescript
Sprite.Sound.stop();
```
#### Set pitch to ( )  ( ピッチを〇にする )
```typescript
// ピッチを 90 にする ( デフォは 100 )
Sprite.Sound.setOption(Lib.SoundOption.PITCH, 90);
```
#### Set volume to ( )  ( 音量を〇%にする )
```typescript
// 音量を 10%にする
Sprite.Sound.setOption(Lib.SoundOption.VOLUME, 10);
```
#### Change pitch effect by ( )  ( ピッチの効果を〇ずつ変える )
```typescript
    // 工事中
```
#### Change volume by ( )  ( 音量を〇ずつ変える )
```typescript
    // 工事中
```
## Events  ( イベント )

#### When flag clicked  ( 旗が押されたとき )
```typescript
Sprite.Event.whenFlag( async function(this:S3Sprite){

});
```
#### When () key pressed  ( 〇キーが押されたとき )
```typescript
Sprite.Event.whenKeyPressed( key: string , async function(this:S3Sprite){

});
```
#### When this sprite clicked  ( このスプライトが押されたとき )
```typescript
Sprite.Event.whenClicked( async function(this:S3Sprite){

});
```
#### When backdrop switches to ()  ( 背景が〇に切り替わったとき )
```typescript
// 工事中
const backdropName = 'Jurassic';
sprite.Event.whenBackdropSwitches( backdropName, async function(this:S3Sprite){
    // 背景が切り替わったときの処理
});
```
```typescript
// 工事中
const backdropName = 'Jurassic';
stage.Event.whenBackdropSwitches( backdropName, async function(this:S3Stage){
    // 背景が切り替わったときの処理
});
```

#### When loudness > ()  ( マイク音量が〇より大のとき )
```typescript
// マイク関連を対応する予定は無し
```
#### When timer > ()  ( タイマーが〇より大のとき )
```typescript
// 工事中
```
#### When I recieve 〇  ( メッセージ〇を受け取ったとき )
```typescript
Sprite.Event.whenBroadcastReceived( 
                    messageId:string, 
                    async function(this:S3Sprite, arg1, arg2, arg3・・・){

    }
);
```
#### broadcast 〇  ( メッセージ〇を送る )
```typescript
Sprite.Event.broadcast(messageId: string, arg1, arg2, arg3, ・・・);
```

#### broadcast 〇 and wait ( メッセージ〇を送って待つ )
```typescript
await Sprite.Event.broadcastAndWait(messageId: string, arg1, arg2, arg3, ・・・);
```
## Control  ( 制御 )

#### wait () seconds   ( 〇秒待つ )
```typescript
// seconds秒待つ
await Sprite.Control.wait( seconds : number); 
```
#### repeat ()   ( 〇回繰り返す )
```typescript
// 10 回繰り返すの例
for( const _ of Lib.Iterator(10)) {
    // 繰り返し処理を書く
    yield; // 最終行は yield とする
}
```

#### forever   ( ずっと繰り返す )
```typescript
for(;;) {
    // 繰り返し処理を書く
    yield; // 最終行は yield とする
}
```
```typescript
while(true) {
    // 繰り返し処理を書く
    yield; // 最終行は yield とする
}
```
#### if () then    ( もし〇なら )
```typescript
// 変数 count が 10と等しい場合の例
if( count == 10 ){
    // 条件成立時の処理を書く
}
```
#### if () then else   ( もし〇なら、でなければ )
```typescript
// 変数 count が 10と等しい場合の例
if( count == 10 ){
    // 条件成立時の処理を書く
}else{
    // 条件不成立時の処理を書く
}
```
#### wait until ()   ( 〇まで待つ )
```typescript
// 変数 count が 10になるまで待つ、の例
await Sprite.Control.waitUntil( ()=>count==10);
```
#### repeat until ()   ( 〇まで繰り返す )
```typescript
// 変数 count が 10になるまで繰り返す、の例
for(;;){
    if( count == 10 ){
        break;
    }
    // 繰り返しの処理を書く
    yield;
}
```
#### while ()   ( 〇の間、繰り返す ): turbowarpのブロック
```typescript
// 変数 count が 10である間繰り返す、の例
while( count == 10 ){
    // 繰り返しの処理を書く
    yield;
}
```
#### stop all  ( 全てを止める )
```typescript
Pg.Control.stopAll();
```
#### stop this script  ( このスクリプトを止める )
```typescript
// 工事中
```
#### stop other script in sprite ( スプライトの他の処理を止める )
```typescript
// 工事中
```
#### when I start as a clone ( クローンされたとき )
```typescript
Sprite.Control.whenCloned( async function(this:S3Sprite){
    // クローンされたときの処理を書く
});
```
#### create clone of ()  ( 〇のクローンをつくる )
```typescript
await Sprite.Control.clone();
```
#### delete this clone  ( このクローンを削除する )
```typescript
await Sprite.Control.remove();
```
## Sensing  ( 調べる )

#### Touching edge  ( 端に触れた )
```typescript
Sprite.Sensing.isTouchingEdge() : void;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    for(;;){
        // 端に触れたとき
        if( this.Sensing.isTouchingVirticalEdge() ) {
            // 音を鳴らす
            this.Sound.play(Nyaaa);
        }
        yield;
    }
});
```

#### Touching virtival edge  ( 左右の端に触れた )
```typescript
Sprite.Sensing.isTouchingVirticalEdge() : boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    let counter = 0;
    for(;;){
        // 左右の端に触れたとき
        if( this.Sensing.isTouchingVirticalEdge() ) {
            counter += 1;
        }
        if( counter > 100) {
            break;
        }
        yield;
    }
    console.log('100回左右の端に触れた');
});
```
#### Touching virtival edge  ( 上下の端に触れた )
```typescript
Sprite.Sensing.isTouchingHorizontalEdge() : boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    let counter = 0;
    for(;;){
        // 上下の端に触れたとき
        if( this.Sensing.isTouchingHorizontalEdge() ) {
            counter += 1;
        }
        if( counter > 100) {
            break;
        }
        yield;
    }
    console.log('100回上下の端に触れた');
});
```
#### Touching mouse pointer  ( マウスポインターに触れた )
```typescript
Sprite.Sensing.isMouseTouching() : boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    for(;;){
        // マウスポインターに触れたときループを抜ける
        if( this.Sensing.isMouseTouching() ) {
            break;
        }
        yield;
    }
    console.log('マウスポインターが触れた');
});
```
#### Touching no mouse pointer  ( マウスポインターに触れていない )
```typescript
Sprite.Sensing.isNotMouseTouching() : boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    for(;;){
        // マウスポインターに触れていないときループを抜ける
        if( this.Sensing.isNotMouseTouching() ) {
            break;
        }
        yield;
    }
    console.log('マウスポインターが離れた');
});
```
#### Touching color ()  ( 〇の色に触れた  )

```typescript
/**
 * 相手の色に触れていることを判定する
 * @param targetRGB #始まりのRGB文字列(#始まりの16進数)
 */
Sprite.Sensing.isTouchingToColor( color: string):boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    const targetRGB = '#ff0000'; // 赤色
    for(;;){
        // 赤に触れたとき ループを抜ける
        if( this.Sensing.isTouchingToColor( targetRGB ) ) {
            break;
        }
        yield;
    }
});
```
#### Color () is touching color ()  ( 〇の色が〇の色に触れた  )

```typescript
/**
 * 自身の色が相手の色に触れていることを判定する
 * @param targetRGB 相手のRGB文字列 (#始まりの16進数)
 * @param maskRGB 自身のRGB文字列 (#始まりの16進数)
 */
Sprite.Sensing.colorIsTouchingToColor( targetRGB: string, maskRGB: string):boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    const targetRGB = '#ff0000'; // 赤色
    const maskRGB = '#0000ff'; // 赤色
    for(;;){
        // 青色が赤色に触れたとき ループを抜ける
        if( this.Sensing.colorIsTouchingToColor( targetRGB, maskRGB ) ) {
            break;
        }
    }
});
```
#### Distance to mouse pointer  ( マウスポインターまでの距離  )
```typescript
// 工事中
```
#### Distance to target sprite  ( 他のスプライトまでの距離  )
```typescript
// 工事中
```
#### Ask () and wait   ( 〇と聞いて待つ  )
```typescript
Entity.Sensing.askAndWait( question : string ) : Promise<string>;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    const question = '難しさはどれにする? ( 1:やさしい, 2:ふつう, 3:むずかしい)';
    let answer;
    for(;;){
        answer = await this.Sensing.askAndWait( question );
        if(answer == '1' || answer == '2' || answer == '3' ) {
            break;
        }
        yield;
    }
    console.log(`答えは 『${answer}』だよ`)
});
```
#### Key () pressed    ( キー〇が押された )
```typescript
/**
 * キーが押された？
 * @param key キーの名前
 */
Entity.Sensing.isKeyDown( question : string ) : boolean;

/**
 * キーが押されていない？
 * @param key キーの名前
 */
Entity.Sensing.isKeyDown( question : string ) : boolean;
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    for(;;){
        if(this.Sensing.isKeyDown( Lib.Keyboard.SPACE )){
            // 弾を発射するメッセージを送る
            this.Event.broadcast('SHOT');
        }
    }
});
```
```typescript
/** スペースキー */
Lib.Keyboard.SPACE
/** 左矢印キー */
Lib.Keyboard.LEFT
/** 右矢印キー */
Lib.Keyboard.RIGHT
/** 上向き矢印キー */
Lib.Keyboard.UP
/** 下向き矢印キー */
Lib.Keyboard.DOWN
/** エスケープキー */
Lib.Keyboard.ESCAPE
```
#### mouse down   ( マウスが押された )
```typescript
Entity.Sensing.isMouseDown() : boolean
```
```typescript
sprite.Event.whenFlag( async function*(this:S3Sprite){
    for(;;){
        if( this.Sensing.isMouseDown()){
            console.log('マウスダウン検出');
        }
        yield;
    }
});
```

#### mouse x, mouse y   ( マウスのx座標、y座標 )
```typescript
Entity.Sensing.mouseX : number
```
```typescript
Entity.Sensing.mouseY : number
```
```typescript
// スプライトの位置をマウスの位置にする。
sprite.Event.whenFlag( async function*(this:S3Sprite){
    for(;;){
        const mouseX = this.Sensing.mouseX;
        const mouseY = this.Sensing.mouseY;
        this.Motion.setXY( mouseX, mouseY );
        yield;
    }
});

```
## Set drag mode draggable  ( ドラッグ可能にする )
```typescript
提供予定なし
```

## Loudness   ( マイク音量 )
```typescript
提供予定なし
```

## timer  ( タイマー )
```typescript
Entity.Sensing.resetTimer(): void;
Entity.Sensing.timer : number;
```
```typescript
// スプライトの位置をマウスの位置にする。
sprite.Event.whenFlag( async function*(this:S3Sprite){
    this.Sensing.resetTimer(); // タイマー初期化
    for(;;){
        if(this.Sensing.timer > 1000) { //1000 ms 経過したとき
            break;
        }
        yield;
    }
    this.Sensing.stopTimer(); // タイマー終了
});









