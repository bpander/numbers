import Inferno from 'inferno';


const Numble = props => (
  <div
    className={`bubble ${(props.isDerived) ? 'bubble--secondary' : ''}`}
    onClick={props.onClick}
  >
    {props.value}
  </div>
);

export default Numble;
