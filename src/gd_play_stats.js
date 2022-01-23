/**
 * GDPlayStats represents the play statistics related to a character.
 * The default constructor, when init isn't set, returns the player statistics
 * at the beginning of the game.
 */
class GDPlayStats {
  constructor(init = null) {
    this.playTime_ = (init && init.playTime != null) ? init.playTime : 0;
    this.deaths_ = (init && init.deaths != null) ? init.deaths : 0;
    this.kills_ = (init && init.kills != null) ? init.kills : 0;
    this.experienceFromKills_ = (init && init.experienceFromKills != null) ? init.experienceFromKills : 0;
    this.healthPotionsUsed_ = (init && init.healthPotionsUsed != null) ? init.healthPotionsUsed : 0;
    this.manaPotionsUsed_ = (init && init.manaPotionsUsed != null) ? init.manaPotionsUsed : 0;
    this.maxLevel_ = (init && init.maxLevel != null) ? init.maxLevel : 1;
    this.hitsReceived_ = (init && init.hitsReceived != null) ? init.hitsReceived : 0;
    this.hitsInflicted_ = (init && init.hitsInflicted != null) ? init.hitsInflicted : 0;
    this.criticalHitsInflicted_ = (init && init.criticalHitsInflicted != null) ? init.criticalHitsInflicted : 0;
    this.criticalHitsReceived_ = (init && init.criticalHitsReceived != null) ? init.criticalHitsReceived : 0;
    this.greatestDamageInflicted_ = (init && init.greatestDamageInflicted != null) ? init.greatestDamageInflicted : 0;

    this.greatestMonsterKilledName_ = (init && init.greatestMonsterKilledName != null) ? init.greatestMonsterKilledName : ['', '', ''];
    this.greatestMonsterKilledLevel_ = (init && init.greatestMonsterKilledLevel != null) ? init.greatestMonsterKilledLevel : [0, 0, 0];
    this.greatestMonsterKilledLifeAndMana_ = (init && init.greatestMonsterKilledLifeAndMana != null) ? init.greatestMonsterKilledLifeAndMana : [0, 0, 0];
    this.lastMonsterHit_ = (init && init.lastMonsterHit != null) ? init.lastMonsterHit : ['', '', ''];
    this.lastMonsterHitBy_ = (init && init.lastMonsterHitBy != null) ? init.lastMonsterHitBy : ['', '', ''];
  
    this.championKills_ = (init && init.championKills != null) ? init.championKills : 0;
    this.lastHit_ = (init && init.lastHit != null) ? init.lastHit : 0;
    this.lastHitBy_ = (init && init.lastHitBy != null) ? init.lastHitBy : 0;
    this.greatestDamageReceived_ = (init && init.greatestDamageReceived != null) ? init.greatestDamageReceived : 0;
    this.herosKilled_ = (init && init.herosKilled != null) ? init.herosKilled : 0;
    this.itemsCrafted_ = (init && init.itemsCrafted != null) ? init.itemsCrafted : 0;
    this.relicsCrafted_ = (init && init.relicsCrafted != null) ? init.relicsCrafted : 0;
    this.transcendentRelicsCrafted_ = (init && init.transcendentRelicsCrafted != null) ? init.transcendentRelicsCrafted : 0;
    this.mythicalRelicsCrafted_ = (init && init.mythicalRelicsCrafted != null) ? init.mythicalRelicsCrafted : 0;
    this.shrinesRestored_ = (init && init.shrinesRestored != null) ? init.shrinesRestored : 0;
    this.oneShotChestsOpened_ = (init && init.oneShotChestsOpened != null) ? init.oneShotChestsOpened : 0;
    this.loreNotesCollected_ = (init && init.loreNotesCollected != null) ? init.loreNotesCollected : 0;

    this.bossKills_ = (init && init.bossKills != null) ? init.bossKills : [0, 0, 0];

    // Crucible.
    this.survivalWaveTier_ = (init && init.survivalWaveTier != null) ? init.survivalWaveTier : 0;
    this.greatestSurvivalScore_ = (init && init.greatestSurvivalScore != null) ? init.greatestSurvivalScore : 0;
    this.cooldownRemaining_ = (init && init.cooldownRemaining != null) ? init.cooldownRemaining : 0;
    this.cooldownTotal_ = (init && init.cooldownTotal != null) ? init.cooldownTotal : 0;

    this.unknownVector_ = (init && init.unknownVector != null) ? init.unknownVector : [];

    this.shatteredRealmSouls_ = (init && init.shatteredRealmSouls != null) ? init.shatteredRealmSouls : 0;
    this.shatteredRealmEssence_ = (init && init.shatteredRealmEssence != null) ? init.shatteredRealmEssence : 0;
    this.difficultySkip_ = (init && init.difficultySkip != null) ? init.difficultySkip : 0;

    this.unknown1_ = (init && init.unknown1 != null) ? init.unknown1 : 0;
    this.unknown2_ = (init && init.unknown2 != null) ? init.unknown2 : 0;
  }
}

module.exports = {GDPlayStats}