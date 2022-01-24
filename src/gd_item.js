/**
 * GDItem represents the basic item class.
 */
class GDItem {
  constructor(init = null) {
    /** Name of the base of the item. */
    this.baseName_ = (init && init.baseName != null) ? init.baseName : '';

    /** Name of the prefix. */
    this.prefixName_ = (init && init.prefixName != null) ? init.prefixName : '';

    /** Name of the suffix. */
    this.suffixName_ = (init && init.suffixName != null) ? init.suffixName : '';

    /** Name of the modifier. */
    this.modifierName_ = (init && init.modifierName != null) ? init.modifierName : '';

    /** Name of the transmute, if any. */
    this.transmuteName_ = (init && init.transmuteName != null) ? init.transmuteName : '';

    /** TODO: random seed? */
    this.seed_ = (init && init.seed != null) ? init.seed : 0;

    /** Name of the component, if any. */
    this.componentName_ = (init && init.componentName != null) ? init.componentName : '';

    /** TODO */
    this.relicBonus_ = (init && init.relicBonus != null) ? init.relicBonus : '';

    /** TODO: random seed? */
    this.componentSeed_ = (init && init.componentSeed != null) ? init.componentSeed : 0;

    /** TODO */
    this.augmentName_ = (init && init.augmentName != null) ? init.augmentName : '';

    /** TODO */
    this.unknown_ = (init && init.unknown != null) ? init.unknown : 0;

    /** TODO: random seed? */
    this.augmentSeed_ = (init && init.augmentSeed != null) ? init.augmentSeed : 0;

    /** TODO */
    this.unknown1_ = (init && init.unknown1 != null) ? init.unknown1 : 0;

    /** Stack size. */
    this.stackSize_ = (init && init.stackSize != null) ? init.stackSize : 1;
  }
}

module.exports = {GDItem}