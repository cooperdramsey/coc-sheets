export class MagicPoints {
    public current: number | undefined;
    public max: number | undefined;

    public constructor(current?: number, max?: number) {
        this.current = current;
        this.max = max;
    }
}