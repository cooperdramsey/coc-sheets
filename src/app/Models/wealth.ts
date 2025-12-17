export class Wealth {
    public spendingLevel: number | undefined;
    public cash: number | undefined;
    public assets: string[] = [];

    public constructor(init? : Partial<Wealth>) {
        Object.assign(this, init);
    }
}