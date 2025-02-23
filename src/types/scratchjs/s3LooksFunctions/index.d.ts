/** フキダシのプロパティ */
declare interface SayProperty {
    /** フキダシのサイズ */
    scale: {x: number, y: number};
}
/** サイズプロパティ */
declare interface SizeProperty {
    /** サイズ */
    scale: {x: number, y: number};
}

const EFFECT_TYPE = {
    /** 色の効果 */            COLOR: "color",
    /** 魚眼レンズの効果 */     FISHEYE: "fisheye",
    /** 渦巻きの効果 */         WHIRL: "whirl",
    /** ピクセル化の効果 */     PIXELATE: "pixelate",
    /** モザイクの効果 */       MOSAIC: "mosaic",
    /** 明るさの効果 */         BRIGHTNESS: "brightness",
    /** 幽霊の効果 */           GHOST: "ghost",
} as const;

declare type EffectType = keyof typeof PAGE_TYPE;

/** 見た目系メソッド */
export interface S3LooksFunctions {
    /** 次のコスチュームにする */
    nextCostume(): void;
    /** 指定した名前(または番号)でコスチュームを切り替える */
    switchCostume(costume: string | number): void;
    /** 話す */
    say(/** 話すテキスト */text: string, properties: SayProperty): void;
    /** 指定した秒数だけ話す */
    sayForSecs(/** 話すテキスト */text: string, secs: number, properties: SayProperty):void;
    /** 思う */
    think(/** 思うテキスト */text: string, properties: SayProperty):void;
    /** 指定した秒数だけ思う */
    thinkForSecs(/** 思うテキスト */text: string, secs: number, properties: SayProperty): void;
    /** 大きさを変える */
    changeSizeBy(x: number | SizeProperty, y?:number ):void;
    /** サイズを取得する */
    getSize() : SizeProperty;
    /** サイズを設定する */
    setSize(x: number | SizeProperty, y?: number): void;
    /** 画像効果を指定した値分変える */
    changeEffectBy(effectType: EffectType, value: number) : void;
    /** 画像効果を指定した値にする */
    setEffect(effectType: EffectType, value: number): void;
    /** 画像効果をなくす */
    clearEffects(): void;
    /** 表示する */
    show(): void;
    /** 隠す */
    hide(): void;
    /** 最前面にする */
    goToFront(): void;
    /** 最背面にする */
    goToBack(): void;
    /** 指定階層分、前にする */
    goForwardLayers(layers: number): void;
    /** 指定階層分、後ろにする */
    goBackwardLayers(layers: number): void;
    /** 自分自身の縦横表示サイズを得る */
    getSelfDimensions() : {x: number, y: number};
}
