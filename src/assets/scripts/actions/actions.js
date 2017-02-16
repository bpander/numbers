import * as ActionTypes from 'constants/ActionTypes';


export const insertAtCursor = value => ({ type: ActionTypes.INSERT_AT_CURSOR, payload: value });
export const showRulesPrompt = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: false });
  }, 2000);
  dispatch({ type: ActionTypes.SHOW_RULES_PROMPT, payload: true });
};
