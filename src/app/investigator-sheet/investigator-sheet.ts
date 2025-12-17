import { Component, OnInit } from '@angular/core';
import { Investigator } from '../Models/investigator';
import { Characteristic } from '../Models/characteristic';
import { HitPoints } from '../Models/hitPoints';
import { MagicPoints } from '../Models/magicPoints';
import { Luck } from '../Models/luck';
import { Sanity } from '../Models/sanity';
import { Skill } from '../Models/skill';
import { Weapon } from '../Models/weapon';
import { Wealth } from '../Models/wealth';
import { FellowInvestigator } from '../Models/fellowInvestigators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-investigator-sheet',
  imports: [JsonPipe],
  templateUrl: './investigator-sheet.html',
  styleUrl: './investigator-sheet.css',
})
export class InvestigatorSheet implements OnInit {
  investigator!: Investigator;

  ngOnInit(): void {
    this.investigator = {
      name: 'Jane Doe',
      birthplace: 'Arkham',
      pronouns: 'she/her',
      occupation: 'Antiquarian',
      residence: 'Boston',
      age: 32,
      strength: new Characteristic('STR'),
      constitution: new Characteristic('CON'),
      size: new Characteristic('SIZ'),
      dexterity: new Characteristic('DEX'),
      appearance: new Characteristic('APP'),
      intelligence: new Characteristic('INT'),
      power: new Characteristic('POW'),
      education: new Characteristic('EDU'),
      hitPoints: new HitPoints(10, 15),
      magicPoints: new MagicPoints(10, 12),
      luck: new Luck(55, 55),
      sanity: new Sanity(30, 30, 40),
      temporaryInsanity: false,
      indefiniteInsanity: false,
      majorWound: false,
      unconscious: false,
      dying: false,
      movementRate: 8,
      build: 0,
      damageBonus: 0,
      skills: [
        new Skill('Spot Hidden', 5),
        new Skill('Library Use', 20),
        new Skill('Occult', 10),
        new Skill('History', 15),
        new Skill('Art', 5),
        new Skill('Persuade', 10)
      ],
      weapons: [
        new Weapon({ name: 'Brawl', damage: '1d3 + DB', numberOfAttacks: 1 })
      ],
      myStory: 'A curious mind with a dark past.',
      personalDescription: 'Tall, bespectacled, and inquisitive.',
      ideologyBeliefs: 'Knowledge above all.',
      significantPeople: 'Mentor at Miskatonic University.',
      meaningfulLocations: 'Old family library.',
      treasuredPossessions: 'Inherited locket.',
      traits: 'Curious, methodical.',
      injuriesScars: '',
      phobiasManias: '',
      arcaneTomesSpells: '',
      encountersWithTheMythos: '',
      gearAndPossessions: ['Notebook', 'Magnifying glass'],
      wealth: new Wealth({ spendingLevel: 150, cash: 100, assets: ['House', 'Car'] }),
      fellowInvestigators: [
        new FellowInvestigator({ characterName: 'John Smith', playerName: 'Cooper', notes: 'Met during the Miskatonic expedition.'})
      ]
    };

    this.investigator.strength.setRegular(50);
    this.investigator.constitution.setRegular(60);
    this.investigator.size.setRegular(70);
    this.investigator.dexterity.setRegular(65);
    this.investigator.appearance.setRegular(55);
    this.investigator.intelligence.setRegular(75);
    this.investigator.power.setRegular(80);
    this.investigator.education.setRegular(85);

    this.investigator.skills.forEach(skill => {
      skill.setRegular(25);
    });
  }
}