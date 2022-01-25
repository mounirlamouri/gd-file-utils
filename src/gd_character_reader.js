const {GDCharacter} = require('./gd_character');
const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDFactions} = require('./gd_factions');
const {GDFileReader} = require('./gd_file_reader');
const {GDHotSlot} = require('./gd_hot_slot');
const {GDInventory} = require('./gd_inventory');
const {GDInventoryItem} = require('./gd_inventory_item');
const {GDItem} = require('./gd_item');
const {GDSkill} = require('./gd_skill');
const {GDPlayStats} = require('./gd_play_stats');
const {GDUiSettings} = require('./gd_ui_settings');

class GDCharacterReader {
  /**
   * 
   * @param {!ArrayBuffer} buffer 
   */
  constructor(buffer) {
    this.reader_ = new GDFileReader(buffer);
    this.character_ = new GDCharacter();
  }

  readHeader_() {
    this.character_.name_ = this.reader_.readWString();
    this.character_.sex_ = this.reader_.readByte();
    this.character_.classInfo_ = this.reader_.readString();
    this.character_.headerLevel_ = this.reader_.readInt();
    this.character_.hc_ = this.reader_.readByte() ? true : false;
  }

  readUid_() {
    this.character_.uid_ = this.reader_.readUid();
  }

  readInfo_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 1) {
      throw new Error('first int of character info is expected to be 1');
    }
    if (this.reader_.readInt() != 5) { // version
      throw new Error('Hardcoded int set to 5 not found!')
    }

    this.character_.isInMainQuest_ = this.reader_.readByte() ? true : false;
    this.character_.hasBeenInGame_ = this.reader_.readByte() ? true : false;
    this.character_.difficulty_ = this.reader_.readByte();
    this.character_.greatestDifficulty_ = this.reader_.readByte();
    this.character_.money_ = this.reader_.readInt();
    this.character_.greatestSurvivalDifficulty_ = this.reader_.readByte();
    this.character_.currentTribute_ = this.reader_.readInt();
    this.character_.compassState_ = this.reader_.readByte();
    this.character_.skillWindowShowHelp_ = this.reader_.readByte();
    this.character_.weaponSwapActive_ = this.reader_.readByte() ? true : false;
    this.character_.weaponSwapEnabled_ = this.reader_.readByte() ? true : false;
    this.character_.texture_ = this.reader_.readString();
    this.character_.unknown_ = this.reader_.readInt();

    for (let i = 0; i < 39; ++i) {
      this.character_.lootFilter_[i] = this.reader_.readByte() ? true : false;
    }

    this.reader_.readBlockEnd(block);
  }

  readStats_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 2) {
      throw new Error('first int of stats block is expected to be 2');
    }
    if (this.reader_.readInt() != 8) { // version
      throw new Error('Hardcoded int set to 8 not found!')
    }

    this.character_.bioLevel_ = this.reader_.readInt();
    this.character_.experience_ = this.reader_.readInt();
    this.character_.attributePointsUnspent_ = this.reader_.readInt();
    this.character_.skillPointsUnspent_ = this.reader_.readInt();
    this.character_.devotionPointsUnspent_ = this.reader_.readInt();
    this.character_.totalDevotionUnlocked_ = this.reader_.readInt();
    this.character_.physique_ = this.reader_.readFloat();
    this.character_.cunning_ = this.reader_.readFloat();
    this.character_.spirit_ = this.reader_.readFloat();
    this.character_.health_ = this.reader_.readFloat();
    this.character_.energy_ = this.reader_.readFloat();

    this.reader_.readBlockEnd(block);
  }

  readItem_() {
    let item = {};

    item.baseName = this.reader_.readString();
    item.prefixName = this.reader_.readString();
    item.suffixName = this.reader_.readString();
    item.modifierName = this.reader_.readString();
    item.transmuteName = this.reader_.readString();
    item.seed = this.reader_.readInt();
    item.componentName = this.reader_.readString();
    item.relicBonus = this.reader_.readString();
    item.componentSeed = this.reader_.readInt();
    item.augmentName = this.reader_.readString();
    item.unknown = this.reader_.readInt();
    item.augmentSeed = this.reader_.readInt();
    item.unknown1 = this.reader_.readInt();
    item.stackCount = this.reader_.readInt();

    return new GDItem(item);
  }

  readEquipmentSlot_() {
    const item = this.readItem_();
    const used = this.reader_.readByte() ? true : false;

    return new GDEquipmentSlot({
      item: used ? item : null,
    });
  }

  readInventoryItem_() {
    let item = this.readItem_();

    item.position = {};
    item.position.x = this.reader_.readInt();
    item.position.y = this.reader_.readInt();

    return new GDInventoryItem(item);
  }

  readInventoryBag_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 0) {
      throw new Error('firnt int expected to be zero');
    }

    let bag = {};

    bag.unknown = this.reader_.readByte();
    bag.items = new Array(this.reader_.readInt());

    for (let i = 0; i < bag.items.length; ++i) {
      bag.items[i] = this.readInventoryItem_();
    }

    this.reader_.readBlockEnd(block);

    return bag;
  }

  readInventory_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 3) {
      throw new Error('first int of inventory block is expected to be 3');
    }
    if (this.reader_.readInt() != 4) { // version
      throw new Error('Hardcoded int set to 4 not found!')
    }

    // Check if the inventory needs to be parsed.
    if (this.reader_.readByte()) {
      let inventory = {};

      inventory.bags = new Array(this.reader_.readInt());
      inventory.focused = this.reader_.readInt();
      inventory.selected = this.reader_.readInt();

      for (let i = 0; i < inventory.bags.length; ++i) {
        inventory.bags[i] = this.readInventoryBag_();
      }

      inventory.useAlternate = this.reader_.readByte();

      inventory.equipment = new Array(12);
      for (let i = 0; i < inventory.equipment.length; ++i) {
        inventory.equipment[i] = this.readEquipmentSlot_();
      }

      inventory.alternate1 = this.reader_.readByte();

      inventory.weapons1 = new Array(2);
      for (let i = 0; i < inventory.weapons1.length; ++i) {
        inventory.weapons1[i] = this.readEquipmentSlot_();
      }

      inventory.alternate2 = this.reader_.readByte();

      inventory.weapons2 = new Array(2);
      for (let i = 0; i < inventory.weapons2.length; ++i) {
        inventory.weapons2[i] = this.readEquipmentSlot_();
      }

      this.character_.inventory_ = new GDInventory(inventory);
    }

    this.reader_.readBlockEnd(block);
  }

  readStashTab_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 0) {
      throw new Error('first int of stash tab block is expected to be 0');
    }

    let stash = {};
    stash.width = this.reader_.readInt();
    stash.height = this.reader_.readInt();

    const itemCount = this.reader_.readInt();
    for (let i = 0; i < itemCount; ++i) {
      // TODO: items
    }

    this.reader_.readBlockEnd(block);

    return stash;
  }

  readStash_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 4) {
      throw new Error('first int of stash block is expected to be 4');
    }
    if (this.reader_.readInt() != 6) { // version
      throw new Error('Hardcoded int set to 6 not found!')
    }

    const stashCount = this.reader_.readInt();
    for (let i = 0; i < stashCount; ++i) {
      this.character_.stash_[i] = this.readStashTab_();
    }

    this.reader_.readBlockEnd(block);
  }

  readSpawnLocations_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 5) {
      throw new Error('first int of spawn block is expected to be 5');
    }
    if (this.reader_.readInt() != 1) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    for (let i = 0; i < this.character_.spawnDifficulty_.length; ++i) {
      const length = this.reader_.readInt();
      this.character_.spawnDifficulty_[i] = new Array(length);
      for (let j = 0; j < length; ++j) {
        this.character_.spawnDifficulty_[i][j] = this.reader_.readUid();
      }
    }

    for (let i = 0; i < this.character_.spawnLocation_.length; ++i) {
      this.character_.spawnLocation_[i] = this.reader_.readUid();
    }

    this.reader_.readBlockEnd(block);
  }

  readTeleports_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 6) {
      throw new Error('first int of telports block is expected to be 6');
    }
    if (this.reader_.readInt() != 1) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    for (let i = 0; i < this.character_.teleports_.length; ++i) {
      const length = this.reader_.readInt();
      this.character_.teleports_[i] = new Array(length);
      for (let j = 0; j < length; ++j) {
        this.character_.teleports_[i][j] = this.reader_.readUid();
      }
    }

    this.reader_.readBlockEnd(block);
  }

  readMarkers_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 7) {
      throw new Error('first int of markers block is expected to be 7');
    }
    if (this.reader_.readInt() != 1) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    for (let i = 0; i < this.character_.markers_.length; ++i) {
      const length = this.reader_.readInt();
      this.character_.markers_[i] = new Array(length);
      for (let j = 0; j < length; ++j) {
        this.character_.markers_[i][j] = this.reader_.readUid();
      }
    }
  
    this.reader_.readBlockEnd(block);
  }

  readShrines_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 17) {
      throw new Error('first int of shrines block is expected to be 17');
    }
    if (this.reader_.readInt() != 2) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    for (let i = 0; i < this.character_.shrines_.length; ++i) {
      const length = this.reader_.readInt();
      this.character_.shrines_[i] = new Array(length);
      for (let j = 0; j < length; ++j) {
        this.character_.shrines_[i][j] = this.reader_.readUid();
      }
    }
  
    this.reader_.readBlockEnd(block);
  }

  readCharacterSkill_() {
    let skill = {};
    
    skill.name = this.reader_.readString();
    skill.level = this.reader_.readInt();
    skill.enabled = this.reader_.readByte() ? true : false;
    skill.devotionLevel = this.reader_.readInt();
    skill.experience = this.reader_.readInt();
    skill.active = this.reader_.readInt();
    skill.unknown1 = this.reader_.readByte();
    skill.unknown2 = this.reader_.readByte();
    skill.autoCastSkill = this.reader_.readString();
    skill.autoCastController = this.reader_.readString();

    return new GDSkill(skill);
  }

  readSkills_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 8) {
      throw new Error('first int of skills block is expected to be 8');
    }
    if (this.reader_.readInt() != 5) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    const skillCount = this.reader_.readInt();
    this.character_.skills_.length = skillCount;
    for (let i = 0; i < skillCount; ++i) {
      this.character_.skills_[i] = this.readCharacterSkill_();
    }

    this.character_.masteriesAllowed_ = this.reader_.readInt();
    this.character_.skillPointsReclaimed_ = this.reader_.readInt();
    this.character_.devotionPointsReclaimed_ = this.reader_.readInt();

    const itemSkillCount = this.reader_.readInt();
    this.character_.itemSkills_.length = itemSkillCount;
    for (let i = 0; i < itemSkillCount; ++i) {
      // TODO
    }

    this.reader_.readBlockEnd(block);
  }

  readLoreNotes_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 12) {
      throw new Error('first int of lore block is expected to be 12');
    }
    if (this.reader_.readInt() != 1) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    const loreNotesCount = this.reader_.readInt();
    this.character_.loreNotes_.length = loreNotesCount;
    for (let i = 0; i < loreNotesCount; ++i) {
      // TODO
    }
    
    this.reader_.readBlockEnd(block);
  }

  readFactionInfo_() {
    let faction = {};

    faction.modified = this.reader_.readByte();
    faction.unlocked = this.reader_.readByte(); // TODO: boolean?
    faction.value = this.reader_.readFloat();
    faction.positiveBoost = this.reader_.readFloat();
    faction.negativeBoost = this.reader_.readFloat();

    return faction;
  }

  readFactions_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 13) {
      throw new Error('first int of factions block is expected to be 13');
    }
    if (this.reader_.readInt() != 5) { // version
      throw new Error('Hardcoded int set to 5 not found!')
    }

    let factions = {};

    // TODO: what is this int?
    factions.faction = this.reader_.readInt();

    const factionCount = this.reader_.readInt();
    factions.list = new Array(factionCount);
    for (let i = 0; i < factionCount; ++i) {
      factions.list[i] = this.readFactionInfo_();
    }

    this.character_.factions_ = new GDFactions(factions);
    
    this.reader_.readBlockEnd(block);
  }

  readHotSlot_() {
    let slot = {};

    slot.type = this.reader_.readInt();

    if (slot.type == GDHotSlot.Type.Regular) {
      slot.skill = this.reader_.readString();
      slot.isItemSkill = this.reader_.readByte() ? true : false;
      slot.item = this.reader_.readString();
      slot.location = this.reader_.readInt();
    } else {
      // TODO
    }

    return new GDHotSlot(slot);
  }

  readUiSettings_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 14) {
      throw new Error('first int of ui settings block is expected to be 14');
    }
    if (this.reader_.readInt() != 5) { // version
      throw new Error('Hardcoded int set to 5 not found!')
    }

    let settings = {};
    settings.unknown1 = this.reader_.readByte();
    settings.unknown2 = this.reader_.readInt();
    settings.unknown3 = this.reader_.readByte();

    settings.unknown4 = new Array(5);
    settings.unknown5 = new Array(5);
    settings.unknown6 = new Array(5);
    for (let i = 0; i < 5; ++i) {
      settings.unknown4[i] = this.reader_.readString();
      settings.unknown5[i] = this.reader_.readString();
      settings.unknown6[i] = this.reader_.readByte();
    }

    settings.hotSlots = new Array(46);
    for (let i = 0; i < 46; ++i) {
      settings.hotSlots[i] = this.readHotSlot_();
    }

    settings.cameraDistance = this.reader_.readFloat();

    this.character_.uiSettings_ = new GDUiSettings(settings);

    this.reader_.readBlockEnd(block);
  }

  readTutorials_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 15) {
      throw new Error('first int of tutorial block is expected to be 15');
    }
    if (this.reader_.readInt() != 1) { // version
      throw new Error('Hardcoded int set to 1 not found!')
    }

    const tutorialCount = this.reader_.readInt();
    this.character_.tutorial_.length = tutorialCount;
    for (let i = 0; i < tutorialCount; ++i) {
      this.character_.tutorial_[i] = this.reader_.readInt();
    }

    this.reader_.readBlockEnd(block);
  }

  readPlayStats_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 16) {
      throw new Error('first int of stats block is expected to be 16');
    }
    if (this.reader_.readInt() != 11) { // version
      throw new Error('Hardcoded int set to 11 not found!')
    }

    let stats = {};

    stats.playTime = this.reader_.readInt();
    stats.deaths = this.reader_.readInt();
    stats.kills = this.reader_.readInt();
    stats.experienceFromKills = this.reader_.readInt();
    stats.healthPotionsUsed = this.reader_.readInt();
    stats.manaPotionsUsed = this.reader_.readInt();
    stats.maxLevel = this.reader_.readInt();
    stats.hitsReceived = this.reader_.readInt();
    stats.hitsInflicted = this.reader_.readInt();
    stats.criticalHitsInflicted = this.reader_.readInt();
    stats.criticalHitsReceived = this.reader_.readInt();
    stats.greatestDamageInflicted = this.reader_.readFloat();

    stats.greatestMonsterKilledName = new Array(3);
    stats.greatestMonsterKilledLevel = new Array(3);
    stats.greatestMonsterKilledLifeAndMana = new Array(3);
    stats.lastMonsterHit = new Array(3);
    stats.lastMonsterHitBy = new Array(3);
    for (let i = 0; i < 3; ++i) {
      stats.greatestMonsterKilledName[i] = this.reader_.readString();
      stats.greatestMonsterKilledLevel[i] = this.reader_.readInt();
      stats.greatestMonsterKilledLifeAndMana[i] = this.reader_.readInt();
      stats.lastMonsterHit[i] = this.reader_.readString();
      stats.lastMonsterHitBy[i] = this.reader_.readString();
    }

    stats.championKills = this.reader_.readInt();
    stats.lastHit = this.reader_.readFloat();
    stats.lastHitBy = this.reader_.readFloat();
    stats.greatestDamageReceived = this.reader_.readFloat();
    stats.herosKilled = this.reader_.readInt();
    stats.itemsCrafted = this.reader_.readInt();
    stats.relicsCrafted = this.reader_.readInt();
    stats.transcendentRelicsCrafted = this.reader_.readInt();
    stats.mythicalRelicsCrafted = this.reader_.readInt();
    stats.shrinesRestored = this.reader_.readInt();
    stats.oneShotChestsOpened = this.reader_.readInt();
    stats.loreNotesCollected = this.reader_.readInt();  

    stats.bossKills = new Array(3);
    for (let i = 0; i < 3; ++i) {
      stats.bossKills[i] = this.reader_.readInt();
    }

    stats.survivalWaveTier = this.reader_.readInt();
    stats.greatestSurvivalScore = this.reader_.readInt();
    stats.cooldownRemaining = this.reader_.readInt();
    stats.cooldownTotal = this.reader_.readInt();

    stats.unknownVector = new Array(this.reader_.readInt());
    for (let i = 0; i < stats.unknownVector.length; ++i) {
      stats.unknownVector[i].name = this.reader_.readString();
      stats.unknownVector[i].value = this.reader_.readInt();
    }

    stats.shatteredRealmSouls = this.reader_.readInt();
    stats.shatteredRealmEssence = this.reader_.readInt();
    stats.difficultySkip = this.reader_.readByte();

    stats.unknown1 = this.reader_.readInt();
    stats.unknown2 = this.reader_.readInt();

    this.character_.playStats_ = new GDPlayStats(stats);
  
    this.reader_.readBlockEnd(block);
  }

  readTokens_() {
    let block = this.reader_.readBlockStart();

    if (block.ret != 10) {
      throw new Error('first int of tokens block is expected to be 10');
    }
    if (this.reader_.readInt() != 2) { // version
      throw new Error('Hardcoded int set to 2 not found!')
    }

    for (let i = 0; i < 3; ++i) {
      this.character_.tokens_[i].length = this.reader_.readInt();

      for (let j = 0; j < this.character_.tokens_[i].length; ++j) {
        this.character_.tokens_[i][j] = this.reader_.readString();
      }
    }

    this.reader_.readBlockEnd(block);
  }

  /**
   * 
   * @returns {GDCharacter} returns the parsed character
   */
  read() {
    this.reader_.readKey();

    if (this.reader_.readInt() != 0x58434447) {
      throw new Error('Hardcoded int set to 0x58434447 not found!')
    }

    if (this.reader_.readInt() != 2) {
      throw new Error('Hardcoded int set to 2 not found!')
    }

    this.readHeader_();

    // The next hardcoded byte seems to be set to 3 for characters that have
    // been used but set to 1 for characters that were not played yet.
    // TODO: verify.
    {
      let byte = this.reader_.readByte();
      if (byte != 1 && byte != 3) {
        throw new Error('Hardcoded byte set to 1 or 3 not found!');
      }
    }

    if (this.reader_.readInt(false /* keyUpdate */) != 0) {
      throw new Error('Hardcoded byte set to 0 not found!')
    }

    this.character_.version_ = this.reader_.readInt();
    if (this.character_.version_ != 8) {
      throw new Error('Only v8 character files are supported.')
    }

    this.readUid_();

    this.readInfo_();

    this.readStats_();

    this.readInventory_();

    this.readStash_();

    this.readSpawnLocations_();

    this.readTeleports_();

    this.readMarkers_();

    this.readShrines_();

    this.readSkills_();

    this.readLoreNotes_();

    this.readFactions_();

    this.readUiSettings_();

    this.readTutorials_();

    this.readPlayStats_();

    this.readTokens_();

    if (this.reader_.readOffset_ != this.reader_.buffer_.byteLength) {
      throw new Error('Should have reached end of file but did not!');
    }

    return this.character_;
  }
}

module.exports = {GDCharacterReader}