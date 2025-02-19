/** 実体(Entity) */
declare interface S3Entity {
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
declare interface S3Stage extends S3Entity{
    new(...args:any[]): S3Stage;
}
/** スプライト（実体[Entity]を継承）*/
declare interface S3Sprite extends S3Entity{
    new(...args:any[]): S3Sprite;
}
declare interface S3Libs {
    Stage : S3Stage;
    Sprite : S3Sprite;
}

/** LikeScratchJsLib */
declare interface PlayGround {
    /** タイトル */
    title: string;
    /** 事前ロード処理をするところ */
    preload(m:PlayGround) : Promise<any>;
    /** 事前準備処理をするところ */
    prepare(m:PlayGround) : Promise<any>;
    /** 動作セッティングをするところ */
    setting(m:PlayGround) : Promise<any>;
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
/** 暫定データの格納用(Entityを入れられる) */
declare type Storage = { [key:string] : S3Entity };
/** 画像データ */
declare interface Image {
    name: string,
    data: any
}
/** サウンドデータ */
declare interface Sound {
    /** サウンド名 */
    name: string,
    /** サウンドデータ */  
    data: any
}
/** イメージ格納用 */
declare type S3Images = { [key:string] : Image };
/** サウンド格納用 */
declare type S3Sounds = { [key:string] : Sound };

/** LikeScratchJsLib */
declare interface LikeScratchLib {
    PlayGround: PlayGround;
    /** 暫定データの格納用  */
    Storage: Storage;
    Libs: S3Libs;
    /** イメージ格納先 */
    Images:S3Images;
    Sounds:S3Sounds;
}
export {LikeScratchLib, PlayGround, Storage, S3Libs, /** a */S3Images, S3Sounds, S3Stage, S3Sprite}
