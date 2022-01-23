/**
 * GDFactions represents the faction information from a character file.
 */
class GDFactions {
  constructor(init = null) {
    /** First int in the faction block. Not clear what is represents. */
    this.faction_ = (init && init.faction != null) ? init.faction : 0;

    /** Relationship with all factions. Unclear which factions are which. */
    // TODO: create a FactionInfo class.
    this.list_ = (init && init.list != null) ? init.list : [];
    if (!init || init.list == null) {
      this.list_ = [{
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 24000,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: -1,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: -1,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: -1,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: -1,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: -1,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: -1,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      },
      {
        modified: 0,
        negativeBoost: 0,
        positiveBoost: 0,
        unlocked: 0,
        value: 0,
      }];
    }
  }
}

module.exports = {GDFactions}