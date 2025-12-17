export class FellowInvestigator{
    public characterName: string | undefined;
    public playerName: string | undefined;
    public notes: string | undefined;

    public constructor(init? : Partial<FellowInvestigator>) {
        Object.assign(this, init);
    }
}