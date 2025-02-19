import {S3Entity} from "@typeJS/scratchjs/s3Entity";
import {S3Point} from "@typeJS/scratchjs/s3Point";
import { S3Scale } from "@typeJS/scratchjs/s3Scale";
import {S3Effect} from "@typeJS/scratchjs/s3Effect";
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
/** スプライト（実体[Entity]を継承）*/
export interface S3Sprite extends S3Entity{
    new(...args:any[]): S3Sprite;
    /** 右側回転 */
    turnRight(direction:number): void;
    /** マウスカーソルに触れたか否かを判定する */
    isMouseTouching(): boolean;
    /** 指定した距離分移動させる（向きの方向へ） */
    moveSteps(step: number): void;
    /** 次のコスチュームにする */
    nextCostume(): void;
    /** クローンを作る */
    clone(option?:S3CloneOption): Promise<S3Sprite>
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