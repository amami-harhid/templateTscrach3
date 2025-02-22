/** 制御処理 */
export interface S3ControlFunctions {
    /** 指定したms秒待つ */
    wait(ms: number) : Promise<any>;
    /** 指定した条件が成立するまで待つ */
    waitUntil(condition: Function) : Promise<any>;
    /** 指定した条件が成立する間、待つ */
    waitWhile(condition: Function) : Promise<any>;
    /** ずっと繰り返す */
    forever(process: Function) : Promise<any>;
    /** 指定した条件が成立する間、繰り返す */
    while(condition: Function|boolean, process:Function ) : Promise<any>;
    /** 指定した回数、繰り返す */
    repeat(count: number, process:Function ) : Promise<any>;
    /** 指定した条件が成立するまで、繰り返す */
    repeatUntil(condition: Function, process:Function ) : Promise<any>;
    /** すべてを停止する */
    stopAll(): void;
}
