import {S3Stage} from "@typeJS/scratchjs/s3Stage"
import {S3Sprite} from "@typeJS/scratchjs/s3Sprite"
import {S3Point} from "@typeJS/scratchjs/s3Point";
import {S3ImageEffective} from "@typeJS/scratchjs/s3ImageEffective";

declare interface S3Env {
    /** 1FPS単位の時間(ms) */
    pace : number,
    /** TRUEのときフキダシの大きさをスプライトに併せて変化させる */
    bubbleScaleLinkedToSprite : boolean,
    /** ブラウザウィンドウのサイズ */
    WindowSize : {w: number, h: number},
}

/** 回転方法 */
declare interface S3RotationStyle {
    /** 左右のみ */
    LEFT_RIGHT: string;
    /** 回転しない */
    DONT_ROTATE: string;
    /** 自由に回転 */
    ALL_AROUND: string;
}

/** サウンドオプション */
declare interface S3SoundOption {
    /** ボリューム */
    VOLUME : string;
    /** ピッチ */
    PITCH : string;
}


/** 計算ユーティリティ */
declare interface S3MathUtils {
    /** デグリーからラジアンへ変換 */
    degToRad(degree: number): number;
    /** ラジアンからデグリーへ変換 */
    radToDeg(radian: number): number;
}

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
    /** 見た目効果 */
    ImageEffective: S3ImageEffective;
    /** 回転方法 */
    RotationStyle: S3RotationStyle;
    /** サウンドオプション */
    SoundOption: S3SoundOption;
    /** ステージのランダムな位置 */
    randomPoint: {x: number, y: number};
    /** 環境設定 */
    Env: S3Env;

    /** 計算ユーティリティ */
    MathUtils : S3MathUtils;

    keyIsDown(key?: string) : boolean;
    /** レンダリング率 */
    renderRate(): {x: number, y: number};
    /** マウスの位置 */
    mousePosition(): {x: number, y: number};
    /** ステージ上のランダムな位置 */
    randomPoint(): {x: number, y: number};
    /** ランダムな向き */
    randomDirection(): number;
    /** ステージ幅 */
    stageWidth : number;
    /** ステージ高さ */
    stageHeight : number;
}
