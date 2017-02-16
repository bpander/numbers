import Inferno from 'inferno';
import Component from 'inferno-component';

import Console from 'components/Console';
import Numble from 'components/Numble';
import Operator from 'components/Operator';
import Step from 'components/Step';

import * as OperatorTypes from 'constants/OperatorTypes';
import { BIT_DEPTH, AUGEND_INDEX, OPERATOR_INDEX, ADDEND_INDEX } from 'constants/StreamConstants';
import { times } from 'util/arrays';
import { isWholeNumber, solver } from 'util/numbers';
import { getLocalIndex } from 'util/streams';


export default class NumbersGame extends Component {

  onNumbleClick = index => () => {
    const { cursor, inventory, stream } = this.props;
    const oIndex = getLocalIndex(cursor, BIT_DEPTH);
    if (oIndex === ADDEND_INDEX) {
      const operator = stream[cursor - (ADDEND_INDEX - OPERATOR_INDEX)];
      if (operator === OperatorTypes.DIV) {
        const augend = inventory[stream[cursor - (ADDEND_INDEX - AUGEND_INDEX)]];
        const addend = inventory[index];
        const solution = solver(operator, augend, addend);
        if (!isWholeNumber(solution)) {
          this.props.actions.showRulesPrompt();
          return;
        }
      }
    }
    this.props.actions.insertAtCursor(index);
  };

  onOperatorClick = operator => () => {
    this.props.actions.insertAtCursor(operator);
  };

  render() {
    const { actions, cursor, inventory, numbers, stream, target } = this.props;
    const oIndex = getLocalIndex(cursor, BIT_DEPTH);
    const isOperatorIndex = oIndex === OPERATOR_INDEX;

    return (
      <div>
        <div className="typ typ--alignCenter">
          <div className="typ typ--uppercase typ--0.75x typ--inception2x">Make this</div>
          <div className="vr vr--1x"></div>
          <div className="aligner aligner--alignCenter">
            <Console message={target} />
          </div>
        </div>

        <div className="vr vr--4x"></div>
        <div className="typ typ--alignCenter typ--uppercase typ--0.75x typ--inception2x">
          With these
        </div>
        <div className="vr vr--2x"></div>

        <ul className="aligner">
          {inventory.map((number, i) => {
            if (stream.includes(i)) {
              return;
            }
            return (
              <li>
                <Numble
                  value={number}
                  disabled={isOperatorIndex}
                  isDerived={i >= numbers.length}
                  onClick={this.onNumbleClick(i)}
                />
              </li>
            );
          })}
        </ul>
        <ul className="aligner aligner--alignCenter aligner--gutters">
          {Object.values(OperatorTypes).map(operator => (
            <li>
              <Operator
                type={operator}
                disabled={!isOperatorIndex}
                onClick={this.onOperatorClick(operator)}
              />
            </li>
          ))}
        </ul>

        <div className="vr vr--2x"></div>

        <ul>
          {times(Math.ceil((stream.length + 1) / BIT_DEPTH), i => {
            const start = i * BIT_DEPTH;
            const equation = stream.slice(start, start + BIT_DEPTH);
            equation[AUGEND_INDEX] = inventory[equation[AUGEND_INDEX]];
            equation[ADDEND_INDEX] = inventory[equation[ADDEND_INDEX]];
            return (
              <li>
                <Step equation={equation} sum={inventory[numbers.length + i]} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
