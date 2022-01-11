/**
 * GDCharacter represents character information fram a character (aka player)
 * save file.
 * It's mostly a structure with all the data that is being populated by
 * GDCharacterReader.
 */
class GDCharacter {
  constructor() {
    /** Name of the character. */
    this.name_ = '';

    /** Sex of the character (either 'male' (1) or 'female' (0)) */
    // TODO: use enums.
    this.sex_ = 0;

    /** Name of the character's class */
    // NOTE: empty string means no class set.
    // TODO: conversion from the code to the name in English?
    // TODO: ... or maybe only save the code and offer an util for the translation?
    this.classInfo_ = '';

    /** Level of the character. */
    this.level_ = 0;

    /** Whether the character is a hardcore character. */
    this.hc_ = false;

    /** Version of the character save file. */
    this.version_ = 0;

    /** UID of the character. */
    this.uid_ = new Uint8Array(16);

    /** Whether the character is in the main quest. */
    // TODO: what does that really mean?
    this.isInMainQuest_ = false;

    /** Whether the character has been in game. */
    this.hasBeenInGame_ = false;

    /** Current difficulty level. */
    // TODO: figure out the values.
    this.difficulty_ = 0;

    /** Maximum difficulty level achieved. */
    // TODO: what does that really mean?
    this.greatestDifficulty_ = 0;

    /** Character's iron bits. */
    this.money_ = 0;

    /** ??? */
    this.greatestSurvivalDifficulty_ = 0;
  
    /** Current tribute value. */
    this.currentTribute_ = 0;

    /** ??? */
    this.compassState_ = 0;

    /** Whether the skill window should show help. */
    // TODO: probably boolean.
    this.skillWindowShowHelp_ = 0;

    /** Whether weapon swap is active. */
    this.weaponSwapActive_ = false;

    /** Whether weapon swap is enabled. */
    this.weaponSwapEnabled_ = false;

    /** Texture?? */
    this.texture_ = '';

    /** Unknown byte. */
    // TODO: what is it? so far, the read value is 39 on new characters.
    this.unknown_ = 0;

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
    this.lootFilter_ = new Array(39);
  }
}

module.exports = {GDCharacter}