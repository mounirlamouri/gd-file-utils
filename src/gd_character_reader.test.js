const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacter} = require('./gd_character');
const fs = require('fs/promises');

test('Read freshly created man sc character', async () => {
  const buffer = await fs.readFile("test/data/freshly_created.gdc");
  const reader = new GDCharacterReader(buffer.buffer);

  let character = new GDCharacter();
  character.name_ = 'FooBar';
  character.sex_ = GDCharacter.Sex.Male;
  character.texture_ = 'creatures/pc/hero02.tex';

  expect(reader.read()).toStrictEqual(character);
});

test('Read freshly created woman hc character', async () => {
  const buffer = await fs.readFile("test/data/woman_hc.gdc");
  const reader = new GDCharacterReader(buffer.buffer);

  let character = new GDCharacter();
  character.name_ = 'BarFoo';
  character.sex_ = GDCharacter.Sex.Female;
  character.hc_ = true;

  expect(reader.read()).toStrictEqual(character);
});