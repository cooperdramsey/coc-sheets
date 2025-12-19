export class FellowInvestigator{
    public characterName: string | undefined;
    public playerName: string | undefined;
    public notes: string | undefined;

    public constructor(init? : Partial<FellowInvestigator>) {
        Object.assign(this, init);
    }

    public static fromJSON(src: any): FellowInvestigator {
        return new FellowInvestigator({
            characterName: src?.characterName ?? '',
            playerName: src?.playerName ?? '',
            notes: src?.notes ?? '',
        });
    }

    public toJSON(): any {
        return {
            characterName: this.characterName ?? '',
            playerName: this.playerName ?? '',
            notes: this.notes ?? '',
        };
    }
}
