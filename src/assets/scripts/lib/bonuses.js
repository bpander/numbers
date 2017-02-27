import * as PointValues from 'constants/PointValues';


export const base = (runningTotal, state) => PointValues.BASE;

export const noUndos = (runningTotal, state) => (state.didUndo) ? 0 : PointValues.NO_UNDOS;

export const usedAll = (runningTotal, state) => {
  const didUseAll = true;
  return (didUseAll) ? PointValues.USED_ALL : 0;
};

export const difficulty = (runningTotal, state) => {
  switch (state.difficulty) {
    // TODO: Other difficulty modifiers go here
    default: return runningTotal * 0.2;
  }
};

export const speed = (runningTotal, state) => {
  const { start, finish } = state;
  return 1 / (finish - start) * 1000;
};
