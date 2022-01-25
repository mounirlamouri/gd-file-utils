const {GDFactions} = require('./gd_factions');
const {GDPlayStats} = require('./gd_play_stats');
const {GDSkill} = require('./gd_skill');
const {GDUiSettings} = require('./gd_ui_settings');

/**
 * GDCharacter represents character information fram a character (aka player)
 * save file.
 * It's mostly a structure with all the data that is being populated by
 * GDCharacterReader.
 */
class GDCharacter {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor() {
    /** Name of the character. */
    this.name_ = '';

    /** Sex of the character (either 'male' (1) or 'female' (0)) */
    this.sex_ = null;

    /** Name of the character's class */
    // NOTE: empty string means no class set.
    // TODO: conversion from the code to the name in English?
    // TODO: ... or maybe only save the code and offer an util for the
    //       translation?
    this.classInfo_ = '';

    /** Level of the character. */
    // TODO: what's this compared to bioLevel_
    this.headerLevel_ = 1;

    /** Whether the character is a hardcore character. */
    this.hc_ = false;

    /** Version of the character save file. */
    this.version_ = 8; // 8 is currently the only version supported.

    /** UID of the character. */
    // TODO: create UID type
    this.uid_ =
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    /** Whether the character is in the main quest. */
    // TODO: what does that really mean?
    this.isInMainQuest_ = true;

    /** Whether the character has been in game. */
    this.hasBeenInGame_ = false;

    /** Current difficulty level. */
    // TODO: figure out the values.
    this.difficulty_ = 64;

    /** Maximum difficulty level achieved. */
    // TODO: what does that really mean?
    this.greatestDifficulty_ = 0;

    /** Character's iron bits. */
    this.money_ = 0;

    /** ??? */
    this.greatestSurvivalDifficulty_ = 0;

    /** Current tribute value. */
    this.currentTribute_ = 0;

    /** TODO: what is it? */
    this.compassState_ = 3;

    /** Whether the skill window should show help. */
    // TODO: probably boolean.
    this.skillWindowShowHelp_ = 1;

    /** Whether weapon swap is active. */
    this.weaponSwapActive_ = false;

    /** Whether weapon swap is enabled. */
    this.weaponSwapEnabled_ = false;

    /** Texture. TODO: why is it empty for some characters? */
    this.texture_ = '';

    /** Unknown byte. */
    // TODO: what is it? so far, the read value is 39 on new characters.
    this.unknown_ = 39;

    /**
     * Loot filter settings (booleans).
     * Values are:
     * < Quality >
     * 0: Common
     * 1: Magical
     * 2: Rare
     * 3: Monster Infrequent
     * 4: Epic
     * 5: Legendary
     * 6: Sets
     * 7: Always Show Uniques
     * < Type >
     * 8: 1h melee
     * 9: 2h melee
     * 10: 1h: range
     * 11: 2h: range
     * 12: Dagger / Scepter
     * 13: Caster Off-hand
     * 14: Shield
     * 15: Armor
     * 16: Accessories
     * 17: Components
     * < Damage Type >
     * 18: Physical
     * 19: Pierce
     * 20: Fire
     * 21: Cold
     * 22: Lightning
     * 23: Acid
     * 24: Vitality
     * 25: Aether
     * 26: Chaos
     * 27: Bleed
     * 28: Pet Bonuses
     * < Player >
     * 29: My Masteries
     * 30: Other Masteries
     * 31: Speed
     * 32: Cooldown Reduction
     * 33: Critical Damage
     * 34: Offensive Ability
     * 35: Defensive Ability
     * 36: Resistances
     * 37: Retaliation
     * < Quality Again >
     * 38: Always Show Double Rare
    */
    this.lootFilter_ = [true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, false, false, false,
      false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false];

    /** Character level. */
    this.bioLevel_ = 1;

    /** Character cumulated experience points. */
    this.experience_ = 0;

    /** Character attribute (physique/cunning/spirit) points unspent. */
    this.attributePointsUnspent_ = 0;

    /** Character skill points unspent. */
    this.skillPointsUnspent_ = 0;

    /** Character devotion points unspent. */
    this.devotionPointsUnspent_ = 0;

    /** Character devotion points unlocked. */
    this.totalDevotionUnlocked_ = 0;

    /** Character physique attribute points. */
    this.physique_ = 50.0;

    /** Character cunning attribute points. */
    this.cunning_ = 50.0;

    /** Character spirit attribute points. */
    this.spirit_ = 50.0;

    /** Character health points. */
    this.health_ = 250.0;

    /** Character energy points. */
    this.energy_ = 250.0;

    /** Character's inventory. */
    this.inventory_ = null;

    /** Character's personal stash. */
    this.stash_ = [{width: 0, height: 0}];

    /** Character's spawn locations per difficulty level. */
    this.spawnDifficulty_ = [[], [], []];
    this.spawnLocation_ = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    ];

    /** Character's teleport list. */
    this.teleports_ = [[], [], []];

    /** Character's markers list. */
    this.markers_ = [[], [], []];

    /** Character's shrines list. */
    this.shrines_ = [[], [], [], [], [], []];

    /** Character's skills. */
    this.skills_ = [
      new GDSkill({
        name: 'records/skills/default/defaultkickattack.dbr',
        enabled: false,
      }),
      new GDSkill({
        name: 'records/skills/default/defaultwpbasicattack.dbr',
        enabled: false,
      }),
      new GDSkill({name: 'records/skills/default/defaultmoveto.dbr'}),
      new GDSkill({name: 'records/skills/default/defaultweaponattack.dbr'}),
      new GDSkill({name: 'records/skills/default/defaultpetattack.dbr'}),
    ];

    /** Character's skills from items. */
    this.itemSkills_ = [];

    /** Number of masteries allowed. */
    this.masteriesAllowed_ = 0;

    /** Number of time a skill points was reclaimed. */
    this.skillPointsReclaimed_ = 0;

    /** Number of times a devotion point was reclaimed. */
    this.devotionPointsReclaimed_ = 0;

    /** Lore notes collected by character. */
    this.loreNotes_ = [];

    /** Factions information. */
    this.factions_ = new GDFactions();

    /** UI settings */
    this.uiSettings_ = new GDUiSettings();

    /** Tutorial information. */
    this.tutorial_ = [];

    /** Play statistics. */
    this.playStats_ = new GDPlayStats();

    /** Tokens associated to the character by difficulty level. */
    this.tokens_ = [[], [], []];
  }
}

const Sex = {
  Female: 0,
  Male: 1,
};

Object.defineProperty(GDCharacter, 'Sex', {
  value: Sex,
  writable: false,
});

module.exports = {GDCharacter};
