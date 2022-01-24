const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacter} = require('./gd_character');
const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDInventory} = require('./gd_inventory');
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

test('Read character file that just started game', async () => {
  const buffer = await fs.readFile("test/data/just_started_game.gdc");
  const reader = new GDCharacterReader(buffer.buffer);

  let character = new GDCharacter();
  character.name_ = 'FooBar';
  character.sex_ = GDCharacter.Sex.Male;

  character.difficulty_ = 16; // Normal Veteran.
  character.texture_ = 'creatures/pc/hero02.tex';
  character.hasBeenInGame_ = true;
  character.playStats_.playTime_ = 5;
  character.tutorial_ = [7];

  for (let i = 0; i < character.skills_.length; ++i) {
    if (i == character.skills_.length - 1) {
      character.skills_[i].enabled_ = false;
    } else {
      character.skills_[i].enabled_ = true;
    }
  }

  character.inventory_ = new GDInventory({
    bags: [{itemsCount: 0, unknown: 0}],
    focused: 0,
    selected: 0,
    useAlternate: 0,
    alternate1: 0,
    alternate2: 1,
    equipment: [
      new GDEquipmentSlot(),
      new GDEquipmentSlot({
        used: true,
        item: {
          baseName: 'records/items/gearaccessories/necklaces/a00_necklace.dbr',
        }
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/geartorso/a00_torso001.dbr',
          seed: 291725479,
        }
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearlegs/a00_legs01.dbr',
          seed: 1186045339,
        }
      }),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
    ],
    weapons1: [
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/blunt1h/a00_blunt001.dbr',
          seed: 1346538007,
        },
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/shields/a00_shield01.dbr',
          seed: 1688427007,
        },
      }),
    ],
    weapons2: [
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
    ],
  });

  expect(reader.read()).toStrictEqual(character);
});
