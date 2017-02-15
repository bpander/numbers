import Inferno from 'inferno';


const Numble = props => (
  <div className="bubble" onClick={props.onClick}>
    {props.value}
  </div>
);

export default Numble;
