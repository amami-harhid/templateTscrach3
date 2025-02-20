import type {LikeScratchLib} from "@typeJS/scratchjs/likeScratchLib";
import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Libs} from "@typeJS/scratchjs/s3Libs";
import type {S3Images} from "@typeJS/scratchjs/s3Images";
import type {S3Storage} from "@typeJS/scratchjs/s3Storage";
import type {S3Sounds} from "@typeJS/scratchjs/s3Sounds";
// webpackで作成したJSからのexportを受ける方法が分からないので 
// 代替策としてGlobal変数(likeScratchLib)にて受け取っている。
import "https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js";

// @ts-ignore (likeScratchList未定義のエラーを抑止する)
const ScratchLib:LikeScratchLib = likeScratchLib;
export const PG:S3PlayGround = ScratchLib.PlayGround;
export const LIBS:S3Libs = ScratchLib.Libs;
export const ST:S3Storage = ScratchLib.Storage;
export const IMAGES:S3Images = ScratchLib.Images;
export const SOUNDS:S3Sounds = ScratchLib.Sounds;
