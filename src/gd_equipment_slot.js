const {GDItem} = require('./gd_item');

/**
 * GDEquipmentSlot represents an equipment slot. It contains GDItem and a bool
 * reflecting whether the slot is used. Callers of the API should check `used_`
 * before accessing `item_`.
 * NOTE: the save file sometimes contain a non-null GDItem so in order to be
 * able to read and write without loss, the read item is saved regardless.
 * The API could be improved to hide that implementation details to the client.
 * The GDItem seems to only have different values for seed.
 */
class GDEquipmentSlot {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    /** Whether the equipment slot is being used and has a proper item. */
    this.used_ = false;

    /** Item in the equipment slot. */
    this.item_ = new GDItem();

    if (init != null) {
      this.init_(init);
    }
  }

  /**
   * Initialise the object.
   * @param {Object} init
   */
  init_(init) {
    if (init.used != null) this.used_ = init.used;

    if (init.item != null) {
      this.item_ =
        (init.item instanceof GDItem) ? init.item : new GDItem(init.item);
    }
  }
}

module.exports = {GDEquipmentSlot};
