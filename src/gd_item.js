/**
 * GDItem represents the basic item class.
 */
class GDItem {
  /**
   * @param {?Object} init optional initialisation object
   */
  constructor(init = null) {
    /** Name of the base of the item. */
    this.baseName_ = '';

    /** Name of the prefix. */
    this.prefixName_ = '';

    /** Name of the suffix. */
    this.suffixName_ = '';

    /** Name of the modifier. */
    this.modifierName_ = '';

    /** Name of the transmute, if any. */
    this.transmuteName_ = '';

    /** TODO: random seed? */
    this.seed_ = 0;

    /** Name of the component, if any. */
    this.componentName_ = '';

    /** TODO */
    this.relicBonus_ = '';

    /** TODO: random seed? */
    this.componentSeed_ = 0;

    /** TODO */
    this.augmentName_ = '';

    /** TODO */
    this.unknown_ = 0;

    /** TODO: random seed? */
    this.augmentSeed_ = 0;

    /** TODO */
    this.unknown1_ = 0;

    /** Stack size. */
    this.stackSize_ = 1;

    if (init != null) {
      if (init instanceof GDItem) {
        this.initWithGDItem_(init);
      } else {
        this.init_(init);
      }
    }
  }

  /**
   * Initialise the instance based on the given init object.
   * @param {Object} init
   */
  init_(init) {
    if (init.baseName != null) this.baseName_ = init.baseName;
    if (init.prefixName != null) this.prefixName_ = init.prefixName;
    if (init.suffixName != null) this.suffixName_ = init.suffixName;
    if (init.modifierName != null) this.modifierName_ = init.modifierName;
    if (init.transmuteName != null) this.transmuteName_ = init.transmuteName;
    if (init.seed != null) this.seed_ = init.seed;
    if (init.componentName != null) this.componentName_ = init.componentName;
    if (init.relicBonus != null) this.relicBonus_ = init.relicBonus;
    if (init.componentSeed != null) this.componentSeed_ = init.componentSeed;
    if (init.augmentName != null) this.augmentName_ = init.augmentName;
    if (init.unknown != null) this.unknown_ = init.unknown;
    if (init.augmentSeed != null) this.augmentSeed_ = init.augmentSeed;
    if (init.unknown1 != null) this.unknown1_ = init.unknown1;
    if (init.stackSize != null) this.stackSize_ = init.stackSize;
  }

  /**
   * Initialise the instance based on the given init object.
   * @param {GDItem} init
   */
  initWithGDItem_(init) {
    this.baseName_ = init.baseName_;
    this.prefixName_ = init.prefixName_;
    this.suffixName_ = init.suffixName_;
    this.modifierName_ = init.modifierName_;
    this.transmuteName_ = init.transmuteName_;
    this.seed_ = init.seed_;
    this.componentName_ = init.componentName_;
    this.relicBonus_ = init.relicBonus_;
    this.componentSeed_ = init.componentSeed_;
    this.augmentName_ = init.augmentName_;
    this.unknown_ = init.unknown_;
    this.augmentSeed_ = init.augmentSeed_;
    this.unknown1_ = init.unknown1_;
    this.stackSize_ = init.stackSize_;
  }
}

module.exports = {GDItem};
