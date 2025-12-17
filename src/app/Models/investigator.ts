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
}