const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacter} = require('./gd_character');
const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDInventory} = require('./gd_inventory');
const {GDInventoryItem} = require('./gd_inventory_item');
const fs = require('fs/promises');

test('Read freshly created man sc character', async () => {
  const buffer = await fs.readFile('test/data/freshly_created.gdc');
  const reader = new GDCharacterReader(buffer.buffer);

  const character = new GDCharacter();
  character.name_ = 'FooBar';
  character.sex_ = GDCharacter.Sex.Male;
  character.texture_ = 'creatures/pc/hero02.tex';
  character.fileInfo_.key = 327214724;

  expect(reader.read()).toStrictEqual(character);
});

test('Read freshly created woman hc character', async () => {
  const buffer = await fs.readFile('test/data/woman_hc.gdc');
  const reader = new GDCharacterReader(buffer.buffer);

  const character = new GDCharacter();
  character.name_ = 'BarFoo';
  character.sex_ = GDCharacter.Sex.Female;
  character.hc_ = true;
  character.fileInfo_.key = 307750195;

  expect(reader.read()).toStrictEqual(character);
});

test('Read character file that just started game', async () => {
  const buffer = await fs.readFile('test/data/just_started_game.gdc');
  const reader = new GDCharacterReader(buffer.buffer);

  const character = new GDCharacter();
  character.name_ = 'FooBar';
  character.sex_ = GDCharacter.Sex.Male;

  character.fileInfo_.key = 1703178453;

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
    bags: [{items: [], unknown: 0}],
    focused: 0,
    selected: 0,
    useAlternate: 0,
    alternate1: 0,
    alternate2: 1,
    equipment: [
      new GDEquipmentSlot(),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearaccessories/necklaces/a00_necklace.dbr',
        },
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/geartorso/a00_torso001.dbr',
          seed: 291725479,
        },
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearlegs/a00_legs01.dbr',
          seed: 1186045339,
        },
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

test('Read dead hc character', async () => {
  const buffer = await fs.readFile('test/data/dead_hc.gdc');
  const reader = new GDCharacterReader(buffer.buffer);

  const character = new GDCharacter();
  character.name_ = 'BarFoo';
  character.sex_ = GDCharacter.Sex.Female;
  character.hc_ = true;
  character.hasBeenInGame_ = true;
  character.money_ = 250;

  character.fileInfo_.key = 1717460715;

  for (let i = 0; i < character.skills_.length; ++i) {
    if (i == character.skills_.length - 1) {
      character.skills_[i].enabled_ = false;
    } else {
      character.skills_[i].enabled_ = true;
    }
  }

  character.playStats_.criticalHitsInflicted_ = 8;
  character.playStats_.deaths_ = 1;
  character.playStats_.greatestDamageInflicted_ = 23.187297821044922;
  character.playStats_.greatestDamageReceived_ = 33.42857360839844;
  character.playStats_.greatestMonsterKilledLevel_[0] = 2;
  character.playStats_.greatestMonsterKilledLifeAndMana_[0] = 188;
  character.playStats_.greatestMonsterKilledName_[0] = 'tagEnemyBloodswornA01';
  character.playStats_.greatestSurvivalScore_ = 245;
  character.playStats_.survivalWaveTier_ = 5;
  character.playStats_.hitsInflicted_ = 209;
  character.playStats_.hitsReceived_ = 345;
  character.playStats_.kills_ = 61;
  character.playStats_.lastHitBy_ = 158.46800231933594;
  character.playStats_.lastHit_ = 164.86001586914062;
  character.playStats_.lastMonsterHitBy_[0] = 'tagEnemyZombieSoldierA01';
  character.playStats_.lastMonsterHit_[0] = 'tagEnemyZombieSoldierA01';
  character.playStats_.playTime_ = 246;

  character.inventory_ = new GDInventory({
    bags: [{
      unknown: 0,
      items: [
        new GDInventoryItem({
          item: {
            baseName: 'records/items/misc/potions/potion_healtha01.dbr',
            seed: 705949125,
          },
          position: {x: 0, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/misc/potions/potion_energya01.dbr',
            seed: 1187125862,
          },
          position: {x: 0, y: 1},
        }),
      ],
    }],
    focused: 0,
    selected: 0,
    useAlternate: 0,
    alternate1: 0,
    alternate2: 1,
    equipment: [
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/creatures/npcs/npcgear/npc_torso002.dbr',
          seed: 364806682,
        },
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearlegs/a00_legs01.dbr',
          seed: 1055511896,
        },
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
          seed: 1658359174,
        },
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/shields/a00_shield01.dbr',
          seed: 122717080,
        },
      }),
    ],
    weapons2: [
      new GDEquipmentSlot(),
      new GDEquipmentSlot(),
    ],
  });

  character.tutorial_ = [7, 26, 13, 15, 61, 44, 45];

  character.tokens_ = [
    ['SURVIVALMODE_STARTERCHEST'],
    [],
    [],
  ];

  expect(reader.read()).toStrictEqual(character);
});

// test('Read crucible one round character', async () => {
//   const buffer = await fs.readFile('test/data/crucible_one_round.gdc');
//   const reader = new GDCharacterReader(buffer.buffer);

//   const character = new GDCharacter();
//   character.name_ = 'BarFoo';
//   character.sex_ = GDCharacter.Sex.Female;
//   character.hc_ = true;
//   character.hasBeenInGame_ = true;
//   character.money_ = 9955175;
//   character.masteriesAllowed_ = 1;

//   for (let i = 0; i < character.skills_.length; ++i) {
//     if (i == character.skills_.length - 1) {
//       character.skills_[i].enabled_ = false;
//     } else {
//       character.skills_[i].enabled_ = true;
//     }
//   }

//   character.playStats_.criticalHitsInflicted_ = 16;
//   character.playStats_.deaths_ = 0;
//   character.playStats_.greatestDamageInflicted_ = 74.00344848632812;
//   character.playStats_.greatestDamageReceived_ = 38.32691955566406;
//   character.playStats_.greatestMonsterKilledLevel_[0] = 3;
//   character.playStats_.greatestMonsterKilledLifeAndMana_[0] = 356;
// character.playStats_.greatestMonsterKilledName_[0] = 'tagEnemyGolemRockA01';
//   character.playStats_.greatestSurvivalScore_ = 1120;
//   character.playStats_.survivalWaveTier_ = 10;
//   character.playStats_.hitsInflicted_ = 541;
//   character.playStats_.hitsReceived_ = 683;
//   character.playStats_.kills_ = 196;
//   character.playStats_.lastHitBy_ = 108.02639770507812;
//   character.playStats_.lastHit_ = 120.1925048828125;
//   character.playStats_.lastMonsterHitBy_[0] = 'tagEnemySkeletonA02';
//   character.playStats_.lastMonsterHit_[0] = 'tagEnemySkeletonA02';
//   character.playStats_.playTime_ = 246;
//   character.playStats_.healthPotionsUsed_ = 7;

//   character.inventory_ = new GDInventory({
//     bags: [{
//       unknown: 0,
//       items: [
//         new GDInventoryItem(),
//         new GDInventoryItem({position: {x: 0, y: 1}}),
//       ],
//     }],
//     focused: 0,
//     selected: 0,
//     useAlternate: 0,
//     alternate1: 0,
//     alternate2: 1,
//     equipment: [
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot({
//         item: {
//           baseName: 'records/creatures/npcs/npcgear/npc_torso002.dbr',
//           seed: 364806682,
//         },
//       }),
//       new GDEquipmentSlot({
//         item: {
//           baseName: 'records/items/gearlegs/a00_legs01.dbr',
//           seed: 1055511896,
//         },
//       }),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//     ],
//     weapons1: [
//       new GDEquipmentSlot({
//         item: {
//           baseName: 'records/items/gearweapons/blunt1h/a00_blunt001.dbr',
//           seed: 1658359174,
//         },
//       }),
//       new GDEquipmentSlot({
//         item: {
//           baseName: 'records/items/gearweapons/shields/a00_shield01.dbr',
//           seed: 122717080,
//         },
//       }),
//     ],
//     weapons2: [
//       new GDEquipmentSlot(),
//       new GDEquipmentSlot(),
//     ],
//   });

//   character.tutorial_ = [7, 26, 13, 15, 61, 44, 45];

//   character.tokens_ = [
//     ['SURVIVALMODE_STARTERCHEST'],
//     [],
//     [],
//   ];

//   expect(reader.read()).toStrictEqual(character);
// });
