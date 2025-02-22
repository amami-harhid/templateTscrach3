import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Libs} from "@typeJS/scratchjs/s3Libs";
import type {S3ImagePool} from "@typeJS/scratchjs/s3ImagePool";
import type {S3Storage} from "@typeJS/scratchjs/s3Storage";
import type {S3SoundPool} from "@typeJS/scratchjs/s3SoundPool";
import {PlayGround, Library, Storage, ImagePool, SoundPool} 
// @ts-ignore (モジュール型定義無しエラーを抑止）
from "https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js";

export const Pg:S3PlayGround = PlayGround;
export const Lib:S3Libs = Library;
export const St:S3Storage = Storage;
export const Images:S3ImagePool = ImagePool;
export const Sounds:S3SoundPool = SoundPool;