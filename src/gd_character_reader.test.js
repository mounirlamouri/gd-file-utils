const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacter} = require('./gd_character');
const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDInventory} = require('./gd_inventory');
const {GDInventoryItem} = require('./gd_inventory_item');
const fs = require('fs/promises');
const {GDStashTab} = require('./gd_stash_tab');
const {GDStashItem} = require('./gd_stash_item');

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
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/geartorso/a00_torso001.dbr',
          seed: 291725479,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearlegs/a00_legs01.dbr',
          seed: 1186045339,
        },
        used: true,
      }),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
      new GDEquipmentSlot({item: {seed: 1186045339}}),
    ],
    weapons1: [
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/blunt1h/a00_blunt001.dbr',
          seed: 1346538007,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/shields/a00_shield01.dbr',
          seed: 1688427007,
        },
        used: true,
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
            stackSize: 4,
          },
          position: {x: 0, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/misc/potions/potion_energya01.dbr',
            seed: 1187125862,
            stackSize: 2,
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
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearlegs/a00_legs01.dbr',
          seed: 1055511896,
        },
        used: true,
      }),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
      new GDEquipmentSlot({item: {seed: 1055511896}}),
    ],
    weapons1: [
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/blunt1h/a00_blunt001.dbr',
          seed: 1658359174,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/shields/a00_shield01.dbr',
          seed: 122717080,
        },
        used: true,
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

test('Read crucible one round character', async () => {
  const buffer = await fs.readFile('test/data/crucible_one_round.gdc');
  const reader = new GDCharacterReader(buffer.buffer);

  const character = new GDCharacter();
  character.name_ = 'BarFoo';
  character.sex_ = GDCharacter.Sex.Female;
  character.hc_ = true;
  character.hasBeenInGame_ = true;
  character.money_ = 9955175;
  character.masteriesAllowed_ = 1;
  character.experience_ = 5387;
  character.currentTribute_ = 3;
  character.headerLevel_ = 8;
  character.bioLevel_ = 8;
  character.attributePointsUnspent_ = 7;
  character.skillPointsUnspent_ = 21;

  character.fileInfo_.key = 395233766;

  for (let i = 0; i < character.skills_.length; ++i) {
    if (i == character.skills_.length - 1) {
      character.skills_[i].enabled_ = false;
    } else {
      character.skills_[i].enabled_ = true;
    }
  }

  character.playStats_.criticalHitsInflicted_ = 16;
  character.playStats_.deaths_ = 0;
  character.playStats_.greatestDamageInflicted_ = 74.00344848632812;
  character.playStats_.greatestDamageReceived_ = 38.32691955566406;
  character.playStats_.greatestMonsterKilledLevel_[0] = 3;
  character.playStats_.greatestMonsterKilledLifeAndMana_[0] = 356;
  character.playStats_.greatestMonsterKilledName_[0] = 'tagEnemyGolemRockA01';
  character.playStats_.greatestSurvivalScore_ = 1120;
  character.playStats_.survivalWaveTier_ = 10;
  character.playStats_.hitsInflicted_ = 541;
  character.playStats_.hitsReceived_ = 683;
  character.playStats_.kills_ = 196;
  character.playStats_.lastHitBy_ = 108.02639770507812;
  character.playStats_.lastHit_ = 120.1925048828125;
  character.playStats_.lastMonsterHitBy_[0] = 'tagEnemySkeletonA02';
  character.playStats_.lastMonsterHit_[0] = 'tagEnemySkeletonA02';
  character.playStats_.playTime_ = 900;
  character.playStats_.healthPotionsUsed_ = 7;
  character.playStats_.maxLevel_ = 3;

  character.inventory_ = new GDInventory({
    bags: [{
      unknown: 0,
      items: [
        new GDInventoryItem({
          item: {
            baseName: 'records/items/misc/potions/potion_healtha01.dbr',
            seed: 1414486249,
            stackSize: 93,
          },
          position: {x: 0, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/misc/potions/potion_energya01.dbr',
            seed: 44953457,
            stackSize: 11,
          },
          position: {x: 0, y: 1},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring02.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a040b_off_dmg%pierce_01_je.dbr',
            seed: 1102612809,
          },
          position: {x: 11, y: 6},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring01.dbr',
            prefixName: 'records/items/lootaffixes/prefix/aa005b_phymod_01.dbr',
            seed: 1808949417,
          },
          position: {x: 11, y: 7},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring02.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ao007a_lightning_02.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a016b_ch_speedcast_01_je.dbr',
            seed: 928961684,
          },
          position: {x: 7, y: 2},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring01.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/aa022a_inquisitor15_je.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a016b_ch_speedcast_01_je.dbr',
            seed: 1936477781,
          },
          position: {x: 6, y: 2},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring02.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a011b_ch_manaregen_01.dbr',
            seed: 1489103031,
          },
          position: {x: 0, y: 6},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring02.dbr',
            prefixName: 'records/items/lootaffixes/prefix/aa010b_damod_01.dbr',
            seed: 102988554,
          },
          position: {x: 0, y: 7},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearaccessories/rings/a001_ring01.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ad005b_res_poison_01.dbr',
            suffixName: 'records/items/lootaffixes/suffix/a008a_ch_life_02.dbr',
            seed: 2141932144,
          },
          position: {x: 8, y: 2},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/geartorso/a03_torso001b.dbr',
            prefixName: 'records/items/lootaffixes/prefix/b_ar009_ar.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a035e_off_dmg%bleed_01_ar.dbr',
            seed: 379160478,
          },
          position: {x: 0, y: 4},
        }),

        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearshoulders/a02_shoulder02.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ad010b_res_firecold_01.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a035e_off_dmg%bleed_01_ar.dbr',
            seed: 13019060,
          },
          position: {x: 1, y: 6},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/geartorso/a02_torso002.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ad003b_res_cold_01.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a001b_ch_att_cun_02.dbr',
            seed: 134766764,
          },
          position: {x: 4, y: 2},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearweapons/focus/a02_focus01.dbr',
            prefixName: 'records/items/lootaffixes/prefix/b_sh011_a.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a028a_off_dmg%phys_01_fo.dbr',
            seed: 1196891466,
          },
          position: {x: 3, y: 6},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearweapons/guns1h/a02_gun1h001.dbr',
            prefixName: 'records/items/lootaffixes/prefix/ao006b_poison_01.dbr',
            suffixName:
              'records/items/lootaffixes/suffix/' +
              'a031c_off_dmg%lightning_01_we.dbr',
            seed: 230591451,
          },
          position: {x: 6, y: 3},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearlegs/a02_legs02.dbr',
            prefixName:
              'records/items/lootaffixes/prefix/' +
              'ad008a_res_piercelightning_01.dbr',
            suffixName: 'records/items/lootaffixes/suffix/a019a_ch_da_01.dbr',
            seed: 455859194,
          },
          position: {x: 8, y: 3},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/geartorso/a03_torso002.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ad002b_res_fire_01.dbr',
            suffixName: 'records/items/lootaffixes/suffix/a019a_ch_da_01.dbr',
            seed: 1070973096,
          },
          position: {x: 5, y: 5},
        }),
        new GDInventoryItem({
          item: {
            baseName:
            'records/items/gearaccessories/necklaces/a01_necklace01.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/aa007b_lifemod_01.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a041b_ch_healthregen_02.dbr',
            seed: 686473369,
          },
          position: {x: 7, y: 5},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearweapons/blunt1h/a00_blunt001.dbr',
            prefixName: 'records/items/lootaffixes/prefix/ao003b_pierce_02.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a035c_off_dmg%bleed_01_we.dbr',
            seed: 1799272369,
          },
          position: {x: 8, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearweapons/caster/a01_dagger005.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ao014b_vitality_02.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a033c_off_dmg%vitality_01_we.dbr',
            seed: 88794908,
          },
          position: {x: 7, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearhands/a01_hands01.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/aa007a_lifemod_01.dbr',
            suffixName: 'records/items/lootaffixes/suffix/a020b_ch_oada_01.dbr',
            seed: 1400739683,
          },
          position: {x: 7, y: 6},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearshoulders/a02_shoulder01.dbr',
            prefixName: 'records/items/lootaffixes/prefix/aa005a_phymod_01.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a005b_ch_att_cunspi_01.dbr',
            seed: 1309289912,
          },
          position: {x: 5, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearweapons/axe1h/a03_axe002.dbr',
            prefixName: 'records/items/lootaffixes/prefix/ao003b_pierce_02.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a014a_ch_speedattack_01_we.dbr',
            seed: 1475068170,
          },
          position: {x: 9, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearlegs/a02_legs01.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/aa007a_lifemod_01.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a028e_off_dmg%phys_01_ar.dbr',
            seed: 371520088,
          },
          position: {x: 10, y: 0},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearlegs/a02_legs01.dbr',
            prefixName:
            'records/items/lootaffixes/prefix/ad006a_res_piercefire_01.dbr',
            suffixName: 'records/items/lootaffixes/suffix/a018a_ch_oa_01.dbr',
            seed: 2049658447,
          },
          position: {x: 10, y: 3},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearshoulders/a02_shoulder02.dbr',
            prefixName: 'records/items/lootaffixes/prefix/aa004a_cunmod_01.dbr',
            suffixName:
            'records/items/lootaffixes/suffix/a005b_ch_att_cunspi_01.dbr',
            seed: 2123097358,
          },
          position: {x: 9, y: 6},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearlegs/a02_legs01.dbr',
            seed: 1288716286,
          },
          position: {x: 2, y: 2},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearshoulders/a03_shoulder01.dbr',
            seed: 202390059,
          },
          position: {x: 0, y: 2},
        }),
        new GDInventoryItem({
          item: {
            baseName: 'records/items/gearhands/a02_hands01.dbr',
            seed: 1100242116,
          },
          position: {x: 1, y: 0},
        }),
      ],
    }],
    focused: 0,
    selected: 0,
    useAlternate: 0,
    alternate1: 0,
    alternate2: 1,
    equipment: [
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearhead/a01_head001.dbr',
          prefixName: 'records/items/lootaffixes/prefix/ad003a_res_cold_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a038e_off_dmg%aether_01_ar.dbr',
          seed: 869761043,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName:
          'records/items/gearaccessories/necklaces/a01_necklace01.dbr',
          prefixName:
          'records/items/lootaffixes/prefix/ad015b_res_lightningpoison_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a017a_ch_speedall_01_je.dbr',
          seed: 342686170,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/geartorso/a01_torso002.dbr',
          seed: 1348550810,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearlegs/a01_legs02.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a037b_def_reflectpierce_01_ar.dbr',
          seed: 1687386716,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearfeet/a02_feet01.dbr',
          prefixName: 'records/items/lootaffixes/prefix/aa006a_spimod_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a015b_ch_speedmove_01_feet.dbr',
          seed: 1468690913,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearhands/a01_hands02.dbr',
          seed: 1686912089,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearaccessories/rings/a001_ring02.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a003a_ch_att_spi_02.dbr',
          seed: 178680583,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearaccessories/rings/a001_ring02.dbr',
          prefixName:
          'records/items/lootaffixes/prefix/ad013b_res_coldlightning_01.dbr',
          seed: 2056808833,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearaccessories/waist/a01_waist001.dbr',
          prefixName: 'records/items/lootaffixes/prefix/aa006b_spimod_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a006a_ch_att_physpi_01.dbr',
          seed: 246512823,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          prefixName: 'records/items/lootaffixes/prefix/aa006b_spimod_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a006a_ch_att_physpi_01.dbr',
          seed: 246512823,
        },
        used: false,
      }),
      new GDEquipmentSlot({
        item: {
          prefixName: 'records/items/lootaffixes/prefix/aa006b_spimod_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a006a_ch_att_physpi_01.dbr',
          seed: 246512823,
        },
        used: false,
      }),
      new GDEquipmentSlot({
        item: {
          prefixName: 'records/items/lootaffixes/prefix/aa006b_spimod_01.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a006a_ch_att_physpi_01.dbr',
          seed: 246512823,
        },
        used: false,
      }),
    ],
    weapons1: [
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/melee2h/a01_sword2h001.dbr',
          prefixName: 'records/items/lootaffixes/prefix/ao011c_acid_02.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a028d_off_dmg%phys_01_we2h.dbr',
          seed: 958085400,
        },
        used: true,
      }),
      new GDEquipmentSlot({
        item: {
          prefixName: 'records/items/lootaffixes/prefix/ao011c_acid_02.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a028d_off_dmg%phys_01_we2h.dbr',
          seed: 958085400,
        },
        used: false,
      }),
    ],
    weapons2: [
      new GDEquipmentSlot({
        item: {
          baseName: 'records/items/gearweapons/guns2h/a01_gun2h002.dbr',
          suffixName:
          'records/items/lootaffixes/suffix/a033d_off_dmg%vitality_01_we2h.dbr',
          seed: 920946051,
        },
        used: false,
      }),
      new GDEquipmentSlot({
        item: {
          suffixName:
          'records/items/lootaffixes/suffix/a033d_off_dmg%vitality_01_we2h.dbr',
          seed: 920946051,
        },
      }),
    ],
  });

  character.weaponSwapEnabled_ = true;
  character.tutorial_ = [7, 26, 13, 15, 61, 44, 45, 36, 37, 41, 38, 64, 8, 48,
    14, 63, 18, 33];

  character.stash_ = [
    new GDStashTab({
      height: 18,
      width: 10,
      items: [
        new GDStashItem({
          position: {x: 0, y: 0},
          item: {
            baseName: 'records/items/materia/compa_chippedclaw.dbr',
            seed: 342562829,
            stackSize: 2,
          },
        }),
        new GDStashItem({
          position: {x: 1, y: 0},
          item: {
            baseName: 'records/items/materia/compa_chilledsteel.dbr',
            seed: 720248694,
          },
        }),
        new GDStashItem({
          position: {x: 2, y: 0},
          item: {
            baseName: 'records/items/materia/compa_bristlyfur.dbr',
            seed: 998621149,
          },
        }),
        new GDStashItem({
          position: {x: 3, y: 0},
          item: {
            baseName: 'records/items/materia/compa_searingember.dbr',
            seed: 813978211,
          },
        }),
        new GDStashItem({
          position: {x: 4, y: 0},
          item: {
            baseName: 'records/items/materia/compa_polishedemerald.dbr',
            seed: 474982063,
          },
        }),
        new GDStashItem({
          position: {x: 5, y: 0},
          item: {
            baseName: 'records/items/materia/compa_mutagenicichor.dbr',
            seed: 278235231,
          },
        }),
        new GDStashItem({
          position: {x: 0, y: 16},
          item: {
            baseName: 'records/items/questitems/scrapmetal.dbr',
            seed: 1775842626,
            stackSize: 3,
          },
        }),
        new GDStashItem({
          position: {x: 2, y: 17},
          item: {
            baseName: 'records/items/materia/compa_aethercrystal.dbr',
            seed: 765288180,
          },
        }),
      ],
    }),
    new GDStashTab({
      height: 18,
      width: 10,
      items: [],
    }),
  ];

  character.tokens_ = [
    ['SURVIVALMODE_STARTERCHEST'],
    [],
    [],
  ];

  expect(reader.read()).toStrictEqual(character);
});

test('Read character with two masteries not taken', async () => {
  const buffer = await fs.readFile('test/data/two_masteries_not_taken.gdc');
  const reader = new GDCharacterReader(buffer.buffer);

  const character = new GDCharacter();
  character.name_ = 'BarFoo';
  character.sex_ = GDCharacter.Sex.Female;
  character.hc_ = true;
  character.hasBeenInGame_ = true;
  character.money_ = 8604488;
  character.masteriesAllowed_ = 2;
  character.experience_ = 10774;
  character.currentTribute_ = 0;
  character.headerLevel_ = 10;
  character.bioLevel_ = 10;
  character.attributePointsUnspent_ = 0;
  character.skillPointsUnspent_ = 27;
  character.devotionPointsUnspent_ = 2;
  character.totalDevotionUnlocked_ = 2;
  character.health_ = 430;
  character.physique_ = 122;

  character.fileInfo_.key = 73693701;

  for (let i = 0; i < character.skills_.length; ++i) {
    if (i == character.skills_.length - 1) {
      character.skills_[i].enabled_ = false;
    } else {
      character.skills_[i].enabled_ = true;
    }
  }

  character.playStats_.criticalHitsInflicted_ = 28;
  character.playStats_.deaths_ = 0;
  character.playStats_.greatestDamageInflicted_ = 148.88011169433594;
  character.playStats_.greatestDamageReceived_ = 127.88601684570312;
  character.playStats_.greatestMonsterKilledLevel_[0] = 10;
  character.playStats_.greatestMonsterKilledLifeAndMana_[0] = 1068;
  character.playStats_.greatestMonsterKilledName_[0] = 'tagEnemyGolemRockA01';
  character.playStats_.greatestSurvivalScore_ = 1120;
  character.playStats_.survivalWaveTier_ = 10;
  character.playStats_.hitsInflicted_ = 1142;
  character.playStats_.hitsReceived_ = 1898;
  character.playStats_.kills_ = 338;
  character.playStats_.lastHitBy_ = 510.5;
  character.playStats_.lastHit_ = 267.4337463378906;
  character.playStats_.lastMonsterHitBy_[0] = 'tagNPC_PowerupsS01';
  character.playStats_.lastMonsterHit_[0] = 'tagEnemyGolemRockA01';
  character.playStats_.playTime_ = 1890;
  character.playStats_.healthPotionsUsed_ = 35;
  character.playStats_.maxLevel_ = 5;

  character.inventory_ = new GDInventory({
    bags: [],
    focused: 0,
    selected: 0,
    useAlternate: 1,
    alternate1: 1,
    alternate2: 0,
    equipment: [],
    weapons1: [],
    weapons2: [],
  });
  character.stash_ = [];

  character.lootFilter_[0] = false;

  character.weaponSwapEnabled_ = true;
  character.weaponSwapActive_ = true;
  character.tutorial_ = [7, 26, 13, 15, 61, 44, 45, 36, 37, 41, 38, 64, 8, 48,
    14, 63, 18, 33, 20, 68];

  character.tokens_ = [
    ['SURVIVALMODE_STARTERCHEST'],
    [],
    [],
  ];

  const expectedCharacter = reader.read();
  // Resetting some stuff for simplicity.
  expectedCharacter.inventory_.bags_ = [];
  expectedCharacter.inventory_.equipment_ = [];
  expectedCharacter.inventory_.weapons1_ = [];
  expectedCharacter.inventory_.weapons2_ = [];
  expectedCharacter.stash_ = [];
  expect(expectedCharacter).toStrictEqual(character);
});
