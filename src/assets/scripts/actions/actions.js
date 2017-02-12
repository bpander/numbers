import * as ActionTypes from 'constants/ActionTypes';


export const placeTile = (tile, index) => (
  { type: ActionTypes.PLACE_TILE, payload: { tile, index } }
);
