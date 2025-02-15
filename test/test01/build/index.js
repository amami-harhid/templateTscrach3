import { Sample } from './sample.js';
import 'https://amami-harhid.github.io/scratch3LikeJsLib/build/likeScratchLib.js';
// @ts-ignore
const P = likeScratchLib.process;
console.log(P);
/** サンプルインスタンス */
const sample = new Sample();
/** メッセージ */
const message = sample.hello("TsScript");
console.log(message);
//sample.method2 = (arg:boolean)=>{return "a"};
if (sample.method2)
    console.log(sample.method2(true));
//# sourceMappingURL=index.js.map