import Inferno from 'inferno';


export default function NumbersGame(props) {
  const { target, numbers } = props;
  return (
    <div>
      Target: <span style="font-size: 24px;">{target}</span>
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
