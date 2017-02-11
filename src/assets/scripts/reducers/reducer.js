import { flatten, pullAt, times } from 'lodash';
import randomInt from 'util/randomInt';


const largeSet = [ 25, 50, 75, 100 ];
const smallSet = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10 ];
const twoBigRestSmall = () => {
  const _largeSet = [ ...largeSet ];
  const _smallSet = [ ...smallSet ];
  return flatten([
    times(2, () => pullAt(_largeSet, randomInt(0, _largeSet.length - 1))),
    times(4, () => pullAt(_smallSet, randomInt(0, _smallSet.length - 1))),
  ]);
};

const initialState = {
  equations: [],
  numbers: twoBigRestSmall(),
  target: randomInt(101, 999),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'foo':
      return { ...state, didFoo: true };
  }
  return state;
};
