const {GDFileWriter} = require('./gd_file_writer');

test('Basic writeKey() check', () => {
  const writer = new GDFileWriter();
  writer.writeKey();

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(new Uint8Array([0x55, 0x55, 0x55, 0x55]));
});

test('Basic writeByte() check', () => {
  const writer = new GDFileWriter();
  writer.writeByte(0x12);

  expect(writer.writeOffset_).toEqual(1);

  const buffer = new Uint8Array(writer.buffer_, 0, 1);
  expect(buffer).toStrictEqual(new Uint8Array([0x12]));
});

test('Basic writeInt() check', () => {
  const writer = new GDFileWriter();
  writer.writeInt(0x01234567);

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(new Uint8Array([0x67, 0x45, 0x23, 0x01]));
});

test('writeByte() after writeInt()', () => {
  const writer = new GDFileWriter();
  writer.writeInt(0x01234567);
  writer.writeByte(0x12);

  expect(writer.writeOffset_).toEqual(5);

  const buffer = new Uint8Array(writer.buffer_, 0, 5);
  expect(buffer).toStrictEqual(
      new Uint8Array([0x67, 0x45, 0x23, 0x01, 0x12])); ;
});

test('Basic writeString() check', () => {
  const writer = new GDFileWriter();
  writer.writeString('abc');

  expect(writer.writeOffset_).toEqual(7);

  const buffer = new Uint8Array(writer.buffer_, 0, 7);
  expect(buffer).toStrictEqual(
      new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x61, 0x62, 0x63]));
});

test('Basic writeWString() check', () => {
  const writer = new GDFileWriter();
  writer.writeWString('abc');

  expect(writer.writeOffset_).toEqual(10);

  const buffer = new Uint8Array(writer.buffer_, 0, 10);
  expect(buffer).toStrictEqual(
      new Uint8Array([0x03, 0x00, 0x00, 0x00, 0x61,
        0x00, 0x62, 0x00, 0x63, 0x00]));
});

test('writeString() of length 0', () => {
  const writer = new GDFileWriter();
  writer.writeString('');

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
});

test('writeWString() of length 0', () => {
  const writer = new GDFileWriter();
  writer.writeWString('');

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
});

test('Basic writeBlockStart() check', () => {
  const writer = new GDFileWriter();
  const blockStartOffset = writer.writeBlockStart(2);

  expect(blockStartOffset).toEqual(8);
  expect(writer.writeOffset_).toEqual(8);

  const buffer = new Uint8Array(writer.buffer_, 0, 8);
  expect(buffer).toStrictEqual(
      new Uint8Array([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])); ;
});

test('writeBlockStart() check not at beginning', () => {
  const writer = new GDFileWriter();

  writer.writeInt(1);
  const blockStartOffset = writer.writeBlockStart(2);
  writer.writeInt(3);

  expect(blockStartOffset).toEqual(12);
  expect(writer.writeOffset_).toEqual(16);

  const buffer = new Uint8Array(writer.buffer_, 0, 16);
  expect(buffer).toStrictEqual(
      new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00])); ;
});

test('Basic writeBlockStart() check', () => {
  const writer = new GDFileWriter();

  writer.writeInt(0);
  writer.writeInt(1);
  writer.writeBlockEnd(4);

  expect(writer.writeOffset_).toEqual(12);
  const buffer = new Uint8Array(writer.buffer_, 0, 12);
  expect(buffer).toStrictEqual(
      new Uint8Array([0x04, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00])); ;
});

test('Basic writeFloat() check', () => {
  const writer = new GDFileWriter();
  writer.writeFloat(3.14);

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(new Uint8Array([0xC3, 0xF5, 0x48, 0x40])); ;
});

test('Basic writeUid() check', () => {
  const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);

  const writer = new GDFileWriter();
  writer.writeUid(data);

  expect(writer.writeOffset_).toEqual(16);

  const buffer = new Uint8Array(writer.buffer_, 0, 16);
  expect(buffer).toStrictEqual(data);
});
