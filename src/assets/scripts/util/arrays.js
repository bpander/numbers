import { noop } from 'util/functions';


export const flatten = (array = []) => {
  return array.reduce((flattenedArray, childArray) => {
    return [ ...flattenedArray, ...childArray ];
  }, []);
};

export const pullAt = (array = [], index = 0) => {
  return array.splice(index, 1)[0];
};

export const times = (n = 0, mapFn = noop) => {
  return Array.from(Array(n)).map((x, i) => mapFn(i));
};
