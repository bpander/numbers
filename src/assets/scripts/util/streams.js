
export const getLocalIndex = (globalIndex, bitsPerElement) => {
  const elementIndex = Math.trunc(globalIndex / bitsPerElement);
  return globalIndex - (elementIndex * bitsPerElement);
};
