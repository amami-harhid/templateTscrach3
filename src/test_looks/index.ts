const EffectType = {
    /** 色の効果 */            color  : "color",
    /** 魚眼レンズの効果 */     fisheye: "fisheye",
    /** 渦巻きの効果 */         whirl: "whirl",
    /** ピクセル化の効果 */     pixelate: "pixelate",
    /** モザイクの効果 */       mosaic: "mosaic",
    /** 明るさの効果 */         brightness: "brightness",
    /** 幽霊の効果 */           ghost: "ghost",
} as const;
declare type EffectKeyType = keyof typeof EffectType;


/** 見た目系メソッド */
export interface S3LooksFunctions {
    changeEffectBy(effectType: EffectKeyType, value: number) : void;
}

const f = function(effectType:EffectKeyType, value:number) :void {
    console.log(effectType);
    console.log(value);
}

f( EffectType.color , 10);
