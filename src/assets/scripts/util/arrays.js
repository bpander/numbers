import { noop } from 'util/functions';


export const chunk = (array = [], size = 1) => {
  return times(Math.ceil(array.length / size), i => {
    const start = i * size;
    return array.slice(start, start + size);
  });
};

export const deleteAt = (array = [], index, quantity = 1) => {
  const copy = [ ...array ];
  copy.splice(index, quantity);
  return copy;
};

export const flatten = (array = []) => {
  return array.reduce((flattenedArray, childArray) => {
    return [ ...flattenedArray, ...childArray ];
  }, []);
};

export const insertAt = (array = [], index, ...values) => {
  const copy = [ ...array ];
  copy.splice(index, 0, ...values);
  return copy;
};

export const last = (array = []) => {
  return array[array.length - 1];
};

export const pullAt = (array = [], index = 0) => {
  return array.splice(index, 1)[0];
};

export const times = (n = 0, mapFn = noop) => {
  return Array.from(Array(n)).map((x, i) => mapFn(i));
};
