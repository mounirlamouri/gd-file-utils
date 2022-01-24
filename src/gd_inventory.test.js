const {GDEquipmentSlot} = require('./gd_equipment_slot');
const {GDInventory} = require('./gd_inventory');

test('Constructor with no fields', () => {
  const inventory = new GDInventory();

  const expected = new GDInventory();
  expected.bags_ = 1;
  expected.focused_ = 0;
  expected.selected_ = 0;
  expected.useAlternate_ = 0;
  expected.equipment_ = null;
  expected.alternate1_ = 0;
  expected.weapons1_ = null;
  expected.alternate2_ = 0;
  expected.weapons2_ = null;

  expect(inventory).toStrictEqual(expected);
});

test('Constructor with inventory all fields', () => {
  const inventory = new GDInventory({
    bags: 0,
    focused: 1,
    selected: 1,
    useAlternate: 1,
    equipment: [
      new GDEquipmentSlot(), new GDEquipmentSlot(),
      new GDEquipmentSlot(), new GDEquipmentSlot(),
      new GDEquipmentSlot(), new GDEquipmentSlot(),
      new GDEquipmentSlot(), new GDEquipmentSlot(),
      new GDEquipmentSlot(), new GDEquipmentSlot(),
      new GDEquipmentSlot(), new GDEquipmentSlot(),
    ],
    alternate1: 1,
    weapons1: [new GDEquipmentSlot(), new GDEquipmentSlot()],
    alternate2: 1,
    weapons2: [new GDEquipmentSlot(), new GDEquipmentSlot()],
  });

  const expected = new GDInventory();
  expected.bags_ = 0;
  expected.focused_ = 1;
  expected.selected_ = 1;
  expected.useAlternate_ = 1;
  expected.equipment_ = [
    new GDEquipmentSlot(), new GDEquipmentSlot(),
    new GDEquipmentSlot(), new GDEquipmentSlot(),
    new GDEquipmentSlot(), new GDEquipmentSlot(),
    new GDEquipmentSlot(), new GDEquipmentSlot(),
    new GDEquipmentSlot(), new GDEquipmentSlot(),
    new GDEquipmentSlot(), new GDEquipmentSlot(),
  ];
  expected.alternate1_ = 1;
  expected.weapons1_ = [new GDEquipmentSlot(), new GDEquipmentSlot()];
  expected.alternate2_ = 1;
  expected.weapons2_ = [new GDEquipmentSlot(), new GDEquipmentSlot()];

  expect(inventory).toStrictEqual(expected);
});