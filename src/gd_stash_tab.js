/**
 * GDStashtab represent a character's stash tab.
 */
class GDStashTab {
  /**
   * @param {Object} init
   */
  constructor(init = null) {
    this.items_ = [];
    this.width_ = 0;
    this.height_ = 0;

    if (init != null) {
      if (init.items != null) this.items_ = init.items;
      if (init.width != null) this.width_ = init.width;
      if (init.height != null) this.height_ = init.height;
    }
  }
};

module.exports = {GDStashTab};
