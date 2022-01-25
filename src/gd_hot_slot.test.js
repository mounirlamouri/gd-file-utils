const {GDHotSlot} = require('./gd_hot_slot');

test('Constructor without values', () => {
  const hotslot = new GDHotSlot();

  const expected = new GDHotSlot();
  expected.skill_ = '';
  expected.item_ = '';
  expected.location_ = 0;
  expected.isItemSkill_ = false;
  expected.type_ = GDHotSlot.Type.Empty;

  expect(hotslot).toStrictEqual(expected);
});

test('Constructor with only type (Health)', () => {
  const hotslot = new GDHotSlot({type: GDHotSlot.Type.Health});

  const expected = new GDHotSlot();
  expected.skill_ = '';
  expected.item_ = '';
  expected.location_ = 0;
  expected.isItemSkill_ = false;
  expected.type_ = GDHotSlot.Type.Health;

  expect(hotslot).toStrictEqual(expected);
});

test('Constructor with only type (Regular)', () => {
  const hotslot = new GDHotSlot({type: GDHotSlot.Type.Regular});

  const expected = new GDHotSlot();
  expected.skill_ = '';
  expected.item_ = '';
  expected.location_ = 0;
  expected.isItemSkill_ = false;
  expected.type_ = GDHotSlot.Type.Regular;

  expect(hotslot).toStrictEqual(expected);
});

test('Constructor with only type (Empty)', () => {
  const hotslot = new GDHotSlot({type: GDHotSlot.Type.Empty});

  const expected = new GDHotSlot();
  expected.skill_ = '';
  expected.item_ = '';
  expected.location_ = 0;
  expected.isItemSkill_ = false;
  expected.type_ = GDHotSlot.Type.Empty;

  expect(hotslot).toStrictEqual(expected);
});

test('Constructor with all fields', () => {
  const hotslot = new GDHotSlot({
    type: GDHotSlot.Type.Regular,
    skill: 'foobar',
    item: 'barfoo',
    location: 42,
    isItemSkill: true,
  });

  const expected = new GDHotSlot();
  expected.skill_ = 'foobar';
  expected.item_ = 'barfoo';
  expected.location_ = 42;
  expected.isItemSkill_ = true;
  expected.type_ = GDHotSlot.Type.Regular;

  expect(hotslot).toStrictEqual(expected);
});

test('Constructor with all fields (2)', () => {
  const hotslot = new GDHotSlot({
    type: GDHotSlot.Type.Energy,
    skill: '',
    item: '',
    location: 3,
    isItemSkill: false,
  });

  const expected = new GDHotSlot();
  expected.skill_ = '';
  expected.item_ = '';
  expected.location_ = 3;
  expected.isItemSkill_ = false;
  expected.type_ = GDHotSlot.Type.Energy;

  expect(hotslot).toStrictEqual(expected);
});
