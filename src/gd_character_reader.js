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
    for (let i = 0; i < this.character_.uid_.length; ++i) {
      this.character_.uid_[i] = this.reader_.readByte();
    }
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
    this.character_.unknown_ = this.reader_.readByte();
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

    return this.character_;
  }
}

module.exports = {GDCharacterReader}