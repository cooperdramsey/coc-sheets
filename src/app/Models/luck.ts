export class Luck {
    public current: number | undefined;
    public starting: number | undefined;

    public constructor(current?: number, starting?: number) {
        this.current = current;
        this.starting = starting;
    }

    public static fromJSON(src: any): Luck {
        const current = Number(src?.current ?? 0);
        const starting = Number((src?.starting) ?? 0);
        return new Luck(current, starting);
    }

    public toJSON(): any {
        return {
          current: this.current ?? 0,
          starting: this.starting ?? 0
        };
    }
}
