import "https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js";
import { LikeScratchLib } from "@typeJS/scratchjs/likeScratchLib";
import { S3Storage } from "@typeJS/scratchjs/s3Storage";
import type { 
    PlayGround, Storage, S3Libs, S3Images, S3Sounds, S3Stage, S3Sprite
} from "@typeJS/scratchjs";
// @ts-ignore
const SLIB:LikeScratchLib = likeScratchLib;
// @ts-ignore
export const PG:PlayGround = SLIB.PlayGround;
export const ST:S3Storage = SLIB.Storage;
export const LIBS:S3Libs = SLIB.Libs;
export const IMAGES:S3Images = SLIB.Images;
export const SOUNDS:S3Sounds = SLIB.Sounds;
export const Stage:S3Stage = SLIB.Stage;



