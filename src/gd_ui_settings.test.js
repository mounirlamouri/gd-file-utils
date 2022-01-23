const { GDHotSlot } = require('./gd_hot_slot');
const {GDUiSettings} = require('./gd_ui_settings');

test('Constructor without values', () => {
  const settings = new GDUiSettings();

  const expected = new GDUiSettings();
  expected.unknown1_ = 0;
  expected.unknown2_ = 0;
  expected.unknown3_ = 0;
  expected.unknown4_ = [];
  expected.unknown5_ = [];
  expected.unknown6_ = [];
  expected.hotSlots_ = [];
  expected.cameraDistance_ = 0;

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
    hotSlots: [ new GDHotSlot() ],
    cameraDistance: 42,
  });

  const expected = new GDUiSettings();
  expected.unknown1_ = 1;
  expected.unknown2_ = 2;
  expected.unknown3_ = 3;
  expected.unknown4_ = [1, 0, 0, 0, 0];
  expected.unknown5_ = [0, 1, 0, 0, 0];
  expected.unknown6_ = [0, 0, 1, 0, 0];
  expected.hotSlots_ = [ new GDHotSlot() ];
  expected.cameraDistance_ = 42;

  expect(settings).toStrictEqual(expected);
});