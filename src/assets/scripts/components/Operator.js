import Inferno from 'inferno';


const Operator = props => {
  const { disabled, onClick, type } = props;
  return (
    <button
      className="bubble bubble--tertiary bubble--small"
      disabled={disabled}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default Operator;
