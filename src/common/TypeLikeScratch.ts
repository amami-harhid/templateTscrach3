/** 実体(Entity) */
declare interface Entity {
    /** イメージを追加する */
    addImage(image: any) : Promise<any>;
    /** サウンドを追加する */
    addSound(sound: any, option: any) : Promise<any>;
    /** サウンドを鳴らして終わるまで待つ（await 必須） */
    startSoundUntilDone() : Promise<any>;
    /** 条件が成立する間、処理を繰り返す */
    while(condition: boolean|CallableFunction, func:CallableFunction) : Promise<any>;
    /** すぐに実行する */
    whenRightNow(func:CallableFunction) :void;
    /** 旗が押されたら実行する */
    whenFlag(func:CallableFunction) :void;
}
/** ステージ（実体[Entity]を継承）*/
declare interface Stage extends Entity{
    new(...args:any[]): Stage;
}
/** スプライト（実体[Entity]を継承）*/
declare interface Sprite extends Entity{
    new(...args:any[]): Sprite;
}
declare interface Libs {
    Stage : Stage;
    Sprite : Sprite;
}
/** LikeScratchJsLib */
declare interface Process {
    /** 事前ロード処理をするところ */
    preload(m:Process) : Promise<any>;
    /** 事前準備処理をするところ */
    prepare(m:Process) : Promise<any>;
    /** 動作セッティングをするところ */
    setting(m:Process) : Promise<any>;
    /**
     * 画像ローディング処理
     * @param url  画像データの場所
     * @param name 画像に付与する名称 
     */
    loadImage(url:string, name:string) : void;
    /**
     * サウンドローディング処理
     * @param url サウンドデータの場所
     * @param name サウンドに付与する名称
     */
    loadSound(url:string, name:string) : void;
    /**
     * 画像データ格納先
     */
    images : any;
    /**
     * サウンドデータ格納先
     */
    sounds : any;
}
/** 暫定データの格納用(なんでも入れられる) */
declare type Pool = any;

/** LikeScratchJsLib */
declare interface ScratchJsLib {
    libs: Libs;
    /** LibのMain */
    process: Process;
    /** 暫定データの格納用  */
    pool: Pool;
}

export {ScratchJsLib,Libs, Process,Pool,Entity,Stage,Sprite}

