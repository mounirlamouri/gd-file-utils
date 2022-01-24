const {GDSkill} = require('./gd_skill');

test('Constructor with no fields', () => {
  const skill = new GDSkill();

  const expected = new GDSkill();
  expected.name_ = "records/skills/default/default";
  expected.level_ = 1;
  expected.enabled_ = true;
  expected.devotionLevel_ = 0;
  expected.experience_ = 0;
  expected.active_ = 0;
  expected.unknown1_ = 0;
  expected.unknown2_ = 0;
  expected.autoCastSkill_ = "";
  expected.autoCastController_ = "";

  expect(skill).toStrictEqual(expected);
});

test('Constructor with all fields', () => {
  const skill = new GDSkill({
    "active": 1,
    "autoCastController": "foo",
    "autoCastSkill": "bar",
    "devotionLevel": 2,
    "enabled": true,
    "experience": 2,
    "level": 3,
    "name": "foo/bar.blah",
    "unknown1": 4,
    "unknown2": 5,
  });

  const expected = new GDSkill();
  expected.name_ = "foo/bar.blah";
  expected.level_ = 3;
  expected.enabled_ = true;
  expected.devotionLevel_ = 2;
  expected.experience_ = 2;
  expected.active_ = 1;
  expected.unknown1_ = 4;
  expected.unknown2_ = 5;
  expected.autoCastSkill_ = "bar";
  expected.autoCastController_ = "foo";

  expect(skill).toStrictEqual(expected);
});