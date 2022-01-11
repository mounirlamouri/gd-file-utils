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
  }
}

module.exports = {GDCharacter}