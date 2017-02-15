import Inferno from 'inferno';
import Component from 'inferno-component';

import Console from 'components/Console';
import Numble from 'components/Numble';
import Operator from 'components/Operator';
import Step from 'components/Step';

import * as OperatorTypes from 'constants/OperatorTypes';
import { BIT_DEPTH } from 'constants/StreamConstants';
import { times } from 'util/arrays';


export default class NumbersGame extends Component {

  onNumbleClick = index => () => {
    this.props.actions.insertAtCursor(index);
  };

  onOperatorClick = operator => () => {
    this.props.actions.insertAtCursor(operator);
  };

  render() {
    const { actions, cursor, numbers, stream, target } = this.props;

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

        <ul className="aligner aligner--justified">
          {numbers.map((number, i) => {
            return (
              <li>
                <Numble value={number} onClick={this.onNumbleClick(i)} />
              </li>
            );
          })}
        </ul>
        <ul className="aligner aligner--alignCenter aligner--gutters">
          {Object.values(OperatorTypes).map(operator => (
            <li>
              <Operator type={operator} onClick={this.onOperatorClick(operator)} />
            </li>
          ))}
        </ul>

        <div className="vr vr--2x"></div>

        <ul>
          {times(Math.ceil((stream.length + 1) / BIT_DEPTH), i => {
            const start = i * BIT_DEPTH;
            const equation = stream.slice(start, start + BIT_DEPTH);
            equation[0] = numbers[equation[0]];
            equation[2] = numbers[equation[2]];
            return (
              <li>
                <Step equation={equation} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
