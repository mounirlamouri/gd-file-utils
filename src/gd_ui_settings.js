const {GDHotSlot} = require("./gd_hot_slot");

/**
 * GDUiSettings keeps track of character specific UI settings.
 */
class GDUiSettings {
  constructor(init) {
    this.unknown1_ = (init && init.unknown1 != null) ? init.unknown1 : 0;
    this.unknown2_ = (init && init.unknown2 != null) ? init.unknown2 : 0;
    this.unknown3_ = (init && init.unknown3 != null) ? init.unknown3 : 0;
    this.unknown4_ = (init && init.unknown4 != null) ? init.unknown4 : ['', '', '', '', ''];
    this.unknown5_ = (init && init.unknown5 != null) ? init.unknown5 : ['', '', '', '', ''];
    this.unknown6_ = (init && init.unknown6 != null) ? init.unknown6 : [1, 0, 0, 0, 0];

    this.hotSlots_ = (init && init.hotSlots != null) ? init.hotSlots : new Array(46);
    if (!init || init.hotSlots == null) {
      for (let i = 0; i < 46; ++i) {
        if (i == 8 || i == 24) {
          this.hotSlots_[i] = new GDHotSlot({type: GDHotSlot.Type.Health});
        } else if (i == 9 || i == 25) {
          this.hotSlots_[i] = new GDHotSlot({type: GDHotSlot.Type.Energy});
        } else if (i == 10 || i == 11 || i == 26) {
          this.hotSlots_[i] = new GDHotSlot({
            type: GDHotSlot.Type.Regular,
            skill: "records/skills/default/defaultweaponattack.dbr"
          });
        } else {
          this.hotSlots_[i] = new GDHotSlot();
        }
      }
    }

    this.cameraDistance_ = (init && init.cameraDistance != null) ? init.cameraDistance : 36;
  }
}

module.exports = {GDUiSettings}