import * as ActionTypes from 'constants/ActionTypes';
import { deleteAt } from 'util/arrays';


const initialState = {
  didUndo: false,
  finish: 0,
  hasGivenUp: false,
  numbers: [],
  score: 0,
  showRulesPrompt: false,
  solution: [],
  start: 0,
  stream: [],
  target: 0,
};


const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {

    case ActionTypes.ADD_TO_SCORE:
      return { ...state, score: state.score + action.payload.points };

    case ActionTypes.START_NEW_ROUND:
      return {
        ...state,
        numbers: payload.numbers,
        target: payload.target,
        didUndo: false,
        finish: 0,
        hasGivenUp: false,
        solution: payload.solution,
        start: Date.now(),
        stream: [],
      };

    case ActionTypes.GIVE_UP:
      return {
        ...state,
        hasGivenUp: true,
        score: 0,
      };

    case ActionTypes.START_OVER:
      return {
        ...state,
        didUndo: true,
        stream: [],
      };

    case ActionTypes.STREAM_POP:
      return {
        ...state,
        didUndo: true,
        stream: deleteAt(state.stream, state.stream.length - 1),
      };

    case ActionTypes.UPDATE_FINISH:
      return {
        ...state,
        finish: payload.finish,
      };

    case ActionTypes.UPDATE_STREAM:
      return {
        ...state,
        stream: payload.stream,
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
