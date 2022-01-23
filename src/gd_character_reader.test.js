const {GDCharacterReader} = require('./gd_character_reader');
const {GDCharacter} = require('./gd_character');
const {GDSkill} = require('./gd_skill');
const {GDUiSettings} = require('./gd_ui_settings');
const fs = require('fs/promises');
const { GDHotSlot } = require('./gd_hot_slot');
const { GDPlayStats } = require('./gd_play_stats');

test('Read freshly created man sc character', async () => {
  const buffer = await fs.readFile("test/data/freshly_created.gdc");
  const reader = new GDCharacterReader(buffer.buffer);

  let character = new GDCharacter();
  character.name_ = 'FooBar';
  character.sex_ = 1;
  character.classInfo_ = '';
  character.level_ = 1;
  character.hc_ = false;
  character.version_ = 8;
  character.uid_ =
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  character.isInMainQuest_ = true;
  character.hasBeenInGame_ = false;
  character.difficulty_ = 64;
  character.greatestDifficulty_ = 0;
  character.money_ = 0;
  character.greatestSurvivalDifficulty_ = 0;
  character.currentTribute_ = 0;
  character.compassState_ = 3;
  character.skillWindowShowHelp_ = 1;
  character.weaponSwapActive_ = false;
  character.weaponSwapEnabled_ = false;
  character.texture_ = 'creatures/pc/hero02.tex';
  character.unknown_ = 39;
  character.lootFilter_ = [ true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, false, false,
    false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false ];

  character.level_ = 1;
  character.experience_ = 0;
  character.attributePointsUnspent_ = 0;
  character.skillPointsUnspent_ = 0;
  character.devotionPointsUnspent_ = 0;
  character.totalDevotionUnlocked_ = 0;
  character.physique_ = 50.0;
  character.cunning_ = 50.0;
  character.spirit_ = 50.0;
  character.health_ = 250.0;
  character.energy_ = 250.0;

  character.inventory_ = {};
  character.stash_ = [{ width: 0, height: 0 }];

  character.spawnDifficulty_ = [[], [], []];
  character.spawnLocation_ = [
    new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]),
    new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]),
    new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
  ];

  character.teleports_ = [[], [], []];
  character.markers_ = [[], [], []];
  character.shrines_ = [[], [], [], [], [], []];

  character.skills_ = [
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": false,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultkickattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": false,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultwpbasicattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": true,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultmoveto.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": true,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultweaponattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": true,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultpetattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
  ];
  character.itemSkills_ = [];
  character.masteriesAllowed_ = 0;
  character.skillPointsReclaimed_ = 0;
  character.devotionPointsReclaimed_ = 0;

  character.loreNotes_ = [];

  character.factions_ = {
    faction: 0,
    info: [{
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 24000,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    }]
  };

  character.uiSettings_ = new GDUiSettings({
    unknown1: 0,
    unknown2: 0,
    unknown3: 0,
    unknown4: ["", "", "", "", ""],
    unknown5: ["", "", "", "", ""],
    unknown6: [1, 0, 0, 0, 0],
    cameraDistance: 36,
    hotSlots: [
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot({type: GDHotSlot.Type.Health}),
      new GDHotSlot({type: GDHotSlot.Type.Energy}),
      new GDHotSlot({
        type: GDHotSlot.Type.Regular,
        skill: "records/skills/default/defaultweaponattack.dbr"
      }),
      new GDHotSlot({
        type: GDHotSlot.Type.Regular,
        skill: "records/skills/default/defaultweaponattack.dbr"
      }),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot({type: GDHotSlot.Type.Health}),
      new GDHotSlot({type: GDHotSlot.Type.Energy}),
      new GDHotSlot({
        type: GDHotSlot.Type.Regular,
        skill: "records/skills/default/defaultweaponattack.dbr"
      }),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
    ],
  });

  expect(reader.read()).toStrictEqual(character);
});

test('Read freshly created woman hc character', async () => {
  const buffer = await fs.readFile("test/data/woman_hc.gdc");
  const reader = new GDCharacterReader(buffer.buffer);

  let character = new GDCharacter();
  character.name_ = 'BarFoo';
  character.sex_ = 0;
  character.classInfo_ = '';
  character.level_ = 1;
  character.hc_ = true;
  character.version_ = 8;
  character.uid_ =
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  character.isInMainQuest_ = true;
  character.hasBeenInGame_ = false;
  character.difficulty_ = 64;
  character.greatestDifficulty_ = 0;
  character.money_ = 0;
  character.greatestSurvivalDifficulty_ = 0;
  character.currentTribute_ = 0;
  character.compassState_ = 3;
  character.skillWindowShowHelp_ = 1;
  character.weaponSwapActive_ = false;
  character.weaponSwapEnabled_ = false;
  character.texture_ = '';
  character.unknown_ = 39;
  character.lootFilter_ = [ true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, false, false,
    false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false ];

  character.level_ = 1;
  character.experience_ = 0;
  character.attributePointsUnspent_ = 0;
  character.skillPointsUnspent_ = 0;
  character.devotionPointsUnspent_ = 0;
  character.totalDevotionUnlocked_ = 0;
  character.physique_ = 50.0;
  character.cunning_ = 50.0;
  character.spirit_ = 50.0;
  character.health_ = 250.0;
  character.energy_ = 250.0;

  character.inventory_ = {};
  character.stash_ = [{ width: 0, height: 0 }];

  character.spawnDifficulty_ = [[], [], []];
  character.spawnLocation_ = [
    new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]),
    new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]),
    new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
  ];

  character.teleports_ = [[], [], []];
  character.markers_ = [[], [], []];
  character.shrines_ = [[], [], [], [], [], []];

  character.skills_ = [
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": false,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultkickattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": false,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultwpbasicattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": true,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultmoveto.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": true,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultweaponattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
    new GDSkill({
      "active": 0,
      "autoCastController": "",
      "autoCastSkill": "",
      "devotionLevel": 0,
      "enabled": true,
      "experience": 0,
      "level": 1,
      "name": "records/skills/default/defaultpetattack.dbr",
      "unknown1": 0,
      "unknown2": 0,
    }),
  ];
  character.itemSkills_ = [];
  character.masteriesAllowed_ = 0;
  character.skillPointsReclaimed_ = 0;
  character.devotionPointsReclaimed_ = 0;

  character.loreNotes_ = [];

  character.factions_ = {
    faction: 0,
    info: [{
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 24000,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: -1,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    },
    {
      modified: 0,
      negativeBoost: 0,
      positiveBoost: 0,
      unlocked: 0,
      value: 0,
    }]
  };

  character.uiSettings_ = new GDUiSettings({
    unknown1: 0,
    unknown2: 0,
    unknown3: 0,
    unknown4: ["", "", "", "", ""],
    unknown5: ["", "", "", "", ""],
    unknown6: [1, 0, 0, 0, 0],
    cameraDistance: 36,
    hotSlots: [
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot({type: GDHotSlot.Type.Health}),
      new GDHotSlot({type: GDHotSlot.Type.Energy}),
      new GDHotSlot({
        type: GDHotSlot.Type.Regular,
        skill: "records/skills/default/defaultweaponattack.dbr"
      }),
      new GDHotSlot({
        type: GDHotSlot.Type.Regular,
        skill: "records/skills/default/defaultweaponattack.dbr"
      }),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot({type: GDHotSlot.Type.Health}),
      new GDHotSlot({type: GDHotSlot.Type.Energy}),
      new GDHotSlot({
        type: GDHotSlot.Type.Regular,
        skill: "records/skills/default/defaultweaponattack.dbr"
      }),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
      new GDHotSlot(),
    ],
  });

  expect(reader.read()).toStrictEqual(character);
});