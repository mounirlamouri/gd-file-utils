const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacterWriter} = require('./gd_character_writer');
const {GDCharacter} = require('./gd_character');
const fs = require('fs/promises');

test('Writes and reads a basic GDCharacter', () => {
  const character = new GDCharacter();
  character.name_ = 'foo';
  character.sex_ = GDCharacter.Sex.Male;

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();

  // Reading the buffer should gives the same GDCharacter.
  const reader = new GDCharacterReader(characterBuffer);
  expect(reader.read()).toStrictEqual(character);
});

test('Reads & writes a gdc, read again (freshly_created.gdc)', async () => {
  const buffer = await fs.readFile('test/data/freshly_created.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();
  expect(new GDCharacterReader(characterBuffer).read()).
      toStrictEqual(character);
});

test('Reads & writes a gdc, read again (woman_hc.gdc)', async () => {
  const buffer = await fs.readFile('test/data/woman_hc.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();
  expect(new GDCharacterReader(characterBuffer).read()).
      toStrictEqual(character);
});

test('Reads & writes a gdc, read again (just_started_game.gdc)', async () => {
  const buffer = await fs.readFile('test/data/just_started_game.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();
  expect(new GDCharacterReader(characterBuffer).read()).
      toStrictEqual(character);
});

test('Reads & writes a gdc, read again (dead_hc.gdc)', async () => {
  const buffer = await fs.readFile('test/data/dead_hc.gdc');
  const reader = new GDCharacterReader(buffer.buffer);
  const character = reader.read();

  const writer = new GDCharacterWriter(character);
  const characterBuffer = writer.write();
  expect(new GDCharacterReader(characterBuffer).read()).
      toStrictEqual(character);
});
