import * as ActionTypes from 'constants/ActionTypes';


export const getNewNumbers = () => ({ type: ActionTypes.GET_NEW_NUMBERS });

export const startOver = () => ({ type: ActionTypes.START_OVER });

export const insertAtCursor = value => ({ type: ActionTypes.INSERT_AT_CURSOR, payload: value });

export const deleteAtCursor = () => ({ type: ActionTypes.DELETE_AT_CURSOR });

export const showRulesPrompt = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: false });
  }, 2000);
  dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: true });
};
