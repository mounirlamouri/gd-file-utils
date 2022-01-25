const {GDPlayStats} = require('./gd_play_stats');

test('Constructor without values', () => {
  const settings = new GDPlayStats();

  const expected = new GDPlayStats();
  expected.playTime_ = 0;
  expected.deaths_ = 0;
  expected.kills_ = 0;
  expected.experienceFromKills_ = 0;
  expected.healthPotionsUsed_ = 0;
  expected.manaPotionsUsed_ = 0;
  expected.maxLevel_ = 1;
  expected.hitsReceived_ = 0;
  expected.hitsInflicted_ = 0;
  expected.criticalHitsInflicted_ = 0;
  expected.criticalHitsReceived_ = 0;
  expected.greatestDamageInflicted_ = 0;
  expected.greatestMonsterKilledName_ = ['', '', ''];
  expected.greatestMonsterKilledLevel_ = [0, 0, 0];
  expected.greatestMonsterKilledLifeAndMana_ = [0, 0, 0];
  expected.lastMonsterHit_ = ['', '', ''];
  expected.lastMonsterHitBy_ = ['', '', ''];
  expected.championKills_ = 0;
  expected.lastHit_ = 0;
  expected.lastHitBy_ = 0;
  expected.greatestDamageReceived_ = 0;
  expected.herosKilled_ = 0;
  expected.itemsCrafted_ = 0;
  expected.relicsCrafted_ = 0;
  expected.transcendentRelicsCrafted_ = 0;
  expected.mythicalRelicsCrafted_ = 0;
  expected.shrinesRestored_ = 0;
  expected.oneShotChestsOpened_ = 0;
  expected.loreNotesCollected_ = 0;
  expected.bossKills_ = [0, 0, 0];
  expected.survivalWaveTier_ = 0;
  expected.greatestSurvivalScore_ = 0;
  expected.cooldownRemaining_ = 0;
  expected.cooldownTotal_ = 0;
  expected.unknownVector_ = [];
  expected.shatteredRealmSouls_ = 0;
  expected.shatteredRealmEssence_ = 0;
  expected.difficultySkip_ = 0;
  expected.unknown1_ = 0;
  expected.unknown2_ = 0;

  expect(settings).toStrictEqual(expected);
});

test('Constructor with all fields', () => {
  const settings = new GDPlayStats({
    playTime: 1,
    deaths: 2,
    kills: 3,
    experienceFromKills: 4,
    healthPotionsUsed: 5,
    manaPotionsUsed: 6,
    maxLevel: 7,
    hitsReceived: 8,
    hitsInflicted: 9,
    criticalHitsInflicted: 10,
    criticalHitsReceived: 11,
    greatestDamageInflicted: 12,
    greatestMonsterKilledName: ['a', 'b', 'c'],
    greatestMonsterKilledLevel: [1, 2, 3],
    greatestMonsterKilledLifeAndMana: [1, 2, 3],
    lastMonsterHit: ['b', 'a', 'c'],
    lastMonsterHitBy: ['c', 'b', 'a'],
    championKills: 13,
    lastHit: 14,
    lastHitBy: 15,
    greatestDamageReceived: 16,
    herosKilled: 17,
    itemsCrafted: 18,
    relicsCrafted: 19,
    transcendentRelicsCrafted: 20,
    mythicalRelicsCrafted: 21,
    shrinesRestored: 22,
    oneShotChestsOpened: 23,
    loreNotesCollected: 24,
    bossKills: [2, 1, 0],
    survivalWaveTier: 25,
    greatestSurvivalScore: 26,
    cooldownRemaining: 27,
    cooldownTotal: 28,
    unknownVector: [0, 0],
    shatteredRealmSouls: 29,
    shatteredRealmEssence: 30,
    difficultySkip: 31,
    unknown1: 32,
    unknown2: 33,
  });

  const expected = new GDPlayStats();
  expected.playTime_ = 1;
  expected.deaths_ = 2;
  expected.kills_ = 3;
  expected.experienceFromKills_ = 4;
  expected.healthPotionsUsed_ = 5;
  expected.manaPotionsUsed_ = 6;
  expected.maxLevel_ = 7;
  expected.hitsReceived_ = 8;
  expected.hitsInflicted_ = 9;
  expected.criticalHitsInflicted_ = 10;
  expected.criticalHitsReceived_ = 11;
  expected.greatestDamageInflicted_ = 12;
  expected.greatestMonsterKilledName_ = ['a', 'b', 'c'];
  expected.greatestMonsterKilledLevel_ = [1, 2, 3];
  expected.greatestMonsterKilledLifeAndMana_ = [1, 2, 3];
  expected.lastMonsterHit_ = ['b', 'a', 'c'];
  expected.lastMonsterHitBy_ = ['c', 'b', 'a'];
  expected.championKills_ = 13;
  expected.lastHit_ = 14;
  expected.lastHitBy_ = 15;
  expected.greatestDamageReceived_ = 16;
  expected.herosKilled_ = 17;
  expected.itemsCrafted_ = 18;
  expected.relicsCrafted_ = 19;
  expected.transcendentRelicsCrafted_ = 20;
  expected.mythicalRelicsCrafted_ = 21;
  expected.shrinesRestored_ = 22;
  expected.oneShotChestsOpened_ = 23;
  expected.loreNotesCollected_ = 24;
  expected.bossKills_ = [2, 1, 0];
  expected.survivalWaveTier_ = 25;
  expected.greatestSurvivalScore_ = 26;
  expected.cooldownRemaining_ = 27;
  expected.cooldownTotal_ = 28;
  expected.unknownVector_ = [0, 0];
  expected.shatteredRealmSouls_ = 29;
  expected.shatteredRealmEssence_ = 30;
  expected.difficultySkip_ = 31;
  expected.unknown1_ = 32;
  expected.unknown2_ = 33;

  expect(settings).toStrictEqual(expected);
});
