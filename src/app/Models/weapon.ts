export class Weapon {
    public name: string | undefined;
    public damage: string | undefined;
    public numberOfAttacks: number | undefined;
    public range?: string | undefined;
    public ammo?: number | undefined;
    public malfunction?: number | undefined;

    public constructor(init? : Partial<Weapon>) {
        Object.assign(this, init);
    }
}