import {S3Entity} from "@typeJS/scratchjs/s3Entity"
/** ステージ（実体[Entity]を継承）*/
export interface S3Stage extends S3Entity{
    new(...args:any[]): S3Stage;
}
