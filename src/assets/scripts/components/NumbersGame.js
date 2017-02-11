import Inferno from 'inferno';
import Component from 'inferno-component';
import Console from 'components/Console';
import Draggable from 'components/Draggable';
import Slot from 'components/Slot';
import Tile from 'components/Tile';


export default class NumbersGame extends Component {

  render() {
    const { equations, numbers, target } = this.props;
    return (
      <div>
        <div className="typ typ--alignCenter">
          <div className="typ typ--uppercase typ--0.75x typ--inception2x">Target</div>
          <div className="vr vr--1x"></div>
          <div className="aligner aligner--alignCenter">
            <Console message={target} />
          </div>
        </div>

        <div className="vr vr--2x"></div>

        <ul className="aligner aligner--gutters">
          {numbers.map((number, i) => (
            <li className="aligner__item">
              <Slot value={number.value}>
                <Draggable>{draggable => (
                  <Tile
                    value={number.value}
                    onMouseDown={draggable.onMouseDown}
                    style={(!draggable.state.isDragging) ? null : {
                      left:   draggable.state.left,
                      top:    draggable.state.top,
                      zIndex: 1,
                    }}
                  />
                )}</Draggable>
              </Slot>
            </li>
          ))}
        </ul>

        <div className="vr vr--2x"></div>

        <ul>
          {equations.map(equation => (
            <li></li>
          ))}
          <li>
            <ul className="aligner aligner--gutters">
              <li className="aligner__item"></li>
              <li className="aligner__item"><Slot /></li>
              <li className="aligner__item">
                ÷
              </li>
              <li className="aligner__item"><Slot /></li>
              <li className="aligner__item">=</li>
              <li className="aligner__item"></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
};
