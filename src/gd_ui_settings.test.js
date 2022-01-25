const {GDHotSlot} = require('./gd_hot_slot');
const {GDUiSettings} = require('./gd_ui_settings');

test('Constructor without values', () => {
  const settings = new GDUiSettings();

  const expected = new GDUiSettings();
  expected.unknown1_ = 0;
  expected.unknown2_ = 0;
  expected.unknown3_ = 0;
  expected.unknown4_ = ['', '', '', '', ''];
  expected.unknown5_ = ['', '', '', '', ''];
  expected.unknown6_ = [1, 0, 0, 0, 0];
  expected.cameraDistance_ = 36;
  expected.hotSlots_ = [
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
      skill: 'records/skills/default/defaultweaponattack.dbr',
    }),
    new GDHotSlot({
      type: GDHotSlot.Type.Regular,
      skill: 'records/skills/default/defaultweaponattack.dbr',
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
      skill: 'records/skills/default/defaultweaponattack.dbr',
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
  ];

  expect(settings).toStrictEqual(expected);
});

test('Constructor with all fields', () => {
  const settings = new GDUiSettings({
    unknown1: 1,
    unknown2: 2,
    unknown3: 3,
    unknown4: [1, 0, 0, 0, 0],
    unknown5: [0, 1, 0, 0, 0],
    unknown6: [0, 0, 1, 0, 0],
    hotSlots: [new GDHotSlot()],
    cameraDistance: 42,
  });

  const expected = new GDUiSettings();
  expected.unknown1_ = 1;
  expected.unknown2_ = 2;
  expected.unknown3_ = 3;
  expected.unknown4_ = [1, 0, 0, 0, 0];
  expected.unknown5_ = [0, 1, 0, 0, 0];
  expected.unknown6_ = [0, 0, 1, 0, 0];
  expected.hotSlots_ = [new GDHotSlot()];
  expected.cameraDistance_ = 42;

  expect(settings).toStrictEqual(expected);
});
