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

      // TODO: should be:
      // key[0] *= 39916801;
      // But in JS, this would be computed to 69123175292846030 then the value
      // would be converted to uint32_t which is different from other languages.
      // Doing additions to work around the problem...
      const k = key[0]; // added every iteration.
      for (let i = 1; i < 39916801; ++i) {
          key[0] += k;
      }

      this.table_[i] = key[0];
    }
  }
}

module.exports = {GDFileReader}