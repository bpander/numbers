import { createSelector } from 'reselect';
import * as OperatorTypes from 'constants/OperatorTypes';
import { BIT_DEPTH, AUGEND_INDEX, OPERATOR_INDEX, ADDEND_INDEX } from 'constants/StreamConstants';
import { times } from 'util/arrays';


const getNumbers = state => state.numbers;
const getStream = state => state.stream;

export const getInventory = createSelector(
  [ getNumbers, getStream ],
  (numbers, stream) => {
    const inventory = [ ...numbers ];
    const numOperations = Math.floor(stream.length / BIT_DEPTH);

    times(numOperations, i => {
      const start = i * BIT_DEPTH;
      const augend = inventory[stream[start + AUGEND_INDEX]];
      const operator = stream[start + OPERATOR_INDEX];
      const addend = inventory[stream[start + ADDEND_INDEX]];
      switch (operator) {
        case OperatorTypes.ADD: inventory.push(augend + addend); break;
        case OperatorTypes.SUB: inventory.push(augend - addend); break;
        case OperatorTypes.MUL: inventory.push(augend * addend); break;
        case OperatorTypes.DIV: inventory.push(augend / addend); break;
      }
    });

    return inventory;
  },
);
