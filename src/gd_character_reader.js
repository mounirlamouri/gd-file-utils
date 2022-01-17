const {GDCharacter} = require('./gd_character');
const {GDFileReader} = require('./gd_file_reader');

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
    this.character_.level_ = this.reader_.readInt();
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

    this.character_.level_ = this.reader_.readInt();
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
      // TODO
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

    return this.character_;
  }
}

module.exports = {GDCharacterReader}