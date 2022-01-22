/**
 * GDSkill represents character's skill information. It does not represent
 * skills coming from items.
 */
 class GDSkill {
  constructor(init) {
    this.name_ = (init && init.name) || "";
    this.level_ = (init && init.level) || 0;
    this.enabled_ = (init && init.enabled) || false;
    this.devotionLevel_ = (init && init.devotionLevel) || 0;
    this.experience_ = (init && init.experience) || 0;
    this.active_ = (init && init.active) || 0;
    this.unknown1_ = (init && init.unknown1) || 0;
    this.unknown2_ = (init && init.unknown2) || 0;
    this.autoCastSkill_ = (init && init.autoCastSkill) || "";
    this.autoCastController_ = (init && init.autoCastController) || "";
  }
}

module.exports = {GDSkill}