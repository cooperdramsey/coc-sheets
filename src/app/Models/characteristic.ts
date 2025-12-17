export class Characteristic {
    private _name: string;
    private _regular: number | undefined;
    private _half: number | undefined;
    private _fifth: number | undefined;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public get regular(): number | undefined {
        return this._regular;
    }

    public get half(): number | undefined {
        return this._half;
    }

    public get fifth(): number | undefined {
        return this._fifth;
    }

    public setRegular(value: number): void {
        this._regular = value;
        this._half = value / 2;
        this._fifth = value / 5;
    }
}