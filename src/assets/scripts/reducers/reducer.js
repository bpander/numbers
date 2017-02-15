import { combineReducers } from 'redux';
import cursor from 'reducers/cursor';
import numbers from 'reducers/numbers';
import stream from 'reducers/stream';
import target from 'reducers/target';


export default combineReducers({
  cursor,
  numbers,
  stream,
  target,
});
