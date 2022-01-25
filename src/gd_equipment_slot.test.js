const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDItem} = require('./gd_item');

test('Constructor with no fields', () => {
  const slot = new GDEquipmentSlot();

  const expected = new GDEquipmentSlot();
  expected.item_ = null;

  expect(slot).toStrictEqual(expected);
});

test('Constructor with item as object', () => {
  const slot = new GDEquipmentSlot({
    item: {baseName: 'foobar'},
  });

  const expected = new GDEquipmentSlot();
  expected.item_ = new GDItem({baseName: 'foobar'});

  expect(slot).toStrictEqual(expected);
});

test('Constructor with item as GDItem', () => {
  const slot = new GDEquipmentSlot({
    item: new GDItem({baseName: 'barfoo'}),
  });

  const expected = new GDEquipmentSlot();
  expected.item_ = new GDItem({baseName: 'barfoo'});

  expect(slot).toStrictEqual(expected);
});
