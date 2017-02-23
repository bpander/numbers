import * as OperatorTypes from 'constants/OperatorTypes';


export const isWholeNumber = n => {
  return n === Math.trunc(n);
};

export const randomInt = (min, max) => {
  if (max < min) {
    [ min, max ] = [ max, min ]; // eslint-disable-line no-param-reassign
  }
  const delta = max - min;
  return Math.round(Math.random() * delta + min);
};

export const solve = (operator, n1, n2) => {
  switch (operator) {
    case OperatorTypes.ADD: return n1 + n2;
    case OperatorTypes.SUB: return n1 - n2;
    case OperatorTypes.MUL: return n1 * n2;
    case OperatorTypes.DIV: return n1 / n2;
    default:
      throw new Error(`Unknown operator type: ${operator}`);
  }
};
