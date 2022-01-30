/**
 * GDInventory represents a character's inventory: personal bags, equipped
 * items, etc.
 */
class GDInventory {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    /** Inventory bags (including the main one). */
    this.bags_ = null;

    /** TODO: what and type */
    this.focused_ = 0;

    /** TODO: what and type */
    this.selected_ = 0;

    /** TODO: what and type */
    this.useAlternate_ = 0;

    /** Slots for each piece of equipment. */
    // TODO: add enum for eatch position (0-11)
    // 0: ??
    // 1: necklace (accessories)
    // 2: torso
    // 3: legs
    this.equipment_ = null;

    // TODO
    this.alternate1_ = 0;

    /** Weapons (0-1) slots for setup #1 */
    // TODO: add enum for left/right.
    this.weapons1_ = null;

    // TODO
    this.alternate2_ = 0;

    /** Weapons (0-1) slots for setup #2 */
    // TODO: add enum for left/right.
    this.weapons2_ = null;

    if (init != null) {
      this.init_(init);
    }
  }

  /**
   * Initialise the instance based on the given init object.
   * @param {Object} init
   */
  init_(init) {
    if (init.bags != null) this.bags_ = init.bags;
    if (init.focused != null) this.focused_ = init.focused;
    if (init.selected != null) this.selected_ = init.selected;
    if (init.useAlternate != null) this.useAlternate_ = init.useAlternate;
    if (init.equipment != null) this.equipment_ = init.equipment;
    if (init.alternate1 != null) this.alternate1_ = init.alternate1;
    if (init.weapons1 != null) this.weapons1_ = init.weapons1;
    if (init.alternate2 != null) this.alternate2_ = init.alternate2;
    if (init.weapons2 != null) this.weapons2_ = init.weapons2;
  }
}

module.exports = {GDInventory};
