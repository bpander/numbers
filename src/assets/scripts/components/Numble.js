import Inferno from 'inferno';


const Numble = props => (
  <button
    className={`bubble ${(props.isDerived) ? 'bubble--secondary' : ''}`}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export default Numble;
