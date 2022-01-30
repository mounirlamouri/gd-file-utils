/**
 * GDFileWriter
 */
class GDFileWriter {
  /**
   * Constructor.
   */
  constructor() {
    /**
     * Constant defining the default size of the buffer.
     * TODO: add mechanism for increasing in size.
     * TODO: pick better default size.
     */
    const BUFFER_SIZE = 12288;
    this.buffer_ = new ArrayBuffer(BUFFER_SIZE);

    /**
     * Current position when writing in the buffer.
     */
    this.writeOffset_ = 0;

    /**
     * Key used to encrypt the data. Using Uint32Array to guarantee a behaviour
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
   * Internal method to write strings either as 1-byte or 2-byte characters.
   * @param {string} value to write
   * @param {bool} wide whether the string should be written 2-byte char
   */
  writeStringInternal_(value, wide) {
    const length = value.length;

    this.writeInt(length);

    for (let i = 0; i < length; ++i) {
      if (wide) {
        const code = value.charCodeAt(i);
        const c = new Uint8Array(2);
        c[0] = code & 0b11111111;
        c[1] = code >> 8;

        this.writeByte(c[0]);
        this.writeByte(c[1]);
      } else {
        this.writeByte(value.charCodeAt(i));
      }
    }
  }

  /**
   * Writes the file key.
   * @param {Uint32} value to use to encrypt the file, 0x55555555 by default.
   */
  writeKey(value = 0x55555555) {
    const key = new Uint32Array([value]);

    const data = new DataView(this.buffer_, this.writeOffset_, 4);
    this.writeOffset_ += 4;
    data.setUint32(0, key[0], true /* littleIndian */);

    key[0] ^= 0x55555555;
    this.key_[0] = key[0];

    // Setup table_.
    for (let i = 0; i < this.table_.length; ++i) {
      key[0] = key[0] >>> 1 | key[0] << 31;
      key[0] = Math.imul(key[0], 39916801);

      this.table_[i] = key[0];
    }
  }

  /**
   * Writes a boolean as 1 byte.
   * @param {bool} value to write
   */
  writeBool(value) {
    this.writeByte(value ? 1 : 0);
  }

  /**
   * Write an int as 1 byte.
   * @param {Number} value to write.
   */
  writeByte(value) {
    const data = new DataView(this.buffer_, this.writeOffset_, 1);
    this.writeOffset_ += 1;

    const toWrite = new Uint8Array([value]);
    toWrite[0] ^= this.key_[0];
    data.setUint8(0, toWrite[0]);// , true /* littleIndian */);

    this.updateKey_(toWrite);
  }

  /**
   * Write an int as 4 bytes.
   * @param {Number} value to write
   * @param {bool} keyUpdate whether the table/key should be updated
   * @param {Number} offset to use (default to null)
   */
  writeInt(value, keyUpdate = true, offset = null) {
    if (offset != null) {
      // When writing back, we read the key where we are supposed to write.
      const data = new DataView(this.buffer_, offset, 4);
      const toWrite = new Uint32Array([value]);
      toWrite[0] ^= data.getUint32(0, true /* littleIndian */);
      data.setUint32(0, toWrite[0], true /* littleEndian */);

      if (keyUpdate != false) {
        throw new Error('keyUpdate is not possible when writing backward');
      }

      return;
    }

    const data = new DataView(this.buffer_, this.writeOffset_, 4);
    this.writeOffset_ += 4;

    const toWrite = new Uint32Array([value]);
    toWrite[0] ^= this.key_[0];
    data.setUint32(0, toWrite[0], true /* littleIndian */);

    if (keyUpdate) {
      this.updateKey_([
        data.getUint8(0), data.getUint8(1), data.getUint8(2), data.getUint8(3),
      ]);
    }
  }

  /**
   * Writes a float as 4 bytes.
   * @param {Float32} value to write
   */
  writeFloat(value) {
    const data = new DataView(new ArrayBuffer(4));
    data.setFloat32(0, value, true /* littleEndian */);
    this.writeInt(data.getUint32(0, true /* littleEndian */));
  }

  /**
   * Write a series of bytes starting with the string length then each
   * characters as 2-byte (wchar).
   * @param {String} value to write
   */
  writeWString(value) {
    this.writeStringInternal_(value, true /* wide */);
  }

  /**
   * Write a series of bytes starting with the string length then each
   * characters as 1-byte (char).
   * @param {string} value to write
   */
  writeString(value) {
    this.writeStringInternal_(value, false /* wide */);
  }

  /**
   * Writes the beginning of a file block.
   * @param {Number} key index to be written before the block start
   * @return {Number} index to the start of the block's body.
   */
  writeBlockStart(key) {
    this.writeInt(key);

    // Writes 0 where we would otherwise write the size of the block, this will
    // actually write the key that should be used and will be used later.
    this.writeInt(0, false /* keyUpdate */);

    // Returns the index to the start of the block's body.
    return this.writeOffset_;
  }

  /**
   * Writes the end of a file block.
   * @param {Number} index of the start of the block
   */
  writeBlockEnd(index) {
    // Write the length (current offset - start offset) at start - 4 to write
    // it before the block body actually starts.
    this.writeInt(this.writeOffset_ - index, false /* keyUpdate */, index - 4);

    // A block has a trailing 0.
    this.writeInt(0, false /* keyUpdate */);
  }

  /**
   * Writes a uid type (16 bytes)
   * @param {!Uint8Array} value to write
   */
  writeUid(value) {
    for (let i = 0; i < value.length; ++i) {
      this.writeByte(value[i]);
    }
  }
}

module.exports = {GDFileWriter};
