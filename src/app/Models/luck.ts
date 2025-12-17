export class Luck {
    public current: number | undefined;
    public starting: number | undefined;

    public constructor(current?: number, starting?: number) {
        this.current = current;
        this.starting = starting;
    }
}