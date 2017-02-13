import * as ActionTypes from 'constants/ActionTypes';


const initialState = [
  [ null, null, '+' ],
];

export default function equations(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case ActionTypes.PLACE_TILE: {
      const equationIndex = Math.floor(payload.index / 2);

      return state.map(equation => {
        const currentIndex = equation.indexOf(payload.tile);
        if (currentIndex > -1) {
          equation.splice(currentIndex, 1, null);
        }
        if (equation === payload.equation) {
          equation.splice(payload.operandIndex, 1, payload.tile);
        }
        return equation;
      });
    }
  }
  return state;
};
