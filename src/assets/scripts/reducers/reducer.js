import * as ActionTypes from 'constants/ActionTypes';
import { deleteAt, flatten, insertAt, pullAt, times } from 'util/arrays';
import { randomInt } from 'util/numbers';


const largeSet = [ 25, 50, 75, 100 ];
const smallSet = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10 ];
const oneBigRestSmall = () => {
  const _largeSet = [ ...largeSet ];
  const _smallSet = [ ...smallSet ];
  const numbers = flatten([
    times(1, () => pullAt(_largeSet, randomInt(0, _largeSet.length - 1))),
    times(5, () => pullAt(_smallSet, randomInt(0, _smallSet.length - 1))),
  ]);

  return numbers;
};

const initialState = {
  cursor: 0,
  numbers: oneBigRestSmall(),
  showRulesPrompt: false,
  stream: [],
  target: randomInt(101, 499),
};

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {

    case ActionTypes.START_OVER:
      return {
        ...state,
        stream: [],
        cursor: 0,
      };

    case ActionTypes.DELETE_AT_CURSOR:
      return {
        ...state,
        stream: deleteAt(state.stream, state.cursor - 1),
        cursor: Math.max(0, state.cursor - 1),
      };

    case ActionTypes.INSERT_AT_CURSOR:
      return {
        ...state,
        stream: insertAt(state.stream, state.cursor, payload),
        cursor: state.cursor + 1
      };

    case ActionTypes.SHOW_RULES_PROMPT:
      return {
        ...state,
        showRulesPrompt: Boolean(payload),
      };
  }

  return state;
};

export default reducer;
