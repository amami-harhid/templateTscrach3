import { S3Entity } from "@typeJS/scratchjs/s3Entity";
/** 暫定データの格納用(Entityを入れられる) */
export type S3Storage = { [key:string] : S3Entity };
