const {GDCharacterReader} = require('../src/gd_character_reader');
const {GDCharacterWriter} = require('../src/gd_character_writer');
const fs = require('fs/promises');

test('Reads & writes a gdc, read again (freshly_created.gdc)', async () => {
  const buffer = await fs.readFile('test/data/freshly_created.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});

test('Reads & writes a gdc, read again (woman_hc.gdc)', async () => {
  const buffer = await fs.readFile('test/data/woman_hc.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});

test('Reads & writes a gdc, read again (just_started_game.gdc)', async () => {
  const buffer = await fs.readFile('test/data/just_started_game.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});

test('Reads & writes a gdc, read again (dead_hc.gdc)', async () => {
  const buffer = await fs.readFile('test/data/dead_hc.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});

test('Reads & writes a gdc, read again (dead_hc.gdc)', async () => {
  const buffer = await fs.readFile('test/data/crucible_one_round.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});

test('Reads & writes a gdc, read again (dead_hc.gdc)', async () => {
  const buffer = await fs.readFile('test/data/two_masteries_not_taken.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});

test('Reads & writes a gdc, read again (lore_skills.gdc)', async () => {
  const buffer = await fs.readFile('test/data/lore_skills.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  expect(characterBuffer.byteLength).toEqual(buffer.byteLength);
  expect(new Uint8Array(characterBuffer)).toStrictEqual(
      new Uint8Array(buffer.buffer));
});
