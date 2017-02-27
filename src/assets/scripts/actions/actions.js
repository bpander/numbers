import { batchActions } from 'redux-batched-actions';
import * as ActionTypes from 'constants/ActionTypes';
import * as bonuses from 'lib/bonuses';
import { getInventory } from 'selectors/selectors';
import { deleteAt, insertAt, last } from 'util/arrays';
import { isWholeNumber } from 'util/numbers';


export const getNewNumbers = () => ({ type: ActionTypes.GET_NEW_NUMBERS });

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
    const points = Object.values(bonuses).reduce((runningTotal, bonus) => {
      return runningTotal + bonus(runningTotal, newState);
    }, 0);
    actions.push(
      { type: ActionTypes.UPDATE_FINISH, payload: { finish } },
      { type: ActionTypes.ADD_TO_SCORE, payload: { points } },
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
