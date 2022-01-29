const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDItem} = require('./gd_item');

test('Constructor with no fields', () => {
  const slot = new GDEquipmentSlot();

  const expected = new GDEquipmentSlot();
  expected.item_ = new GDItem();
  expected.used_ = false;

  expect(slot).toStrictEqual(expected);
});

test('Constructor with item as object', () => {
  const slot = new GDEquipmentSlot({
    item: {baseName: 'foobar'},
    used: true,
  });

  const expected = new GDEquipmentSlot();
  expected.item_ = new GDItem({baseName: 'foobar'});
  expected.used_ = true;

  expect(slot).toStrictEqual(expected);
});

test('Constructor with item as GDItem', () => {
  const slot = new GDEquipmentSlot({
    item: new GDItem({baseName: 'barfoo'}),
    used: true,
  });

  const expected = new GDEquipmentSlot();
  expected.item_ = new GDItem({baseName: 'barfoo'});
  expected.used_ = true;

  expect(slot).toStrictEqual(expected);
});

test('Constructor with item set but not used', () => {
  const slot = new GDEquipmentSlot({
    item: new GDItem({seed: 42}),
    used: false,
  });

  const expected = new GDEquipmentSlot();
  expected.item_ = new GDItem({seed: 42});
  expected.used_ = false;

  expect(slot).toStrictEqual(expected);
});