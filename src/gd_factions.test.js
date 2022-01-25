const {GDFactions} = require('./gd_factions');

test('Constructor with all fields', () => {
  const skill = new GDFactions();

  const expected = new GDFactions();
  expected.faction_ = 0;
  expected.list_ = [{
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
  }];

  expect(skill).toStrictEqual(expected);
});

test('Constructor with all fields', () => {
  const skill = new GDFactions({
    faction: 1,
    list: [{
      modified: 1,
      negativeBoost: 1,
      positiveBoost: 1,
      unlocked: 1,
      value: 42,
    }],
  });

  const expected = new GDFactions();
  expected.faction_ = 1;
  expected.list_ = [{
    modified: 1,
    negativeBoost: 1,
    positiveBoost: 1,
    unlocked: 1,
    value: 42,
  }];

  expect(skill).toStrictEqual(expected);
});
