/**
 * GDInventory represents a character's inventory: personal bags, equipped
 * items, etc.
 */
class GDInventory {
  constructor(init = null) {
    /** Inventory bags (including the main one). */
    this.bags_ = (init && init.bags != null) ? init.bags : 1;

    /** TODO: what and type */
    this.focused_ = (init && init.focused != null) ? init.focused : 0;

    /** TODO: what and type */
    this.selected_ = (init && init.selected != null) ? init.selected : 0;

    /** TODO: what and type */
    this.useAlternate_ = (init && init.useAlternate != null) ? init.useAlternate : 0;

    /** Slots for each piece of equipment. */
    // TODO: add enum for eatch position (0-11)
    // 0: ??
    // 1: necklace (accessories)
    // 2: torso
    // 3: legs
    this.equipment_ = (init && init.equipment != null) ? init.equipment : null;

    // TODO
    this.alternate1_ = (init && init.alternate1 != null) ? init.alternate1 : 0;

    /** Weapons (0-1) slots for setup #1 */
    // TODO: add enum for left/right.
    this.weapons1_ = (init && init.weapons1 != null) ? init.weapons1 : null;

    // TODO
    this.alternate2_ = (init && init.alternate2 != null) ? init.alternate2 : 0;

    /** Weapons (0-1) slots for setup #2 */
    // TODO: add enum for left/right.
    this.weapons2_ = (init && init.weapons2 != null) ? init.weapons2 : null;
  }
}

module.exports = {GDInventory}