import Inferno from 'inferno';
import { ADDEND_INDEX, AUGEND_INDEX, OPERATOR_INDEX } from 'constants/StreamConstants';


const Step = props => {
  const { equation, sum } = props;
  const [ augend, operator, addend ] = equation;
  return (
    <div>
      <span>
        {equation[AUGEND_INDEX]}
      </span>
      <span>
        {equation[OPERATOR_INDEX]}
      </span>
      <span>
        {equation[ADDEND_INDEX]}
      </span>
      <span>=</span>
      <span>
        {sum}
      </span>
    </div>
  );
};

export default Step;
