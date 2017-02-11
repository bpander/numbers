import * as ActionTypes from 'constants/ActionTypes';


export const startDrag = index => ({ type: ActionTypes.START_DRAG, payload: { index } });
export const stopDrag = () => ({ type: ActionTypes.STOP_DRAG });
