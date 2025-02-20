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
}