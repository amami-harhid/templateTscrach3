declare interface S3SoundProperties {
    "volume"?: number;
    "pitch"?: number;
}

/** サウンドメソッド */
export interface S3SoundFunctions {
    /** サウンド追加 */
    add(sound: any, prop?: S3SoundProperties) : Promise<any>;
    switch(name: string): void;
    next(): void;
    play(): void;
    playUntilDone(): Promise<any>;
    setVolume(vol: number): void;
    setPitch(pitch: number): void;
    stop(): void;
    stopImmediately(): void;
}
