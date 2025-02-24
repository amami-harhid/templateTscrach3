const EffectType = {
    /** 色の効果 */ color: "color",
    /** 魚眼レンズの効果 */ fisheye: "fisheye",
    /** 渦巻きの効果 */ whirl: "whirl",
    /** ピクセル化の効果 */ pixelate: "pixelate",
    /** モザイクの効果 */ mosaic: "mosaic",
    /** 明るさの効果 */ brightness: "brightness",
    /** 幽霊の効果 */ ghost: "ghost",
};
const f = function (effectType, value) {
    console.log(effectType);
    console.log(value);
};
f(EffectType.color, 10);
export {};
//# sourceMappingURL=index.js.map