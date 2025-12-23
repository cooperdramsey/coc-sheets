export class Sanity {
    public starting : number | undefined;
    public current : number | undefined;
    public max: number | undefined;

    public get insane(): number | undefined {
        return this.current !== undefined ? this.current / 5 : undefined;
    }

    public constructor(starting?: number, current?: number, max?: number) {
        this.starting = starting;
        this.current = current;
        this.max = max;
    }

    public static fromJSON(src: any): Sanity {
        const starting = Number((src?.starting) ?? 0);
        const current = Number(src?.current ?? 0);
        const max = Number(src?.max ?? 0);
        return new Sanity(starting, current, max);
    }

    public toJSON(): any {
        return {
            starting: this.starting ?? 0,
            current: this.current ?? 0,
            max: this.max ?? 0,
        };
    }
}
