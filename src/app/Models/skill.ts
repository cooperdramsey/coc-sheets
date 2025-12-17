export class Skill {
    private _name: string;
    private _baseValue : number;
    private _regular: number | undefined;
    private _half: number | undefined;
    private _fifth: number | undefined;

    constructor(name: string, baseValue: number) {
        this._name = name;
        this._baseValue = baseValue;
    }

    public get name(): string {
        return this._name;
    }

    public get baseValue(): number {
        return this._baseValue;
    }

    public get regular(): number | undefined {
        return this._regular;
    }

    public setRegular(value: number): void {
        this._regular = value;
        this._half = value / 2;
        this._fifth = value / 5;
    }

    public get half(): number | undefined {
        return this._half;
    }

    public get fifth(): number | undefined {
        return this._fifth;
    }

    public description: string | undefined;
}