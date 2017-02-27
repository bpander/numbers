import * as ActionTypes from 'constants/ActionTypes';
import { getInventory } from 'selectors/selectors';
import { insertAt, last } from 'util/arrays';
import { isWholeNumber } from 'util/numbers';


export const getNewNumbers = () => ({ type: ActionTypes.GET_NEW_NUMBERS });

export const startOver = () => ({ type: ActionTypes.START_OVER });

export const streamPush = (numbers, stream, value) => dispatch => {
  const potentialStream = insertAt(stream, stream.length, value);
  const inventory = getInventory({ numbers, stream: potentialStream });
  const latestNumber = last(inventory);
  if (!isWholeNumber(latestNumber)) {
    return showRulesPrompt()(dispatch);
  }
  dispatch({ type: ActionTypes.UPDATE_STREAM, payload: { stream: potentialStream } });
};

export const streamPop = () => ({ type: ActionTypes.STREAM_POP });

export const showRulesPrompt = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: false });
  }, 2000);
  dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: true });
};
