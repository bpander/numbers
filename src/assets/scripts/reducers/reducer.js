import { combineReducers } from 'redux';
import equations from 'reducers/equations';
import target from 'reducers/target';
import tiles from 'reducers/tiles';


export default combineReducers({
  equations,
  target,
  tiles,
});
