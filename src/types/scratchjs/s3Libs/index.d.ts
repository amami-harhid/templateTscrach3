import {S3Stage} from "@typeJS/scratchjs/s3Stage"
import {S3Sprite} from "@typeJS/scratchjs/s3Sprite"
import {S3Point} from "@typeJS/scratchjs/s3Point";
/** 利用クラス格納ライブラリー */
export interface S3Libs {
    /** ステージクラス */
    Stage : S3Stage;
    /** スプライトクラス */
    Sprite : S3Sprite;
    /** 指定したミリ秒経過するまで待つ (await必須) */
    wait(ms:number): Promise<any>;
    /** 条件が成立する間、待つ (await必須) */
    waitWhile( condition: boolean|CallableFunction): Promise<any>;
    
}
