const {GDItem} = require('./gd_item');

/**
 * GDEquipmentSlot represents an equipment slot. It contains GDItem that will be
 * null if the slot is not used.
 * NOTE: the in-game save file has a boolean and always contains an item. This
 * class behaves differently to make the API simpler.
 */
class GDEquipmentSlot {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    /** Item in the equipment slot if any. Will be null if no item. */
    this.item_ = null;

    if (init && init.item != null) {
      this.item_ =
        (init.item instanceof GDItem) ? init.item : new GDItem(init.item);
    }
  }
}

module.exports = {GDEquipmentSlot};
