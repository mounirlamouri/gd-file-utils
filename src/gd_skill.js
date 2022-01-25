/**
 * GDSkill represents character's skill information. It does not represent
 * skills coming from items.
 */
class GDSkill {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    this.name_ = (init && init.name != null) ?
                   init.name : 'records/skills/default/default';
    this.level_ = (init && init.level != null) ? init.level : 1;
    this.enabled_ = (init && init.enabled != null) ? init.enabled : true;
    this.devotionLevel_ =
      (init && init.devotionLevel != null) ? init.devotionLevel : 0;
    this.experience_ = (init && init.experience != null) ? init.experience : 0;
    this.active_ = (init && init.active != null) ? init.active : 0;
    this.unknown1_ = (init && init.unknown1 != null) ? init.unknown1 : 0;
    this.unknown2_ = (init && init.unknown2 != null) ? init.unknown2 : 0;
    this.autoCastSkill_ =
      (init && init.autoCastSkill != null) ? init.autoCastSkill : '';
    this.autoCastController_ =
      (init && init.autoCastController != null) ? init.autoCastController : '';
  }
}

module.exports = {GDSkill};
