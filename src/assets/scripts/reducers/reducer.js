import * as ActionTypes from 'constants/ActionTypes';
import { deleteAt, flatten, insertAt, pullAt, times } from 'util/arrays';
import { randomInt } from 'util/numbers';
import { createSolver, rpnCombinations } from 'util/solver';


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
  numbers: [],
  showRulesPrompt: false,
  solution: [],
  stream: [],
  target: 0,
};

const solver = createSolver(rpnCombinations(6));

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {

    case ActionTypes.GET_NEW_NUMBERS: {
      let numbers;
      let target;
      let result = { success: false };
      while (!result.success) {
        numbers = oneBigRestSmall();
        target = randomInt(101, 499);
        result = solver(numbers, target);
        console.log(result);
      }
      return {
        ...state,
        numbers,
        target,
        solution: result.steps,
        stream: [],
      };
    }

    case ActionTypes.START_OVER:
      return {
        ...state,
        stream: [],
      };

    case ActionTypes.STREAM_POP:
      return {
        ...state,
        stream: deleteAt(state.stream, state.stream.length - 1),
      };

    case ActionTypes.STREAM_PUSH:
      return {
        ...state,
        stream: insertAt(state.stream, state.stream.length, payload),
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
