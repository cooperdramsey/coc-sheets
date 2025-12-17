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
}