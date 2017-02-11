import Inferno from 'inferno';
import Console from 'components/Console';
import Slot from 'components/Slot';
import Tile from 'components/Tile';


export default function NumbersGame(props) {
  const { target, numbers } = props;
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
        {numbers.map(number => (
          <li className="aligner__item">
            <Slot number={number}>
              <Tile number={number} />
            </Slot>
          </li>
        ))}
      </ul>
    </div>
  );
};
