const {GDFileWriter} = require('./gd_file_writer');

test('Basic writeKey() check', () => {
  const writer = new GDFileWriter();
  writer.writeKey();

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(new Uint8Array([0x55, 0x55, 0x55, 0x55]));

  expect(writer.key_[0]).toStrictEqual(0);
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

test('Checks key_ and table_ values after writeKey()', () => {
  const data = new Uint8Array([0x78, 0x56, 0x34, 0x12]);

  const expectedKey = 0x4761032D;
  const expectedTable = new Uint32Array([0x6427cf96, 0x3e028ecb, 0x91219065,
    0xe7eee232, 0xccb77e19, 0xe893bb0c, 0x7f3bdb86, 0xd101ecc3, 0x9977eb61,
    0xaf9365b0, 0x574d6ad8, 0x6e74916c, 0xf82736b6, 0xab4d125b, 0xd2f43a2d,
    0x1f32eb16, 0x45e8dc8b, 0x2251745, 0x32e8d5a2, 0xc1688fd1, 0xb9824fe8,
    0x407c2bf4, 0x7fc597fa, 0x1f7b8cfd, 0x52c41c7e, 0x186c393f, 0x12ce279f,
    0x1d760ecf, 0x825d7a67, 0xad06ec33, 0x90ac8319, 0xc9c2bd8c, 0x56ad9cc6,
    0x43c7ed63, 0x30317bb1, 0x3e8375d8, 0x2f0316ec, 0x7ba83976, 0xfd0a73bb,
    0x93015add, 0xea68b36e, 0x2ce75cb7, 0xda3c255b, 0xd23343ad, 0x1762fd6,
    0x3fbc5eeb, 0xbf17c875, 0x473ea63a, 0xed6db41d, 0xb1e8000e, 0x6d9b9307,
    0xf8f88883, 0x8cb69941, 0x8c446ca0, 0x48e6c650, 0x7dbdab28, 0x9b77f994,
    0x16028eca, 0xfd219065, 0x1deee232, 0x67b77e19, 0x3613bb0c, 0xe5fbdb86,
    0xe461ecc3, 0x1327eb61, 0x246b65b0, 0xedb96ad8, 0x27aa916c, 0x8bc236b6,
    0xd09a925b, 0x535afa2d, 0x76464b16, 0x6ce28c8b, 0x2b59ef45, 0xde5f41a2,
    0xe891c5d1, 0xb8cdeae8, 0xb77d7974, 0xf7b3feba, 0xda09a05d, 0x8f86962e,
    0xeea32e17, 0xf9e07e0b, 0x9d00a805, 0x2e267e02, 0x8c9f5401, 0xb941aa00,
    0x4319d500, 0x8b496a80, 0xf5c2f540, 0xb0909aa0, 0x31efdd50, 0x2d33b6a8,
    0x786bbf54, 0xbaf8d1aa, 0xf4cae1d5, 0xe952a2ea, 0x1facea75, 0x66e373a,
    0x38f7fc9d, 0xbfe6644e, 0xa1d76527, 0xf644c193, 0xb3bddc9, 0xc69aa2e4,
    0x7b2dab72, 0xa3802b9, 0xd148d5c, 0x82448cae, 0x65de6957, 0x9d0c3bab,
    0xc6ad96d5, 0xe9307d6a, 0x1e5217b5, 0x1ebbedda, 0x2e6c67ed, 0xa5af61f6,
    0x97747fb, 0x60c64fd, 0x22e8887e, 0xf4ec6f3f, 0xfe45429f, 0x934d1c4f,
    0x9e16c127, 0x7baa6f93, 0xf091b4c9, 0x7a170e64, 0xcd14a132, 0x7b1fdd99,
    0x9f72aacc, 0xab60b366, 0x2fdf08b3, 0x1583d159, 0xf40404ac, 0x32c91056,
    0x46db0f2b, 0x2901c095, 0xb6f0f24a, 0x6e6d8225, 0x80df3b12, 0x2b44da89,
    0xd75d0144, 0xbd9dcaa2, 0xdd4f8a51, 0xb5fc0d28, 0xd79c2a94, 0xf897274a,
    0xeaed1ca5, 0x40354852, 0xd51b0129, 0x662da494, 0x5460e44a, 0xad927b25,
    0xd1283792, 0xa80498c9, 0xbe2a8064, 0xd44b5a32, 0x49d1ba19, 0x9896d90c,
    0xa6f86a86, 0x383db443, 0xc848f21, 0x33b11790, 0x6417f3c8, 0xa4efade4,
    0x7ccbb0f2, 0x9100c579, 0x31d5cebc, 0xc4839d5e, 0x768529af, 0x44ef37d7,
    0x5c4ce2eb, 0xbcca0a75, 0x96ccc73a, 0xaa0f449d, 0x90e6084e, 0x98913727,
    0xd9beaa93, 0x21875249, 0xfc479d24, 0xd767c892, 0x3f16e149, 0x5ece4a4,
    0x2f692c52, 0x1f8ef329, 0x25d49d94, 0xb9eae0ca, 0xdf72b965, 0xa7c5f6b2,
    0xe13a4859, 0xe140c02c, 0x2cd82e16, 0xc57afe0b, 0x990de805, 0x574d1e02,
    0x6c2a401, 0x911b5200, 0xf06aa900, 0xdca3d480, 0x68c92a40, 0x35c03520,
    0xad9dea90, 0xd135dd48, 0xd25262a4, 0x1e46eb52, 0xded352a9, 0x6b218d54,
    0xb046b8aa, 0xe4eb5555, 0x97df9caa, 0xd011c755, 0x3a1fd5aa, 0x100863d5,
    0x9dc663ea, 0xc9d14af5, 0xa1b5a77a, 0xf8d654bd, 0x9082e05e, 0x86444b2f,
    0xfc6e8897, 0xfd3c6b4b, 0x9689bea5, 0xb3a89952, 0x222729a9, 0x389cf8d4,
    0x84ad2e6a, 0x11d2f035, 0x659d9a1a, 0xf58dde0d, 0xe9a86d06, 0x8aeff583,
    0x222acfc1, 0x6e7ac7e0, 0xfe6013f0, 0x26f961f8, 0x557d5cfc, 0xe8cd047e,
    0xb4f4ad3f, 0xf3d4619f, 0x4c5a2bcf, 0x738008e7, 0xfb07373, 0x95ad66b9,
    0x15693f5c, 0xb8bbe5ae, 0xc2c095d7, 0x9091eb, 0xfd1961f5, 0x8bcb32fa,
    0x3dd9da7d, 0x6ee1033e, 0xcd518c9f, 0x80dc414f, 0x7662d3a7, 0x87d2b8d3,
    0xbe46f969,
  ]);

  const writer = new GDFileWriter();
  writer.writeKey(0x12345678);

  expect(writer.writeOffset_).toEqual(4);

  const buffer = new Uint8Array(writer.buffer_, 0, 4);
  expect(buffer).toStrictEqual(data);

  expect(writer.key_[0]).toStrictEqual(expectedKey);
  expect(writer.table_).toStrictEqual(expectedTable);
});

test('updateTable_() behaviour with one byte', () => {
  const writer = new GDFileWriter();
  writer.key_[0] = 42;
  for (let i = 0; i < writer.table_.length; ++i) {
    writer.table_[i] = i;
  }

  writer.updateKey_([2]);

  expect(writer.key_).toEqual(new Uint32Array([40]));
});

test('updateTable_() behaviour with 4 bytes', () => {
  const writer = new GDFileWriter();
  writer.key_[0] = 42;
  for (let i = 0; i < writer.table_.length; ++i) {
    writer.table_[i] = i;
  }

  writer.updateKey_([32, 16, 8, 4]);

  expect(writer.key_).toEqual(new Uint32Array([22]));
});
