import * as ActionTypes from 'constants/ActionTypes';


export const getNewNumbers = () => ({ type: ActionTypes.GET_NEW_NUMBERS });

export const startOver = () => ({ type: ActionTypes.START_OVER });

export const streamPush = value => ({ type: ActionTypes.STREAM_PUSH, payload: value });

export const streamPop = () => ({ type: ActionTypes.STREAM_POP });

export const showRulesPrompt = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: false });
  }, 2000);
  dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: true });
};
