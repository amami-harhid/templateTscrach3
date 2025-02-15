/** LikeScratchJsLib */
declare module "https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratch.js";

/** LikeScratchJsLib */
declare interface LikeScratchLib {
    /** LibのMain */
    Main: Process;
    /** Libの格納用  */
    Space: any;
}
declare const LikeScratchLib:LikeScratchLib;
interface Entity {
    addImage(image: any) : Promise<any>;
    addSound(sound: any, option: any) : Promise<any>;
    startSoundUntilDone() : Promise<any>;
    while(condition: boolean|CallableFunction, func:CallableFunction) : Promise<any>;
    whenRightNow(func:CallableFunction) :void;
    whenFlag(func:CallableFunction) :void;
}
/**
 * Class Stage
 */
interface Stage extends Entity{
}
interface Sprite extends Entity{
}
interface Process {
    preload(m:Process) : Promise<any>;
    prepare(m:Process) : Promise<any>;
    setting(m:Process) : Promise<any>;
    /**
     * Imageローディング処理
     * @param url  イメージデータの場所
     * @param name イメージに付与する名称 
     */
    loadImage(url:string, name:string) : void;
    /**
     * Soundローディング処理
     * @param url Soundデータの場所
     * @param name Soundに付与する名称
     */
    loadSound(url:string, name:string) : void;
    /**
     * イメージデータ格納MAP
     */
    images : any;
    /**
     * Soundデータ格納MAP
     */
    sounds : any;
    Stage : any;
}
