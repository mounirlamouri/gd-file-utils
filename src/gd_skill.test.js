const {GDSkill} = require('./gd_skill');

test('Read freshly created man sc character', async () => {
  const skill = new GDSkill({
    "active": 0,
    "autoCastController": "",
    "autoCastSkill": "",
    "devotionLevel": 0,
    "enabled": true,
    "experience": 0,
    "level": 1,
    "name": "foo/bar.blah",
    "unknown1": 0,
    "unknown2": 0,
  });

  const expected = new GDSkill();
  expected.name_ = "foo/bar.blah";
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