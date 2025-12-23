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
        this._half = Math.floor(value / 2);
        this._fifth = Math.floor(value / 5);
    }

    public get half(): number | undefined {
        return this._half;
    }

    public get fifth(): number | undefined {
        return this._fifth;
    }

    public static fromJSON(src: any): Skill {
        const name = src?.name ?? '';
        const base = Number((src?.baseValue ?? src?.base) ?? 0);
        const sk = new Skill(name, base);
        if (typeof src?.regular === 'number') sk.setRegular(src.regular);
        return sk;
    }

    public toJSON(): any {
        return {
            name: this._name,
            baseValue: this._baseValue,
            regular: this._regular ?? 0
        };
    }
}
