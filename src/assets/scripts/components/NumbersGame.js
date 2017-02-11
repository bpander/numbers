import Inferno from 'inferno';
import Console from 'components/Console';


export default function NumbersGame(props) {
  const { target, numbers } = props;
  return (
    <div>
      <div className="typ typ--alignCenter">
        <div className="typ typ--uppercase typ--0.75x typ--inception2x">Target</div>
        <div className="vr vr--1x"></div>
        <div style="display: inline-block;">
          <Console message={target} />
        </div>
      </div>
      <table>
        {numbers.map(number => (
          <td style={{
            border: '1px solid black',
            width: 30,
            height: 30,
            textAlign: 'center',
            verticalAlign: 'middle',
          }}>{number}</td>
        ))}
      </table>
    </div>
  );
};
