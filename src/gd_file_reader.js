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

  readInt() {
    const data = new DataView(this.buffer_, this.read_offset_, 4);
    this.read_offset_ += 4;

    const value = data.getUint32(0, true /* littleIndian */);
    let ret = new Uint32Array(1);
    ret[0] = value ^ this.key_[0];

    this.updateKey_([data.getUint8(0), data.getUint8(1), data.getUint8(2), data.getUint8(3)]);

    return ret[0];
  }
}

module.exports = {GDFileReader}