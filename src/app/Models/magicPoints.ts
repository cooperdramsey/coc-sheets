export class MagicPoints {
    public current: number | undefined;
    public max: number | undefined;

    public constructor(current?: number, max?: number) {
        this.current = current;
        this.max = max;
    }

    public static fromJSON(src: any): MagicPoints {
        return new MagicPoints(Number(src?.current ?? 0), Number(src?.max ?? 0));
    }

    public toJSON(): any {
        return {
          current: this.current ?? 0,
          max: this.max ?? 0
        };
    }
}
