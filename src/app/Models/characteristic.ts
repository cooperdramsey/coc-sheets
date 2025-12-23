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
        this._half = Math.floor(value / 2);
        this._fifth = Math.floor(value / 5);
    }

    public static fromJSON(src: any, label: string): Characteristic {
        const c = new Characteristic(label);
        if (typeof src?.regular === 'number') c.setRegular(src.regular);
        return c;
    }

    public toJSON(): any {
        return {
            name: this._name,
            regular: this._regular ?? 0
        };
    }
}
