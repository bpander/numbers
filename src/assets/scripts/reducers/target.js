import randomInt from 'util/randomInt';


const initialState = randomInt(101, 999);

export default function target(state = initialState, action) {
  return state;
};
