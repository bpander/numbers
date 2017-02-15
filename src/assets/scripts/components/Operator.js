import Inferno from 'inferno';


const Operator = props => {
  const { onClick, type } = props;
  return (
    <div onClick={onClick} className="bubble bubble--tertiary bubble--small">{type}</div>
  );
};

export default Operator;
