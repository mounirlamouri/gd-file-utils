const {GDItem} = require('./gd_item');

/**
 * GDStashItem represents an item when in the stash.
 * It is an extension of GDItem with a position field.
 */
class GDStashItem extends GDItem {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    super(init ? init.item : null);

    this.position_ =
      (init && init.position != null) ? init.position : {x: 0, y: 0};
  }
}

module.exports = {GDStashItem};
