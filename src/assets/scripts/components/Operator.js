import Inferno from 'inferno';
import { ADD, SUB, MUL, DIV } from 'constants/OperatorTypes';


const getGlyph = type => {
  switch (type) {
    case ADD: return '+';
    case SUB: return '−';
    case MUL: return '×';
    case DIV: return '÷';
  }
};

const Operator = props => {
  const { disabled, onClick, type } = props;
  return (
    <button
      className="bubble bubble--tertiary bubble--small"
      disabled={disabled}
      onClick={onClick}
    >
      {getGlyph(type)}
    </button>
  );
};

export default Operator;
