const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacterWriter} = require('./gd_character_writer');
const {GDCharacter} = require('./gd_character');

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
