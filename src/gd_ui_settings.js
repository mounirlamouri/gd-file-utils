/**
 * GDUiSettings keeps track of character specific UI settings.
 */
class GDUiSettings {
  constructor(init) {
    this.unknown1_ = (init && init.unknown1) || 0;
    this.unknown2_ = (init && init.unknown2) || 0;
    this.unknown3_ = (init && init.unknown3) || 0;
    this.unknown4_ = (init && init.unknown4) || [];
    this.unknown5_ = (init && init.unknown5) || [];
    this.unknown6_ = (init && init.unknown6) || [];

    this.hotSlots_ = (init && init.hotSlots) || [];

    this.cameraDistance_ = (init && init.cameraDistance) || 0;
  }
}

module.exports = {GDUiSettings}