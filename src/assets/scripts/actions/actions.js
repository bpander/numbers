import { batchActions } from 'redux-batched-actions';
import * as ActionTypes from 'constants/ActionTypes';
import * as bonuses from 'lib/bonuses';
import { getInventory, getPointSummary } from 'selectors/selectors';
import { deleteAt, insertAt, last, pullAt, times } from 'util/arrays';
import { isWholeNumber, randomInt } from 'util/numbers';
import { createSolver, rpnCombinations } from 'util/solver';


const smallSet = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10 ];
const oneBigRestSmall = () => {
  const _smallSet = [ ...smallSet ];
  const numbers = [
    50,
    ...times(5, () => pullAt(_smallSet, randomInt(0, _smallSet.length - 1))),
  ];

  return numbers;
};

const solver = createSolver(rpnCombinations(6));


export const getNewNumbers = () => {
  let numbers;
  let target;
  let result = { success: false };
  while (!result.success) {
    numbers = oneBigRestSmall();
    target = randomInt(101, 499);
    result = solver(numbers, target);
    console.log(result);
  }
  const solution = result.steps;
  return { type: ActionTypes.START_NEW_ROUND, payload: { numbers, target, solution } };
};

export const giveUp = () => ({ type: ActionTypes.GIVE_UP });

export const startOver = () => ({ type: ActionTypes.START_OVER });

export const streamPop = () => ({ type: ActionTypes.STREAM_POP });

export const streamPush = value => (dispatch, getState) => {
  const state = getState();
  const { numbers, stream } = state;
  const potentialStream = insertAt(stream, stream.length, value);
  const inventory = getInventory({ numbers, stream: potentialStream });
  const latestNumber = last(inventory);
  if (!isWholeNumber(latestNumber)) {
    return dispatch(showRulesPrompt());
  }
  const { target } = state;
  const actions = [
    { type: ActionTypes.UPDATE_STREAM, payload: { stream: potentialStream } },
  ];
  if (latestNumber === target) {
    const finish = Date.now();
    const newState = { ...state, finish };
    const pointSummary = getPointSummary(newState);
    actions.push(
      { type: ActionTypes.UPDATE_FINISH, payload: { finish } },
      { type: ActionTypes.ADD_TO_SCORE, payload: { points: pointSummary.total } },
    );
  }
  dispatch(batchActions(actions));
};

export const showRulesPrompt = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: false });
  }, 2000);
  dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: true });
};
