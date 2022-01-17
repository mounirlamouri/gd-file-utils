/**
 * GDFileReader is a class that handles basic read operations on a Grim Dawn
 * file, whether it is a character, stash, or quest file.
 * It does not understand the structure of said files but does handle the basic
 * operation such as reading an int or a string from the file.
 * This class will read sequentially and will not allow the caller to seek at
 * an arbitrary position in the file.
 */
 class GDFileReader {
  /**
   * @param {!ArrayBuffer} buffer 
   */
  constructor(buffer) {
    /** ArrayBuffer of the file to read. */
    this.buffer_ = buffer;

    /** Current position in the ArrayBuffer (in byte). */
    this.read_offset_ = 0;

    /**
     * Key used to decrypt the data. Using Uint32Array to guarantee a behaviour
     * matching uint32_t with regards to overflow.
     */
    this.key_ = new Uint32Array(1);

    /**
     * Table used to decrypt the data. Using Uint32Array to guarantee a
     * behaviour matching uint32_t with regards to overflow.
     */
    this.table_ = new Uint32Array(256);
  }

  /**
   * Update the key_ based on the recently read |bytes|. Involves updating the
   * table_.
   * @param {!Array} bytes 
   */
  updateKey_(bytes) {
    for (let i = 0; i < bytes.length; ++i) {
      this.key_[0] ^= this.table_[bytes[i]];
    }
  }

  /**
   * Parses a string, either using wide character or not depending on
   * parameters.
   * @param {boolean} wide 
   * @returns {string} Parsed string.
   */
  readStringInternal_(wide) {
    const length = this.readInt();

    if (length < 0) {
      throw new Error("String length must be > 0")
    }
    if ((this.read_offset_ + length) > this.buffer_.byteLength) {
      throw new Error("String cannot be read before reaching end of file")
    }

    if (length == 0) {
      return "";
    }
    
    let bytes = new Uint8Array(length);
    for (let i = 0; i < length; ++i) {
      if (wide) {
        let c = new Uint8Array(2);
        c[0] = this.readByte();
        c[1] = this.readByte() << 8;

        bytes[i] = c[0] | c[1];
      } else {
        bytes[i] = this.readByte();
      }
    }

    return String.fromCharCode(...bytes);
  }

  readKey() {
    const data = new Uint32Array(this.buffer_, this.read_offset_, 1);
    this.read_offset_ += 4;

    let key = new Uint32Array(1);
    key[0] = data[0];

    key[0] ^= 0x55555555;  // 1431655765

    this.key_[0] = key[0];

    // Setup table_.
    for (let i = 0; i < this.table_.length; ++i) {
      key[0] = key[0] >>> 1 | key[0] << 31;
      key[0] = Math.imul(key[0], 39916801);

      this.table_[i] = key[0];
    }
  }

  readByte() {
    const data = new Uint8Array(this.buffer_, this.read_offset_, 1);
    this.read_offset_ += 1;

    const value = data[0];
    let ret = new Uint8Array(1);
    ret[0] = value ^ this.key_[0];

    this.updateKey_([data[0]]);

    return ret[0];
  }

  /**
   * 
   * @param {boolean=} keyUpdate Whether updateKey_ should be called (optional)
   * @returns parsed integer
   */
  readInt(keyUpdate = true) {
    const data = new DataView(this.buffer_, this.read_offset_, 4);
    this.read_offset_ += 4;

    const value = data.getUint32(0, true /* littleIndian */);
    let ret = new Uint32Array(1);
    ret[0] = value ^ this.key_[0];

    if (keyUpdate) {
      this.updateKey_([data.getUint8(0), data.getUint8(1), data.getUint8(2), data.getUint8(3)]);
    }

    return ret[0];
  }

  readFloat() {
    const data = new DataView(new ArrayBuffer(4));
    data.setInt32(0, this.readInt(), true /* littleIndian */);
    return data.getFloat32(0, true /* little Indian */);
  }

  readWString() {
    return this.readStringInternal_(true /* wide */);
  }

  readString() {
    return this.readStringInternal_(false /* wide */);
  }

  readBlockStart() {
    const ret = this.readInt();
    const length = this.readInt(false /* keyUpdate */);
    const end = this.read_offset_ + length;

    return { 'ret': ret, 'length': length, 'end': end }
  }

  readBlockEnd(block) {
    if (this.read_offset_ != block.end) {
      console.log(this.read_offset_ + " " + block.end);
      throw new Error("Block didn't end at the expected position!");
    }

    if (this.readInt(false /* keyUpdate */) != 0) {
      throw new Error("Hardcoded byte set to 0 wasn't found at the end of the block!")
    }
  }

  /**
   * Reads a uid type (16 bytes)
   * @returns Uint8Array[16]
   */
  readUid() {
    let ret = new Uint8Array(16);
    
    for (let i = 0; i < ret.length; ++i) {
      ret[i] = this.readByte();
    }

    return ret;
  }
}

module.exports = {GDFileReader}