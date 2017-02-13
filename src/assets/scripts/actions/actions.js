import * as ActionTypes from 'constants/ActionTypes';


export const placeTile = (tile, equation, operandIndex) => (
  { type: ActionTypes.PLACE_TILE, payload: { tile, equation, operandIndex } }
);
