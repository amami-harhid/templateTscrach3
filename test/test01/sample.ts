/**
 * Sample Class
 * テスト用に定義している
 */
interface SampleInt {
    /** 挨拶メソッド */
    hello(name: string): string;
    /** 空のメソッド */
    method2?(arg: boolean): string;
}
class Sample implements SampleInt {
    /** 
     * hello
     * @param   name 名前 
     * @returns 挨拶
     */
    hello(name: string) : string {
        return `Hello ${name}`;
    }
}
export {Sample, SampleInt};