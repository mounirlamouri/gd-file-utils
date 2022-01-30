const {GDStashItem} = require('./gd_stash_item');
const {GDStashTab} = require('./gd_stash_tab');

test('Constructor with no fields', () => {
  const stash = new GDStashTab();

  const expected = new GDStashTab();
  expected.items_ = [];
  expected.width_ = 0;
  expected.height_ = 0;

  expect(stash).toStrictEqual(expected);
});

test('Constructor with inventory all fields', () => {
  const stash = new GDStashTab({
    width: 1,
    height: 2,
    items: [new GDStashItem(), new GDStashItem()],
  });

  const expected = new GDStashTab();
  expected.items_ = [new GDStashItem(), new GDStashItem()],
  expected.width_ = 1;
  expected.height_ = 2;

  expect(stash).toStrictEqual(expected);
});
