export class Wealth {
    public spendingLevel: number | undefined;
    public cash: number | undefined;
    public assets: string[] = [];

    public constructor(init? : Partial<Wealth>) {
        Object.assign(this, init);
    }

    public static fromJSON(src: any): Wealth {
        return new Wealth({
            spendingLevel: Number(src?.spendingLevel ?? 0),
            cash: Number(src?.cash ?? 0),
            assets: Array.isArray(src?.assets) ? src.assets.slice() : [],
        });
    }

    public toJSON(): any {
        return {
            spendingLevel: this.spendingLevel ?? 0,
            cash: this.cash ?? 0,
            assets: Array.isArray(this.assets) ? this.assets.slice() : [],
        };
    }
}
