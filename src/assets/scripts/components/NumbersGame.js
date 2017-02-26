import Inferno from 'inferno';
import Component from 'inferno-component';

import Console from 'components/Console';
import Modal from 'components/Modal';
import Numble from 'components/Numble';
import Operator from 'components/Operator';
import Step from 'components/Step';

import * as OperatorTypes from 'constants/OperatorTypes';
import { BIT_DEPTH, AUGEND_INDEX, OPERATOR_INDEX, ADDEND_INDEX } from 'constants/StreamConstants';
import { chunk, times } from 'util/arrays';
import { isWholeNumber, solve } from 'util/numbers';
import { getLocalIndex } from 'util/streams';


export default class NumbersGame extends Component {

  state = {
    hasGivenUp: false,
  };

  componentWillReceiveProps(nextProps) {
    const isNewGame = this.props.numbers !== nextProps.numbers;
    if (isNewGame) {
      this.setState({ hasGivenUp: false });
    }
  }

  onGiveUpClick = () => {
    this.setState({ hasGivenUp: true });
  };

  onStartClick = () => {
    this.props.actions.getNewNumbers();
  };

  onStartOverClick = () => {
    this.props.actions.startOver();
  };

  onNumbleClick = index => () => {
    const { cursor, inventory, stream } = this.props;
    const tokenIndex = getLocalIndex(cursor, BIT_DEPTH);
    if (tokenIndex === ADDEND_INDEX) {
      const operator = stream[cursor - (ADDEND_INDEX - OPERATOR_INDEX)];
      if (operator === OperatorTypes.DIV) {
        const augend = inventory[stream[cursor - (ADDEND_INDEX - AUGEND_INDEX)]];
        const addend = inventory[index];
        const solution = solve(operator, augend, addend);
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

  onUndoClick = () => {
    this.props.actions.deleteAtCursor();
  };

  getSteps() {
    if (this.state.hasGivenUp) {
      return this.props.solution;
    }
    let head; // Force a cursor at the end of the stream
    const { inventory, stream } = this.props;
    const steps = chunk(stream.concat(head), BIT_DEPTH).map(step => {
      return [
        inventory[step[AUGEND_INDEX]],
        step[OPERATOR_INDEX],
        inventory[step[ADDEND_INDEX]],
      ];
    });
    return steps;
  }

  renderBoard() {
    const { actions, cursor, inventory, numbers, stream, target } = this.props;
    const { hasGivenUp } = this.state;
    const tokenIndex = getLocalIndex(cursor, BIT_DEPTH);
    const isOperatorIndex = tokenIndex === OPERATOR_INDEX;
    const steps = this.getSteps();
    const cursorClassName = 'table__cell--underscore';

    return (
      <div>
        <div className="typ typ--alignCenter">
          <div className="typ typ--uppercase typ--0.75x typ--inception2x">Make this</div>
          <div className="vr vr--1x"></div>
          <div className="aligner aligner--alignCenter">
            <button disabled={hasGivenUp} onClick={this.onUndoClick}>undo</button>
            <Console message={target} />
            <button disabled={hasGivenUp} onClick={this.onStartOverClick}>start over</button>
          </div>
        </div>

        <div className="vr vr--4x"></div>
        <div className="typ typ--alignCenter typ--uppercase typ--0.75x typ--inception2x">
          With this
        </div>
        <div className="vr vr--1x"></div>

        <ul className="aligner">
          {inventory.map((number, i) => {
            if (stream.includes(i)) {
              return;
            }
            return (
              <li>
                <Numble
                  value={number}
                  disabled={isOperatorIndex || hasGivenUp}
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
                disabled={!isOperatorIndex || hasGivenUp}
                onClick={this.onOperatorClick(operator)}
              />
            </li>
          ))}
        </ul>

        <div className="vr vr--2x"></div>

        <table className="table">
          {steps.map((step, i) => {
            const start = i * BIT_DEPTH;
            const result = (!step.includes(undefined))
              ? solve(
                step[OPERATOR_INDEX],
                step[AUGEND_INDEX],
                step[ADDEND_INDEX],
              )
              : NaN;
            return (
              <tr key={i}>
                {step.map((token, j) => (
                  <td className={`
                    table__cell--small
                    ${(start + j === cursor && !hasGivenUp) ? cursorClassName : ''}
                  `}>
                    {token}
                  </td>
                ))}
                <td>{(!isNaN(result)) && `= ${result}`}</td>
              </tr>
            );
          })}
        </table>

        <div>
          {(this.state.hasGivenUp) ? (
            <button onClick={this.onStartClick}>New game</button>
          ) : (
            <button onClick={this.onGiveUpClick}>Give up</button>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.props.numbers.length < 1) {
      return <button onClick={this.onStartClick}>start</button>;
    }
    const { inventory, target } = this.props;
    return (
      <div>
        {(inventory[inventory.length - 1] === target) && (
          <Modal>
            <div className="card">
              <div className="well well--2x">
                <div>You did it!</div>
                <div className="vr vr--2x"></div>
                <button onClick={this.onStartClick}>
                  Keep going
                </button>
              </div>
            </div>
          </Modal>
        )}
        {this.renderBoard()}
      </div>
    );
  }
};
