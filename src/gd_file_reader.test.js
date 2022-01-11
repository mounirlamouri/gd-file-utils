const {GDFileReader} = require('./gd_file_reader');

test('Checks key_ and table_ values after reading the first 4 bytes', () => {
  const data = new Uint8Array([40, 9, 75, 111]);

  const expectedKey = 0x3a1e5c7d;
  const expectedTable = [ 0xdd58443e, 0xb937ad1f, 0xf64918f, 0x49119bc7,
    0xa66f6ce3, 0x67fffb71, 0x468815b8, 0x8d8416dc, 0x6260116e, 0xdd3e0bb7,
    0xe814fcdb, 0x91b66f6d, 0x4c6325b6, 0x923889db, 0x1290b5ed, 0xdbf488f6,
    0xde335b7b, 0x58f72ebd, 0xe6844d5e, 0xe6bd81af, 0x78a763d7, 0xd9f6f8eb,
    0xa0861575, 0xd49e4cba, 0x2bb1c75d, 0x17429ae, 0xd7e6b7d7, 0x8c88a2eb,
    0x2847ea75, 0xe63bb73a, 0x569ebc9d, 0x8599c44e, 0x10211527, 0x8b219993,
    0xd08649c9, 0x2cadd8e4, 0xb2ee4672, 0xe9f3d039, 0x9fa0341c, 0x5d41400e,
    0xc683307, 0x7ceed883, 0x10f9c141, 0x238a00a0, 0xf91b9050, 0x45211028,
    0xb54e2c14, 0x7d3fe80a, 0xdd895d05, 0x34575882, 0x75ee0141, 0x7aa420a0,
    0xc6f8a050, 0x45379828, 0x65ed7014, 0x3fd98a0a, 0x3cfb2e05, 0x27a2c102,
    0xd39cf581, 0xdca03ac0, 0xe218fd60, 0xd820eeb0, 0xae32af58, 0xfb7673ac,
    0x6f8fc7d6, 0xcf852aeb, 0x695a2e75, 0x288ed93a, 0x51ad4d9d, 0x14938cce,
    0x12973967, 0x82f94bb3, 0x845072d9, 0xa8ca156c, 0x193bf8b6, 0x56cc735b,
    0x42ae6aad, 0xaa4d4356, 0x1834a8ab, 0x533a4d55, 0x883318aa, 0x32d18555,
    0x47cab4aa, 0xd8835355, 0xec969baa, 0xcb62c6d5, 0xf203156a, 0x91f763b5,
    0x862c93da, 0xf3f3baed, 0x4eda8b76, 0x9cbb, 0xf1aaef5d, 0x3094bdae,
    0xcf8901d7, 0xb562c7eb, 0x31b97cf5, 0xd4b6c07a, 0xda5d613d, 0xe989a69e,
    0x49094e4f, 0x2a01da27, 0xa2a67c13, 0x38d2fb09, 0xdab95184, 0x7cb692c2,
    0x4b213e61, 0x33cf8f30, 0xeddf3f98, 0x43575bcc, 0xe7158be6, 0xbcdab4f3,
    0x10b24779, 0xda838fbc, 0x49c4fdde, 0xafdb19ef, 0xac14cff7, 0xcacfefb,
    0xe728c07d, 0x12f7763e, 0x5494461f, 0x25d95e0f, 0x5cef4207, 0x86cfe003,
    0x3c790501, 0x7710280, 0x9f92c140, 0xb15680a0, 0x6341d050, 0xabd43028,
    0xd177bc14, 0x7bcb00a, 0xa4fbc105, 0x3b2a8a82, 0x1be49a41, 0xe765ed20,
    0xae7cc690, 0xa3ab4b48, 0xe39019a4, 0x5a6746d2, 0x26644069, 0x4b8a6434,
    0x82bb541a, 0x793dbb0d, 0xc090db86, 0x6e2c6cc3, 0xe64d2b61, 0x351e05b0,
    0x99a2bad8, 0xb767396c, 0xe4848ab6, 0xdf6dbc5b, 0x78fd8f2d, 0xeeb41596,
    0x8727b1cb, 0xdd23a1e5, 0xf467aaf2, 0x8f8fc279, 0xfcfdcd3c, 0x8547dc9e,
    0x9f1f694f, 0x5aa867a7, 0xde8782d3, 0x98ea5e69, 0xb4087334, 0xba17db9a,
    0xc3abecd, 0xe096bd66, 0xe6e30db3, 0xdba53d9, 0x65b985ec, 0x1a10f0f6,
    0x5b858f7b, 0xd0c248bd, 0x63fada5e, 0xb8c1482f, 0x248d8717, 0x8dfc2a8b,
    0x37e1be45, 0x2e20a922, 0x9af13991, 0xaa1d04c8, 0xb5a4b664, 0x8e3f7532,
    0xc7674799, 0x486f5fcc, 0x27cb8de6, 0x354ab5f3, 0x9574c7f9, 0xef6a0ffc,
    0x549addfe, 0x910759ff, 0x205397ff, 0x4784b6ff, 0x3e62c67f, 0xc5348e3f,
    0xbb2ed21f, 0x35e4a40f, 0x9e53e507, 0x29b1b183, 0x1c1adc1, 0x1d6136e0,
    0x50e0cb70, 0x5b807db8, 0x7c444adc, 0x15e22b6e, 0x7a1018b7, 0xca86835b,
    0xa63372ad, 0xd4e3c756, 0x5be9eaab, 0x6549ee55, 0x35d5692a, 0xf22fed95,
    0x6e088ca, 0xed518d65, 0x7c6760b2, 0xff63fd59, 0x70c21aac, 0xe80f1b56,
    0x167194ab, 0x8806c355, 0x607053aa, 0x4f5ba2d5, 0x1705836a, 0x94fb9ab5,
    0x9f702f5a, 0xbc3648ad, 0x88ac3256, 0x33b1a02b, 0x64df8915, 0x69d9168a,
    0xeb7e3445, 0xcdc5e422, 0xdf2f5711, 0x6f31d388, 0xde09fdc4, 0x2f8f88e2,
    0xcbb60971, 0x16f61cb8, 0x4c849a5c, 0x3105132e, 0x1e02ec97, 0x16209d4b,
    0xf808d7a5, 0xd76ea5d2, 0xb1cd6fe9, 0x6171bbf4, 0x6aa85ffa, 0x4620f0fd,
    0xa0b0ce7e, 0x2daf923f, 0xbd16541f, 0x56ad650f, 0x7b22c587, 0x9c8e61c3 ];

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  expect(reader.key_[0]).toEqual(expectedKey);

  for (let i = 0; i < reader.table_.length; ++i) {
    expect(reader.table_[i]).toEqual(expectedTable[i]);
  }
});

test('Basic readByte() check', () => {
  const data = new Uint8Array([40, 9, 75, 111, 4]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  expect(reader.readByte()).toBe(121);
});

test('updateTable_() behaviour with one byte', () => {
  let reader = new GDFileReader(null);
  reader.key_[0] = 42;
  for (let i = 0; i < reader.table_.length; ++i) {
    reader.table_[i] = i;
  }

  reader.updateKey_([2]);

  expect(reader.key_).toEqual(new Uint32Array([40]));
});

test('Basic readInt() check', () => {
  const data = new Uint8Array([40, 9, 75, 111, 1, 2, 3, 4]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  expect(reader.readInt()).toBe(0x3e1d5e7c);
});

test('updateTable_() behaviour with 4 bytes', () => {
  let reader = new GDFileReader(null);
  reader.key_[0] = 42;
  for (let i = 0; i < reader.table_.length; ++i) {
    reader.table_[i] = i;
  }

  reader.updateKey_([32, 16, 8, 4]);

  expect(reader.key_).toEqual(new Uint32Array(['22']));
});

test('readByte() after readInt()', () => {
  const data = new Uint8Array([40, 9, 75, 111, 1, 2, 3, 4, 0]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  expect(reader.readInt()).toBe(0x3e1d5e7c);
  expect(reader.readByte()).toBe(201);
});

test('Basic readString() check', () => {
  const data = new Uint8Array([40, 9, 75, 111, 3, 0, 0, 0, 42, 0, 42]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  // Force key to 0 to force the string length.
  reader.key_[0] = 0;

  expect(reader.readString()).toBe("Ó¸¬");
});

test('Basic readWString() check', () => {
  const data = new Uint8Array([40, 9, 75, 111, 3, 0, 0, 0, 42, 0, 42, 0, 42, 0]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  // Force key to 0 to force the string length.
  reader.key_[0] = 0;

  expect(reader.readWString()).toBe("Ó¬Ó");
});

test('readString() of length 0', () => {
  const data = new Uint8Array([40, 9, 75, 111, 0, 0, 0, 0]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  // Force key to 0 to force the string length.
  reader.key_[0] = 0;

  expect(reader.readString()).toBe("");
});

test('readWString() of length 0', () => {
  const data = new Uint8Array([40, 9, 75, 111, 0, 0, 0, 0]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  // Force key to 0 to force the string length.
  reader.key_[0] = 0;

  expect(reader.readWString()).toBe("");
});

test('Basic readInt() check without key update', () => {
  const data = new Uint8Array([40, 9, 75, 111, 1, 2, 3, 4, 1, 2 , 3, 4]);

  let reader = new GDFileReader(data.buffer);
  reader.readKey();

  // If the key isn't updated, reading the same 4-bytes twice [1, 2, 3, 4] will
  // yield the same value.
  expect(reader.readInt(false /* keyUpdate */)).toBe(0x3e1d5e7c);
  expect(reader.readInt(false /* keyUpdate */)).toBe(0x3e1d5e7c);
});
