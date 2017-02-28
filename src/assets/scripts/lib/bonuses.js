import * as BonusTypes from 'constants/BonusTypes';
import * as PointValues from 'constants/PointValues';


const bonuses = [

  {
    type: BonusTypes.BASE,
    amount: (runningTotal, state) => PointValues.BASE,
  },

  {
    type: BonusTypes.NO_UNDOS,
    amount: (runningTotal, state) => (state.didUndo) ? 0 : PointValues.NO_UNDOS,
  },

  {
    type: BonusTypes.USED_ALL,
    amount: (runningTotal, state) => {
      const didUseAll = true;
      return (didUseAll) ? PointValues.USED_ALL : 0;
    },
  },

  {
    type: BonusTypes.SPEED,
    amount: (runningTotal, state) => {
      const { start, finish } = state;
      return Math.floor(1 / (finish - start) * 1e7);
    },
  },

  {
    type: BonusTypes.DIFFICULTY,
    amount: (runningTotal, state) => {
      switch (state.difficulty) {
        // TODO: Other difficulty modifiers go here
        default: return Math.floor(runningTotal * PointValues.REGULAR_DIFFICULTY_MODIFIER);
      }
    },
  },

];

export default bonuses;
