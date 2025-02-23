import {S3Entity} from "@typeJS/scratchjs/s3Entity";
import {S3Point} from "@typeJS/scratchjs/s3Point";
import {S3Scale } from "@typeJS/scratchjs/s3Scale";
import {S3Effect} from "@typeJS/scratchjs/s3Effect";
import {S3EventFuncsions} from "@typeJS/scratchjs/"
import {S3ImageFunctions} from "@typeJS/scratchjs/s3ImageFunctions";
import {S3ControlFunctions} from "@typeJS/scratchjs/s3ControlFunctions";
import {S3ExtensionsFunctions} from "@typeJS/scratchjs/s3ExtensionsFunctions";
import {S3SensingFunctions} from "@typeJS/scratchjs/s3SensingFunctions";
import {S3EventFunctions} from "@typeJS/scratchjs/s3EventFunctions";
import {S3SoundFunctions} from "@typeJS/scratchjs/s3SoundFunctions";
import {S3LooksFunctions} from "@typeJS/scratchjs/s3LooksFunctions";

/** イベント処理 */
declare interface S3SpriteEventFunctions extends S3EventFunctions{

}
/** スプライトの制御用 */
declare interface S3SpriteControlFunctions extends S3ControlFunctions{
    /** クローンを作る */
    clone(option?:S3CloneOption): Promise<S3Sprite>
}

declare interface S3CloneOption {
    /** 位置指定 */
    position?: S3Point;
    /** 向き指定 */
    direction?: number;
    /** 大きさ指定 */
    scale?: S3Scale;
    /** 表示効果 */
    effect?: S3Effect;    
}
declare interface S3MotionFunctions {
    /** 右側回転 */
    turnRight(direction:number): void;
    /** 右側回転 */
    turnRight(direction:number): void;
    /** 指定した距離分移動させる（向きの方向へ） */
    moveSteps(step: number): void;
}
/** 調べる系メソッド */
declare interface S3SpriteSensingFunctions extends S3SensingFunctions {
    /** 端に触れたとき */
    isTouchingEdge(): boolean;
    /** 左右の端に触れたとき */
    isTouchingVirticalEdge(): boolean;
    /** 上下の端に触れたとき */
    isTouchingHorizontalEdge(): boolean;
    /** マウスカーソルが触れていないとき */
    isNotMouseTouching(): boolean;
    /** マウスカーソルが触れたとき */
    isMouseTouching(): boolean;
    /** 指定したスプライトが触れたとき */
    isTouchingTargetToTarget(sprite:S3Sprite): boolean;
    /** 触れているスプライトを取得する */
    getTouchingTarget(): [S3Sprite];
}
declare interface LooksFunctions {
    nextCostume(): void;
}

/** スプライト（実体[Entity]を継承）*/
export interface S3Sprite extends S3Entity{
    new(...args:any[]): S3Sprite;
    Image: S3ImageFunctions;
    Motion: S3MotionFunctions;
    Event: S3SpriteEventFunctions;
    Control: S3SpriteControlFunctions;
    Extensions: S3ExtensionsFunctions;
    Sensing: S3SpriteSensingFunctions;
    Sound: S3SoundFunctions;
    Looks: S3LooksFunctions;
    

    /** 次のコスチュームにする */
    nextCostume(): void;
    /** 表示非表示を設定する(trueのとき表示) */
    setVisible(condition:boolean): void;
    /** 
     * 大きさを変える(縦横をx,yで指定、100が初期値)
     * 第二引数省略時は 縦横ともに第一引数を充てる 
     */
    setScale(x:number,y?:number): void;
    /** ステージ内でランダムな位置を返す */
    randomPoint: S3Point;
    /** 生きている秒数(マイナス値になったら死亡) */
    life : number;
    /** 指定した秒数をかけて指定した座標(x,y)へ移動する (await必須) */
    glideToPosition(second:number, x:number, y:number): Promise<any>;
    
}