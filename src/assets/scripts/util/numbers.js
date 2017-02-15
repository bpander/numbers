
export const randomInt = (min, max) => {
  if (max < min) {
    [ min, max ] = [ max, min ]; // eslint-disable-line no-param-reassign
  }
  const delta = max - min;
  return Math.round(Math.random() * delta + min);
};
