import { createSelector } from 'reselect';
import * as OperatorTypes from 'constants/OperatorTypes';
import { BIT_DEPTH, AUGEND_INDEX, OPERATOR_INDEX, ADDEND_INDEX } from 'constants/StreamConstants';
import bonuses from 'lib/bonuses';
import { last, times } from 'util/arrays';
import { solve } from 'util/numbers';


const getState = state => state;
const getNumbers = state => state.numbers;
const getStream = state => state.stream;

export const getInventory = createSelector(
  [ getNumbers, getStream ],
  (numbers, stream) => {
    const inventory = [ ...numbers ];
    const numOperations = Math.trunc(stream.length / BIT_DEPTH);

    times(numOperations, i => {
      const start = i * BIT_DEPTH;
      const operator = stream[start + OPERATOR_INDEX];
      const augend = inventory[stream[start + AUGEND_INDEX]];
      const addend = inventory[stream[start + ADDEND_INDEX]];
      inventory.push(solve(operator, augend, addend));
    });

    return inventory;
  },
);

export const getPointSummary = createSelector(
  [ getState ],
  state => {
    let total = 0;
    const lines = bonuses.map(bonus => {
      const amount = bonus.amount(total, state);
      total += amount;
      return { amount, type: bonus.type };
    });
    return { lines, total };
  },
);
