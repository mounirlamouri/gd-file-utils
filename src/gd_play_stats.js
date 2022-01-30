/**
 * GDPlayStats represents the play statistics related to a character.
 * The default constructor, when init isn't set, returns the player statistics
 * at the beginning of the game.
 */
class GDPlayStats {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    /** Total play time (in seconds). */
    this.playTime_ = 0;

    /**
     * Total number of deaths.
     * For HC character, 1 means that the character can no longer be played.
     */
    this.deaths_ = 0;

    /** Total number of kills. */
    this.kills_ = 0;

    /** Experience from kills, as opposed to from quests, crucible, etc. */
    this.experienceFromKills_ = 0;

    /** Total number of health potions used. */
    this.healthPotionsUsed_ = 0;

    /** Total number of energy potions used. */
    this.manaPotionsUsed_ = 0;

    /** TODO?! */
    this.maxLevel_ = 1;

    /** Count of received hits. */
    this.hitsReceived_ = 0;

    /** Count of inflicted hits. */
    this.hitsInflicted_ = 0;

    /** Count of inflicted critical hits. */
    this.criticalHitsInflicted_ = 0;

    /** Count of received critical hits. */
    this.criticalHitsReceived_ = 0;

    /** Greatest value of inflicted damage. */
    this.greatestDamageInflicted_ = 0;

    this.greatestMonsterKilledName_ = ['', '', ''];
    this.greatestMonsterKilledLevel_ = [0, 0, 0];
    this.greatestMonsterKilledLifeAndMana_ = [0, 0, 0];
    this.lastMonsterHit_ = ['', '', ''];
    this.lastMonsterHitBy_ = ['', '', ''];

    this.championKills_ = 0;

    /** TODO!? */
    this.lastHit_ = 0;
    /** TODO!? */
    this.lastHitBy_ = 0;
    this.greatestDamageReceived_ = 0;
    this.herosKilled_ = 0;
    this.itemsCrafted_ = 0;
    this.relicsCrafted_ = 0;
    this.transcendentRelicsCrafted_ = 0;
    this.mythicalRelicsCrafted_ = 0;
    this.shrinesRestored_ = 0;
    this.oneShotChestsOpened_ = 0;

    /** Total numbor of lore notes collected. */
    this.loreNotesCollected_ = 0;

    this.bossKills_ = [0, 0, 0];

    // Crucible.

    /** Greatest Crucible Tier this character survived. */
    this.survivalWaveTier_ = 0;
    /** Greatest Crucible Score this character received. */
    this.greatestSurvivalScore_ = 0;
    this.cooldownRemaining_ = 0;
    this.cooldownTotal_ = 0;

    this.unknownVector_ = [];

    this.shatteredRealmSouls_ = 0;
    this.shatteredRealmEssence_ = 0;
    this.difficultySkip_ = 0;

    this.unknown1_ = 0;
    this.unknown2_ = 0;

    if (init) {
      this.init_(init);
    }
  }

  /**
   * Initialise the instance based on the given init object.
   * @param {!Object} init
   */
  init_(init) {
    if (init.playTime != null) this.playTime_ = init.playTime;
    if (init.deaths != null) this.deaths_ = init.deaths;
    if (init.kills != null) this.kills_ = init.kills;
    if (init.experienceFromKills != null) {
      this.experienceFromKills_ = init.experienceFromKills;
    }
    if (init.healthPotionsUsed != null) {
      this.healthPotionsUsed_ = init.healthPotionsUsed;
    }
    if (init.manaPotionsUsed != null) {
      this.manaPotionsUsed_ = init.manaPotionsUsed;
    }
    if (init.maxLevel != null) this.maxLevel_ = init.maxLevel;
    if (init.hitsReceived != null) this. hitsReceived_ = init.hitsReceived;
    if (init.hitsInflicted != null) this.hitsInflicted_ = init.hitsInflicted;
    if (init.criticalHitsInflicted != null) {
      this.criticalHitsInflicted_ = init.criticalHitsInflicted;
    }
    if (init.criticalHitsReceived != null) {
      this.criticalHitsReceived_ = init.criticalHitsReceived;
    }
    if (init.greatestDamageInflicted != null) {
      this.greatestDamageInflicted_ = init.greatestDamageInflicted;
    }
    if (init.greatestMonsterKilledName != null) {
      this.greatestMonsterKilledName_ = init.greatestMonsterKilledName;
    }
    if (init.greatestMonsterKilledLevel != null) {
      this.greatestMonsterKilledLevel_ = init.greatestMonsterKilledLevel;
    }
    if (init.greatestMonsterKilledLifeAndMana != null) {
      this.greatestMonsterKilledLifeAndMana_ =
        init.greatestMonsterKilledLifeAndMana;
    }
    if (init.lastMonsterHit != null) this.lastMonsterHit_ = init.lastMonsterHit;
    if (init.lastMonsterHitBy != null) {
      this.lastMonsterHitBy_ = init.lastMonsterHitBy;
    }
    if (init.championKills != null) this.championKills_ = init.championKills;
    if (init.lastHit != null) this.lastHit_ = init.lastHit;
    if (init.lastHitBy != null) this.lastHitBy_ = init.lastHitBy;
    if (init.greatestDamageReceived != null) {
      this.greatestDamageReceived_ = init.greatestDamageReceived;
    }
    if (init.herosKilled != null) this.herosKilled_ = init.herosKilled;
    if (init.itemsCrafted != null) this.itemsCrafted_ = init.itemsCrafted;
    if (init.relicsCrafted != null) this.relicsCrafted_ = init.relicsCrafted;
    if (init.transcendentRelicsCrafted != null) {
      this.transcendentRelicsCrafted_ = init.transcendentRelicsCrafted;
    }
    if (init.mythicalRelicsCrafted != null) {
      this.mythicalRelicsCrafted_ = init.mythicalRelicsCrafted;
    }
    if (init.shrinesRestored != null) {
      this.shrinesRestored_ = init.shrinesRestored;
    }
    if (init.oneShotChestsOpened != null) {
      this.oneShotChestsOpened_ = init.oneShotChestsOpened;
    }
    if (init.loreNotesCollected != null) {
      this.loreNotesCollected_ = init.loreNotesCollected;
    }
    if (init.bossKills != null) this.bossKills_ = init.bossKills;
    if (init.survivalWaveTier != null) {
      this.survivalWaveTier_ = init.survivalWaveTier;
    }
    if (init.greatestSurvivalScore != null) {
      this.greatestSurvivalScore_ = init.greatestSurvivalScore;
    }
    if (init.cooldownRemaining != null) {
      this.cooldownRemaining_ = init.cooldownRemaining;
    }
    if (init.cooldownTotal != null) this.cooldownTotal_ = init.cooldownTotal;
    if (init.unknownVector != null) this.unknownVector_ = init.unknownVector;
    if (init.shatteredRealmSouls != null) {
      this.shatteredRealmSouls_ = init.shatteredRealmSouls;
    }
    if (init.shatteredRealmEssence != null) {
      this.shatteredRealmEssence_ = init.shatteredRealmEssence;
    }
    if (init.difficultySkip != null) this.difficultySkip_ = init.difficultySkip;
    if (init.unknown1 != null) this.unknown1_ = init.unknown1;
    if (init.unknown2 != null) this.unknown2_ = init.unknown2;
  }
}

module.exports = {GDPlayStats};
