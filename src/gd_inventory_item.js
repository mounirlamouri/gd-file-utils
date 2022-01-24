const {GDItem} = require('./gd_item');

/**
 * GDInventoryItem represents an item when in the inventory.
 * It is an extension of GDItem with a position field.
 */
class GDInventoryItem extends GDItem {
  constructor(init = null) {
    super(init);

    this.position_ = (init && init.position != null) ? init.position : {x: 0, y: 0};
  }
}

module.exports = {GDInventoryItem}