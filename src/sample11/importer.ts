import type {S3PlayGround} from "@typeJS/scratchjs/s3PlayGround";
import type {S3Libs} from "@typeJS/scratchjs/s3Libs";
import {PlayGround, Library} 
// @ts-ignore (モジュール型定義無しエラーを抑止）
from "https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js";

export const Pg:S3PlayGround = PlayGround;
export const Lib:S3Libs = Library;
