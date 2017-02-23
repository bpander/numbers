import { deleteAt } from 'util/arrays';
import { isWholeNumber, solve } from 'util/numbers';


const OPERAND = '0';
const OPERATOR = '1';
const operators = [ '+', '-', '*', '/' ];

const rpnCombinations = n => {
  const combos = [];
  const recurse = (n, operandQueue = n, operatorQueue = -1, combo = '') => {
    if (operandQueue <= 0 && operatorQueue <= 0) {
      combos.push(combo);
      return;
    }
    if (operandQueue > 0) {
      recurse(n - 1, operandQueue - 1, operatorQueue + 1, combo + OPERAND);
    }
    if (operatorQueue > 0) {
      recurse(n - 1, operandQueue, operatorQueue - 1, combo + OPERATOR);
    }
  };
  recurse(n);
  return combos;
};

const solveRpn = (sequence, target) => {
  const stack = [];
  const steps = [];
  let success = false;
  for (let i = 0; i < sequence.length; i++) {
    const token = sequence[i];
    if (typeof token === 'number') {
      stack.push(token);
      continue;
    }
    const n1 = stack.pop();
    const n2 = stack.pop();
    const result = solve(token, n1, n2);
    if (!isWholeNumber(result)) {
      break;
    }
    steps.push([ n1, token, n2 ]);
    if (result === target) {
      success = true;
      break;
    }
    stack.push(result);
  }
  return { success, steps };
};

const findSolution = (numbers, target, rpnMasks) => {
  let result;

  const recurse = (numbers, mask, stack = []) => {
    if (!mask.length) {
      result = solveRpn(stack, target);
      return result.success;
    }
    const runningNumbers = [ ...numbers ];
    for (let i = 0; i < mask.length; i++) {
      const token = mask[i];
      if (token === OPERAND) {
        stack.push(runningNumbers.shift());
      } else if (token === OPERATOR) {
        return operators.some(operator => {
          return recurse(runningNumbers, mask.slice(i + 1), stack.concat(operator));
        });
      }
    }
  };

  rpnMasks.some(mask => recurse(numbers, mask));
  return result;
};

const createSolver = rpnMasks => (list, target) => {
  let result;
  const listSorted = [ ...list ].sort((a, b) => a - b);
  const recurse = (list, n, combo = []) => {
    if (!list.length) {
      result = findSolution(combo, target, rpnMasks);
      return result.success;
    }
    return list.some((n, i) => {
      const newList = deleteAt(list, i);
      return recurse(newList, n, combo.concat(n));
    });
  };
  recurse(listSorted);
  return result;
};

export { createSolver, rpnCombinations };
