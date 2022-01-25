/**
 * GDHotSlot reperesents a hot slot mapping such as skills and potions.
 */
class GDHotSlot {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    this.type_ = (init && init.type != null) ? init.type : GDHotSlot.Type.Empty;
    this.skill_ = (init && init.skill != null) ? init.skill : '';
    this.isItemSkill_ =
      (init && init.isItemSkill != null) ? init.isItemSkill : false;
    this.item_ = (init && init.item != null) ? init.item : '';
    this.location_ = (init && init.location != null) ? init.location : 0;
  }
}

const Type = {
  Regular: 0,
  Health: 2,
  Energy: 3,
  Empty: 4294967295,
};

Object.defineProperty(GDHotSlot, 'Type', {
  value: Type,
  writable: false,
});

module.exports = {GDHotSlot};
