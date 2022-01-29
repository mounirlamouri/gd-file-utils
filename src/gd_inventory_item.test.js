const {GDInventoryItem} = require('./gd_inventory_item');
const {GDItem} = require('./gd_item');

test('Constructor with no fields', () => {
  const item = new GDInventoryItem();

  const expected = new GDInventoryItem();
  expected.baseName_ = '';
  expected.prefixName_ = '';
  expected.suffixName_ = '';
  expected.modifierName_ = '';
  expected.transmuteName_ = '';
  expected.seed_ = 0;
  expected.componentName_ = '';
  expected.relicBonus_ = '';
  expected.componentSeed_ = 0;
  expected.augmentName_ = '';
  expected.unknown_ = 0;
  expected.augmentSeed_ = 0;
  expected.unknown1_ = 0;
  expected.stackSize_ = 1;
  expected.position_ = {x: 0, y: 0};

  expect(item).toStrictEqual(expected);
});

test('Constructor with item all fields (object)', () => {
  const item = new GDInventoryItem({
    item: {
      baseName: 'b',
      prefixName: 'p',
      suffixName: 's',
      modifierName: 'm',
      transmuteName: 't',
      seed: 1,
      componentName: 'c',
      relicBonus: 'r',
      componentSeed: 2,
      augmentName: 'a',
      unknown: 3,
      augmentSeed: 4,
      unknown1: 5,
      stackSize: 6,
    },
    position: {x: 42, y: 24},
  });

  const expected = new GDInventoryItem();
  expected.baseName_ = 'b';
  expected.prefixName_ = 'p';
  expected.suffixName_ = 's';
  expected.modifierName_ = 'm';
  expected.transmuteName_ = 't';
  expected.seed_ = 1;
  expected.componentName_ = 'c';
  expected.relicBonus_ = 'r';
  expected.componentSeed_ = 2;
  expected.augmentName_ = 'a';
  expected.unknown_ = 3;
  expected.augmentSeed_ = 4;
  expected.unknown1_ = 5;
  expected.stackSize_ = 6;
  expected.position_ = {x: 42, y: 24};

  expect(item).toStrictEqual(expected);
});

test('Constructor with item all fields (GDItem)', () => {
  const item = new GDInventoryItem({
    item: new GDItem({
      baseName: 'b',
      prefixName: 'p',
      suffixName: 's',
      modifierName: 'm',
      transmuteName: 't',
      seed: 1,
      componentName: 'c',
      relicBonus: 'r',
      componentSeed: 2,
      augmentName: 'a',
      unknown: 3,
      augmentSeed: 4,
      unknown1: 5,
      stackSize: 6,
    }),
    position: {x: 42, y: 24},
  });

  const expected = new GDInventoryItem();
  expected.baseName_ = 'b';
  expected.prefixName_ = 'p';
  expected.suffixName_ = 's';
  expected.modifierName_ = 'm';
  expected.transmuteName_ = 't';
  expected.seed_ = 1;
  expected.componentName_ = 'c';
  expected.relicBonus_ = 'r';
  expected.componentSeed_ = 2;
  expected.augmentName_ = 'a';
  expected.unknown_ = 3;
  expected.augmentSeed_ = 4;
  expected.unknown1_ = 5;
  expected.stackSize_ = 6;
  expected.position_ = {x: 42, y: 24};

  expect(item).toStrictEqual(expected);
});
