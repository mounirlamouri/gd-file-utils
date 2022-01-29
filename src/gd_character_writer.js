const {GDFileWriter} = require('./gd_file_writer');
const {GDHotSlot} = require('./gd_hot_slot');
const {GDItem} = require('./gd_item');

/**
 * GDCharacterWriter is a class that will take a GDCharacter as an input and
 * will output an ArrayBuffer representing the character. This ArrayBuffer can
 * then be written to disk.
 */
class GDCharacterWriter {
  /**
   * @param {!GDCharacter} character
   */
  constructor(character) {
    this.writer_ = new GDFileWriter();
    this.character_ = character;
  }

  /**
   * Writes the character header (TODO?).
   */
  writeHeader_() {
    this.writer_.writeWString(this.character_.name_);
    this.writer_.writeByte(this.character_.sex_);
    this.writer_.writeString(this.character_.classInfo_);
    this.writer_.writeInt(this.character_.headerLevel_);
    this.writer_.writeBool(this.character_.hc_);
  }

  /**
   * Writes the character UID.
   */
  writeUid_() {
    this.writer_.writeUid(this.character_.uid_);
  }

  /**
   * Writes the info block.
   */
  writeInfo_() {
    const blockStart = this.writer_.writeBlockStart(1);

    this.writer_.writeInt(5); // version

    this.writer_.writeBool(this.character_.isInMainQuest_);
    this.writer_.writeBool(this.character_.hasBeenInGame_);
    this.writer_.writeByte(this.character_.difficulty_);
    this.writer_.writeByte(this.character_.greatestDifficulty_);
    this.writer_.writeInt(this.character_.money_);
    this.writer_.writeByte(this.character_.greatestSurvivalDifficulty_);
    this.writer_.writeInt(this.character_.currentTribute_);
    this.writer_.writeByte(this.character_.compassState_);
    this.writer_.writeByte(this.character_.skillWindowShowHelp_);
    this.writer_.writeBool(this.character_.weaponSwapActive_);
    this.writer_.writeBool(this.character_.weaponSwapEnabled_);
    this.writer_.writeString(this.character_.texture_);
    this.writer_.writeInt(this.character_.unknown_);

    for (let i = 0; i < this.character_.lootFilter_.length; ++i) {
      this.writer_.writeBool(this.character_.lootFilter_[i]);
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes the character stats (such as level, physique, etc.).
   */
  writeStats_() {
    const blockStart = this.writer_.writeBlockStart(2);

    this.writer_.writeInt(8); // version

    this.writer_.writeInt(this.character_.bioLevel_);
    this.writer_.writeInt(this.character_.experience_);
    this.writer_.writeInt(this.character_.attributePointsUnspent_);
    this.writer_.writeInt(this.character_.skillPointsUnspent_);
    this.writer_.writeInt(this.character_.devotionPointsUnspent_);
    this.writer_.writeInt(this.character_.totalDevotionUnlocked_);
    this.writer_.writeFloat(this.character_.physique_);
    this.writer_.writeFloat(this.character_.cunning_);
    this.writer_.writeFloat(this.character_.spirit_);
    this.writer_.writeFloat(this.character_.health_);
    this.writer_.writeFloat(this.character_.energy_);

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes a basic GDItem.
   * @param {!GDItem} item to write
   */
  writeItem_(item) {
    this.writer_.writeString(item.baseName_);
    this.writer_.writeString(item.prefixName_);
    this.writer_.writeString(item.suffixName_);
    this.writer_.writeString(item.modifierName_);
    this.writer_.writeString(item.transmuteName_);
    this.writer_.writeInt(item.seed_);
    this.writer_.writeString(item.componentName_);
    this.writer_.writeString(item.relicBonus_);
    this.writer_.writeInt(item.componentSeed_);
    this.writer_.writeString(item.augmentName_);
    this.writer_.writeInt(item.unknown_);
    this.writer_.writeInt(item.augmentSeed_);
    this.writer_.writeInt(item.unknown1_);
    this.writer_.writeInt(item.stackSize_);
  }

  /**
   * Writes information about an equipment slot.
   * @param {GDEquipmentSlot} slot to write
   */
  writeEquipmentSlot_(slot) {
    // Writes the item if there is one in the slot, otherwise GDItem because the
    // file expected an item regardless of whether the slot is filled.
    this.writeItem_(slot.item_);
    this.writer_.writeBool(slot.used_);
  }

  /**
   * Writes information about an item in the inventory.
   * @param {GDInventoryItem} item to write
   */
  writeInventoryItem_(item) {
    // This will only write the regular fields of an item.
    this.writeItem_(item);

    // Writing the additional fields.
    this.writer_.writeInt(item.position_.x);
    this.writer_.writeInt(item.position_.y);
  }

  /**
   * Writes information about an inventory bag.
   * @param {Object} bag to write
   */
  writeInventoryBag_(bag) {
    const blockStart = this.writer_.writeBlockStart(0);

    this.writer_.writeByte(bag.unknown);
    this.writer_.writeInt(bag.items.length);

    for (let i = 0; i < bag.items.length; ++i) {
      this.writeInventoryItem_(bag.items[i]);
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about the character's inventory.
   */
  writeInventory_() {
    const blockStart = this.writer_.writeBlockStart(3);

    this.writer_.writeInt(4); // version
    this.writer_.writeBool(this.character_.inventory_ != null);

    const inventory = this.character_.inventory_;
    if (inventory) {
      this.writer_.writeInt(inventory.bags_.length);
      this.writer_.writeInt(inventory.focused_);
      this.writer_.writeInt(inventory.selected_);

      for (let i = 0; i < inventory.bags_.length; ++i) {
        this.writeInventoryBag_(inventory.bags_[i]);
      }

      this.writer_.writeByte(inventory.useAlternate_); // TODO: bool?

      for (let i = 0; i < inventory.equipment_.length; ++i) {
        this.writeEquipmentSlot_(inventory.equipment_[i]);
      }

      this.writer_.writeByte(inventory.alternate1_); // TODO: bool?

      for (let i = 0; i < inventory.weapons1_.length; ++i) {
        this.writeEquipmentSlot_(inventory.weapons1_[i]);
      }

      this.writer_.writeByte(inventory.alternate2_); // TODO: bool?

      for (let i = 0; i < inventory.weapons2_.length; ++i) {
        this.writeEquipmentSlot_(inventory.weapons2_[i]);
      }
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about a stash tab.
   * @param {Object} stash to write
   */
  writeStashTab_(stash) {
    const blockStart = this.writer_.writeBlockStart(0);

    this.writer_.writeInt(stash.width);
    this.writer_.writeInt(stash.height);

    // TODO: only write 0 size stash.
    this.writer_.writeInt(0);

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about the character's stash.
   */
  writeStash_() {
    const blockStart = this.writer_.writeBlockStart(4);

    this.writer_.writeInt(6); // version

    this.writer_.writeInt(this.character_.stash_.length);

    for (let i = 0; i < this.character_.stash_.length; ++i) {
      this.writeStashTab_(this.character_.stash_[i]);
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about spawn locations.
   */
  writeSpawnLocations_() {
    const blockStart = this.writer_.writeBlockStart(5);

    this.writer_.writeInt(1); // version

    for (let i = 0; i < this.character_.spawnDifficulty_.length; ++i) {
      this.writer_.writeInt(this.character_.spawnDifficulty_[i].length);
      for (let j = 0; j < this.character_.spawnDifficulty_[i].length; ++j) {
        this.writer_.writeUid(this.character_.spawnDifficulty_[i][j]);
      }
    }

    for (let i = 0; i < this.character_.spawnLocation_.length; ++i) {
      this.writer_.writeUid(this.character_.spawnLocation_[i]);
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about teleports.
   */
  writeTeleports_() {
    const blockStart = this.writer_.writeBlockStart(6);

    this.writer_.writeInt(1); // version

    for (let i = 0; i < this.character_.teleports_.length; ++i) {
      this.writer_.writeInt(this.character_.teleports_[i].length);
      for (let j = 0; j < this.character_.teleports_[i].length; ++j) {
        this.writer_.writeUid(this.character_.teleports_[i][j]);
      }
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about markers.
   */
  writeMarkers_() {
    const blockStart = this.writer_.writeBlockStart(7);

    this.writer_.writeInt(1); // version

    for (let i = 0; i < this.character_.markers_.length; ++i) {
      this.writer_.writeInt(this.character_.markers_[i].length);
      for (let j = 0; j < this.character_.markers_[i].length; ++j) {
        this.writer_.writeUid(this.character_.markers_[i][j]);
      }
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about shrines.
   */
  writeShrines_() {
    const blockStart = this.writer_.writeBlockStart(17);

    this.writer_.writeInt(2); // version

    for (let i = 0; i < this.character_.shrines_.length; ++i) {
      this.writer_.writeInt(this.character_.shrines_[i].length);
      for (let j = 0; j < this.character_.shrines_[i].length; ++j) {
        this.writer_.writeUid(this.character_.shrines_[i][j]);
      }
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Write information about a GDSkill.
   * @param {GDSkill} skill to write
   */
  writeCharacterSkill_(skill) {
    this.writer_.writeString(skill.name_);
    this.writer_.writeInt(skill.level_);
    this.writer_.writeBool(skill.enabled_);
    this.writer_.writeInt(skill.devotionLevel_);
    this.writer_.writeInt(skill.experience_);
    this.writer_.writeInt(skill.active_);
    this.writer_.writeByte(skill.unknown1_);
    this.writer_.writeByte(skill.unknown2_);
    this.writer_.writeString(skill.autoCastSkill_);
    this.writer_.writeString(skill.autoCastController_);
  }

  /**
   * Write information about the character's skills.
   */
  writeSkills_() {
    const blockStart = this.writer_.writeBlockStart(8);

    this.writer_.writeInt(5); // version

    this.writer_.writeInt(this.character_.skills_.length);

    for (let i = 0; i < this.character_.skills_.length; ++i) {
      this.writeCharacterSkill_(this.character_.skills_[i]);
    }

    this.writer_.writeInt(this.character_.masteriesAllowed_);
    this.writer_.writeInt(this.character_.skillPointsReclaimed_);
    this.writer_.writeInt(this.character_.devotionPointsReclaimed_);

    this.writer_.writeInt(this.character_.itemSkills_.length);

    for (let i = 0; i < this.character_.itemSkills_.length; ++i) {
      // TODO
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about the character's collected lore notes.
   */
  writeLoreNotes_() {
    const blockStart = this.writer_.writeBlockStart(12);

    this.writer_.writeInt(1); // version

    this.writer_.writeInt(this.character_.loreNotes_.length);

    for (let i = 0; i < this.character_.loreNotes_.length; ++i) {
      // TODO
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Writes information about a faction.
   * @param {Object} faction
   */
  writeFactionInfo_(faction) {
    this.writer_.writeByte(faction.modified);
    this.writer_.writeByte(faction.unlocked); // TODO: bool
    this.writer_.writeFloat(faction.value);
    this.writer_.writeFloat(faction.positiveBoost);
    this.writer_.writeFloat(faction.negativeBoost);
  }

  /**
   * Writes information abouth the factions.
   */
  writeFactions_() {
    const blockStart = this.writer_.writeBlockStart(13);

    this.writer_.writeInt(5); // version

    this.writer_.writeInt(this.character_.factions_.faction_);

    this.writer_.writeInt(this.character_.factions_.list_.length);

    for (let i = 0; i < this.character_.factions_.list_.length; ++i) {
      this.writeFactionInfo_(this.character_.factions_.list_[i]);
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Write information related to a UI hot slot.
   * @param {GDHotSlot} slot to write
   */
  writeHotSlot_(slot) {
    this.writer_.writeInt(slot.type_);

    if (slot.type_ == GDHotSlot.Type.Regular) {
      this.writer_.writeString(slot.skill_);
      this.writer_.writeBool(slot.isItemSkill_);
      this.writer_.writeString(slot.item_);
      this.writer_.writeInt(slot.location_);
    } else {
      // TODO
    }
  }

  /**
   * Writes ui settings related to the character.
   */
  writeUiSettings_() {
    const blockStart = this.writer_.writeBlockStart(14);

    this.writer_.writeInt(5); // version

    const settings = this.character_.uiSettings_;

    this.writer_.writeByte(settings.unknown1_);
    this.writer_.writeInt(settings.unknown2_);
    this.writer_.writeByte(settings.unknown3_);

    for (let i = 0; i < 5; ++i) {
      this.writer_.writeString(settings.unknown4_[i]);
      this.writer_.writeString(settings.unknown5_[i]);
      this.writer_.writeByte(settings.unknown6_[i]);
    }

    for (let i = 0; i < 46; ++i) {
      this.writeHotSlot_(settings.hotSlots_[i]);
    }

    this.writer_.writeFloat(settings.cameraDistance_);

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Write tutorials seen by the user.
   */
  writeTutorials_() {
    const blockStart = this.writer_.writeBlockStart(15);

    this.writer_.writeInt(1); // version

    this.writer_.writeInt(this.character_.tutorial_.length);

    for (let i = 0; i < this.character_.tutorial_.length; ++i) {
      this.writer_.writeInt(this.character_.tutorial_[i]);
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Write player statistics.
   */
  writePlayStats_() {
    const blockStart = this.writer_.writeBlockStart(16);

    this.writer_.writeInt(11); // version

    const stats = this.character_.playStats_;

    this.writer_.writeInt(stats.playTime_);
    this.writer_.writeInt(stats.deaths_);
    this.writer_.writeInt(stats.kills_);
    this.writer_.writeInt(stats.experienceFromKills_);
    this.writer_.writeInt(stats.healthPotionsUsed_);
    this.writer_.writeInt(stats.manaPotionsUsed_);
    this.writer_.writeInt(stats.maxLevel_);
    this.writer_.writeInt(stats.hitsReceived_);
    this.writer_.writeInt(stats.hitsInflicted_);
    this.writer_.writeInt(stats.criticalHitsInflicted_);
    this.writer_.writeInt(stats.criticalHitsReceived_);
    this.writer_.writeFloat(stats.greatestDamageInflicted_);

    for (let i = 0; i < 3; ++i) {
      this.writer_.writeString(stats.greatestMonsterKilledName_[i]);
      this.writer_.writeInt(stats.greatestMonsterKilledLevel_[i]);
      this.writer_.writeInt(stats.greatestMonsterKilledLifeAndMana_[i]);
      this.writer_.writeString(stats.lastMonsterHit_[i]);
      this.writer_.writeString(stats.lastMonsterHitBy_[i]);
    }

    this.writer_.writeInt(stats.championKills_);
    this.writer_.writeFloat(stats.lastHit_);
    this.writer_.writeFloat(stats.lastHitBy_);
    this.writer_.writeFloat(stats.greatestDamageReceived_);
    this.writer_.writeInt(stats.herosKilled_);
    this.writer_.writeInt(stats.itemsCrafted_);
    this.writer_.writeInt(stats.relicsCrafted_);
    this.writer_.writeInt(stats.transcendentRelicsCrafted_);
    this.writer_.writeInt(stats.mythicalRelicsCrafted_);
    this.writer_.writeInt(stats.shrinesRestored_);
    this.writer_.writeInt(stats.oneShotChestsOpened_);
    this.writer_.writeInt(stats.loreNotesCollected_);

    for (let i = 0; i < 3; ++i) {
      this.writer_.writeInt(stats.bossKills_[i]);
    }

    this.writer_.writeInt(stats.survivalWaveTier_);
    this.writer_.writeInt(stats.greatestSurvivalScore_);
    this.writer_.writeInt(stats.cooldownRemaining_);
    this.writer_.writeInt(stats.cooldownTotal_);

    this.writer_.writeInt(stats.unknownVector_.length);
    for (let i = 0; i < stats.unknownVector_.length; ++i) {
      this.writer_.writeString(stats.unknownVector_[i].name);
      this.writer_.writeInt(stats.unknownVector_[i].value);
    }

    this.writer_.writeInt(stats.shatteredRealmSouls_);
    this.writer_.writeInt(stats.shatteredRealmEssence_);
    this.writer_.writeByte(stats.difficultySkip_);

    this.writer_.writeInt(stats.unknown1_);
    this.writer_.writeInt(stats.unknown2_);

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   * Write tokens associated to the user.
   */
  writeTokens_() {
    const blockStart = this.writer_.writeBlockStart(10);

    this.writer_.writeInt(2); // version

    for (let i = 0; i < 3; ++i) {
      this.writer_.writeInt(this.character_.tokens_[i].length);

      for (let j = 0; j < this.character_.tokens_[i].length; ++j) {
        this.writer_.writeString(this.character_.tokens_[i][j]);
      }
    }

    this.writer_.writeBlockEnd(blockStart);
  }

  /**
   *
   * @return {ArrayBuffer} returns the generated character save file
   */
  write() {
    this.writer_.writeKey(this.character_.fileInfo_.key);

    // Two hardcoded int.
    this.writer_.writeInt(0x58434447);
    this.writer_.writeInt(2);

    this.writeHeader_();

    // The next hardcoded byte seems to be set to 3 for characters that have
    // been used but set to 1 for characters that were not played yet.
    // TODO: verify.
    this.writer_.writeByte(this.character_.hasBeenInGame_ ? 3 : 1);

    this.writer_.writeInt(0, false /* keyUpdate */);

    this.writer_.writeInt(this.character_.fileInfo_.version);

    this.writeUid_();

    this.writeInfo_();

    this.writeStats_();

    this.writeInventory_();

    this.writeStash_();

    this.writeSpawnLocations_();

    this.writeTeleports_();

    this.writeMarkers_();

    this.writeShrines_();

    this.writeSkills_();

    this.writeLoreNotes_();

    this.writeFactions_();

    this.writeUiSettings_();

    this.writeTutorials_();

    this.writePlayStats_();

    this.writeTokens_();

    return this.writer_.buffer_.slice(0, this.writer_.writeOffset_);
  }
}

module.exports = {GDCharacterWriter};
