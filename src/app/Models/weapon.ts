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

    public static fromJSON(src: any): Weapon {
        return new Weapon({
            name: src?.name ?? '',
            damage: src?.damage ?? '',
            numberOfAttacks: Number(src?.numberOfAttacks ?? 1),
            range: src?.range ?? undefined,
            ammo: typeof src?.ammo === 'number' ? src.ammo : undefined,
            malfunction: typeof src?.malfunction === 'number' ? src.malfunction : undefined,
        });
    }

    public toJSON(): any {
        return {
            name: this.name ?? '',
            damage: this.damage ?? '',
            numberOfAttacks: this.numberOfAttacks ?? 1,
            range: this.range ?? null,
            ammo: this.ammo ?? null,
            malfunction: this.malfunction ?? null,
        };
    }
}
