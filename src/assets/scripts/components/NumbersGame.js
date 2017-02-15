import Inferno from 'inferno';
import Component from 'inferno-component';
import Console from 'components/Console';
import Numble from 'components/Numble';


export default class NumbersGame extends Component {

  render() {
    const { cursor, numbers, stream, target } = this.props;

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
                <Numble value={number} />
              </li>
            );
          })}
        </ul>

        <div className="vr vr--2x"></div>

        <ul>
          {/* equations */}
        </ul>
      </div>
    );
  }
};
