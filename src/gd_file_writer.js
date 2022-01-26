/**
 * GDFileWriter
 */
class GDFileWriter {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor() {
    /**
     * Constant defining the default size of the buffer.
     * TODO: add mechanism for increasing in size.
     * TODO: pick better default size.
     */
    const BUFFER_SIZE = 4096;
    this.buffer_ = new ArrayBuffer(BUFFER_SIZE);

    this.writeOffset_ = 0;
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
   * Defaults to 0x55555555 at the moment as it avoids encrypting the file.
   * TODO: allow to take a specific key.
   */
  writeKey() {
    this.writeInt(0x55555555);
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

    data.setUint8(0, value, true /* littleIndian */);
  }

  /**
   * Write an int as 4 bytes.
   * @param {Number} value to write
   * @param {Number} offset to use (default to null)
   */
  writeInt(value, offset = null) {
    let data = null;
    if (offset != null) {
      data = new DataView(this.buffer_, offset, 4);
    } else {
      data = new DataView(this.buffer_, this.writeOffset_, 4);
      this.writeOffset_ += 4;
    }

    data.setUint32(0, value, true /* littleIndian */);
  }

  /**
   * Writes a float as 4 bytes.
   * @param {Float32} value to write
   */
  writeFloat(value) {
    const data = new DataView(this.buffer_, this.writeOffset_, 4);
    this.writeOffset_ += 4;
    data.setFloat32(0, value, true /* littleIndian */);
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

    // Writes 0 where we would otherwise write the size of the block.
    this.writeInt(0);

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
    this.writeInt(this.writeOffset_ - index, index - 4);

    // A block has a trailing 0.
    this.writeInt(0);
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
