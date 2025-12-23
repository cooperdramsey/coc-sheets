import { Characteristic } from "./characteristic";
import { FellowInvestigator } from "./fellowInvestigators";
import { HitPoints } from "./hitPoints";
import { Luck } from "./luck";
import { MagicPoints } from "./magicPoints";
import { Sanity } from "./sanity";
import { Skill } from "./skill";
import { Wealth } from "./wealth";
import { Weapon } from "./weapon";

// Investigator.ts
export class Investigator {
    // Basic Info
    public name: string | undefined;
    public birthplace: string | undefined;
    public pronouns: string | undefined;
    public occupation: string | undefined;
    public residence: string | undefined;
    public age: number | undefined;

    // Characteristics
    public strength: Characteristic = new Characteristic('STR');
    public constitution: Characteristic = new Characteristic('CON');
    public size: Characteristic = new Characteristic('SIZ');
    public dexterity: Characteristic = new Characteristic('DEX');
    public appearance: Characteristic = new Characteristic('APP');
    public intelligence: Characteristic = new Characteristic('INT');
    public power: Characteristic = new Characteristic('POW');
    public education: Characteristic = new Characteristic('EDU');

    // Pools
    public hitPoints: HitPoints = new HitPoints();
    public magicPoints: MagicPoints = new MagicPoints();
    public luck: Luck = new Luck();
    public sanity: Sanity = new Sanity();

    // Conditions
    public temporaryInsanity: boolean = false;
    public indefiniteInsanity: boolean = false;
    public majorWound: boolean = false;
    public unconscious: boolean = false;
    public dying: boolean = false;

    // Other Stats
    public movementRate: number | undefined;
    public build: number | undefined;
    public damageBonus: number | undefined;

    // Skills
    public skills: Skill[] = [];

    // Combat
    public weapons: Weapon[] = [];

    // Background
    public myStory: string | undefined;
    public personalDescription: string | undefined;
    public ideologyBeliefs: string | undefined;
    public significantPeople: string | undefined;
    public meaningfulLocations: string | undefined;
    public treasuredPossessions: string | undefined;
    public traits: string | undefined;
    public injuriesScars: string | undefined;
    public phobiasManias: string | undefined;
    public arcaneTomesSpells: string | undefined;
    public encountersWithTheMythos: string | undefined;

    // Gear and Possessions
    gearAndPossessions: string[] = [];

    // Wealth
    public wealth: Wealth = new Wealth();

    // Fellow Investigators
    public fellowInvestigators: FellowInvestigator[] = [];

    public static fromJSON(json: any): Investigator {
        const inv = new Investigator();

        // Basic Info
        inv.name = json?.name ?? '';
        inv.birthplace = json?.birthplace ?? '';
        inv.pronouns = json?.pronouns ?? '';
        inv.occupation = json?.occupation ?? '';
        inv.residence = json?.residence ?? '';
        inv.age = typeof json?.age === 'number' ? json.age : Number(json?.age ?? 0);

        // Characteristics
        inv.strength = Characteristic.fromJSON(json?.strength, 'STR');
        inv.constitution = Characteristic.fromJSON(json?.constitution, 'CON');
        inv.size = Characteristic.fromJSON(json?.size, 'SIZ');
        inv.dexterity = Characteristic.fromJSON(json?.dexterity, 'DEX');
        inv.appearance = Characteristic.fromJSON(json?.appearance, 'APP');
        inv.intelligence = Characteristic.fromJSON(json?.intelligence, 'INT');
        inv.power = Characteristic.fromJSON(json?.power, 'POW');
        inv.education = Characteristic.fromJSON(json?.education, 'EDU');

        // Pools
        inv.hitPoints = HitPoints.fromJSON(json?.hitPoints ?? {});
        inv.magicPoints = MagicPoints.fromJSON(json?.magicPoints ?? {});
        inv.luck = Luck.fromJSON(json?.luck ?? {});
        inv.sanity = Sanity.fromJSON(json?.sanity ?? {});

        // Conditions
        inv.temporaryInsanity = !!json?.temporaryInsanity;
        inv.indefiniteInsanity = !!json?.indefiniteInsanity;
        inv.majorWound = !!json?.majorWound;
        inv.unconscious = !!json?.unconscious;
        inv.dying = !!json?.dying;

        // Other Stats
        inv.movementRate = typeof json?.movementRate === 'number' ? json.movementRate : Number(json?.movementRate ?? 0);
        inv.build = typeof json?.build === 'number' ? json.build : Number(json?.build ?? 0);
        inv.damageBonus = typeof json?.damageBonus === 'number' ? json.damageBonus : Number(json?.damageBonus ?? 0);

        // Skills
        inv.skills = Array.isArray(json?.skills)
            ? json.skills.map((s: any) => Skill.fromJSON(s))
            : [];

        // Combat
        inv.weapons = Array.isArray(json?.weapons)
            ? json.weapons.map((w: any) => Weapon.fromJSON(w))
            : [];

        // Background
        inv.myStory = json?.myStory ?? '';
        inv.personalDescription = json?.personalDescription ?? '';
        inv.ideologyBeliefs = json?.ideologyBeliefs ?? '';
        inv.significantPeople = json?.significantPeople ?? '';
        inv.meaningfulLocations = json?.meaningfulLocations ?? '';
        inv.treasuredPossessions = json?.treasuredPossessions ?? '';
        inv.traits = json?.traits ?? '';
        inv.injuriesScars = json?.injuriesScars ?? '';
        inv.phobiasManias = json?.phobiasManias ?? '';
        inv.arcaneTomesSpells = json?.arcaneTomesSpells ?? '';
        inv.encountersWithTheMythos = json?.encountersWithTheMythos ?? '';

        // Gear
        inv.gearAndPossessions = Array.isArray(json?.gearAndPossessions)
            ? json.gearAndPossessions.slice()
            : [];

        // Wealth
        inv.wealth = Wealth.fromJSON(json?.wealth ?? {});

        // Fellow Investigators
        inv.fellowInvestigators = Array.isArray(json?.fellowInvestigators)
            ? json.fellowInvestigators.map((f: any) => FellowInvestigator.fromJSON(f))
            : [];

        return inv;
    }

    public toJSON(): any {
        return {
            // Basic Info
            name: this.name ?? '',
            birthplace: this.birthplace ?? '',
            pronouns: this.pronouns ?? '',
            occupation: this.occupation ?? '',
            residence: this.residence ?? '',
            age: this.age ?? 0,

            // Characteristics (serialize as regular values)
            strength: this.strength?.toJSON(),
            constitution: this.constitution?.toJSON(),
            size: this.size?.toJSON(),
            dexterity: this.dexterity?.toJSON(),
            appearance: this.appearance?.toJSON(),
            intelligence: this.intelligence?.toJSON(),
            power: this.power?.toJSON(),
            education: this.education?.toJSON(),

            // Pools
            hitPoints: this.hitPoints?.toJSON(),
            magicPoints: this.magicPoints?.toJSON(),
            luck: this.luck?.toJSON(),
            sanity: this.sanity?.toJSON(),

            // Conditions
            temporaryInsanity: !!this.temporaryInsanity,
            indefiniteInsanity: !!this.indefiniteInsanity,
            majorWound: !!this.majorWound,
            unconscious: !!this.unconscious,
            dying: !!this.dying,

            // Other Stats
            movementRate: this.movementRate ?? 0,
            build: this.build ?? 0,
            damageBonus: this.damageBonus ?? 0,

            // Skills
            skills: Array.isArray(this.skills) ? this.skills.map(s => s.toJSON()) : [],

            // Combat
            weapons: Array.isArray(this.weapons) ? this.weapons.map(w => w.toJSON()) : [],

            // Background
            myStory: this.myStory ?? '',
            personalDescription: this.personalDescription ?? '',
            ideologyBeliefs: this.ideologyBeliefs ?? '',
            significantPeople: this.significantPeople ?? '',
            meaningfulLocations: this.meaningfulLocations ?? '',
            treasuredPossessions: this.treasuredPossessions ?? '',
            traits: this.traits ?? '',
            injuriesScars: this.injuriesScars ?? '',
            phobiasManias: this.phobiasManias ?? '',
            arcaneTomesSpells: this.arcaneTomesSpells ?? '',
            encountersWithTheMythos: this.encountersWithTheMythos ?? '',

            // Gear
            gearAndPossessions: Array.isArray(this.gearAndPossessions) ? this.gearAndPossessions.slice() : [],

            // Wealth
            wealth: this.wealth?.toJSON(),

            // Fellow Investigators
            fellowInvestigators: Array.isArray(this.fellowInvestigators) ? this.fellowInvestigators.map(f => f.toJSON()) : [],
        };
    }
}
