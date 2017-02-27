import { batchActions } from 'redux-batched-actions';
import * as ActionTypes from 'constants/ActionTypes';
import { getInventory } from 'selectors/selectors';
import { deleteAt, insertAt, last } from 'util/arrays';
import { isWholeNumber } from 'util/numbers';


export const getNewNumbers = () => ({ type: ActionTypes.GET_NEW_NUMBERS });

export const startOver = () => ({ type: ActionTypes.START_OVER });

export const streamPop = stream => ({
  type: ActionTypes.UPDATE_STREAM,
  payload: { stream: deleteAt(stream, stream.length - 1) },
});

export const streamPush = ({ target, numbers, stream, value }) => dispatch => {
  const potentialStream = insertAt(stream, stream.length, value);
  const inventory = getInventory({ numbers, stream: potentialStream });
  const latestNumber = last(inventory);
  if (!isWholeNumber(latestNumber)) {
    return showRulesPrompt()(dispatch);
  }
  const actions = [
    { type: ActionTypes.UPDATE_STREAM, payload: { stream: potentialStream } },
  ];
  if (latestNumber === target) {
    const pointSummary = [];
    const points = 100;
    actions.push(
      { type: ActionTypes.UPDATE_POINT_SUMMARY, payload: { pointSummary } },
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
