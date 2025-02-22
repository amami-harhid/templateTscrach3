declare interface S3PgImage {
    /** ロード処理 */
    load(path:string, name:string);
} 
declare interface S3PgSound {
    /** ロード処理 */
    load(path:string, name:string);
} 

/** LikeScratchJsLib */
export interface S3PlayGround {
    /** タイトル */
    title: string;
    /** 事前ロード処理をするところ */
    preload(m:PlayGround) : Promise<any>;
    /** 事前準備処理をするところ */
    prepare(m:PlayGround) : Promise<any>;
    /** 動作セッティングをするところ */
    setting(m:PlayGround) : Promise<any>;
    /** イメージ処理 */
    Image: S3PgImage;
    /** サウンド処理 */
    Sound: S3PgSound;
}