import Inferno from 'inferno';
import * as BonusTypes from 'constants/BonusTypes';
import { REGULAR_DIFFICULTY_MODIFIER } from 'constants/PointValues';


export const readableBonusType = bonusType => {
  switch (bonusType) {
    case BonusTypes.BASE: return 'Bullseye';
    case BonusTypes.NO_UNDOS: return 'No mistakes';
    case BonusTypes.USED_ALL: return 'Used all numbers';
    case BonusTypes.DIFFICULTY: return `Difficulty (${REGULAR_DIFFICULTY_MODIFIER + 1}x)`;
    case BonusTypes.SPEED: return 'Speed';
  }
};

export default function PointSummary(props) {
  return (
    <table className="table">
      {props.lines.map(line => (
        <tr>
          <td>
            {(line.amount > 0) ? `✓` : `✗`}
          </td>
          <td>{readableBonusType(line.type)}</td>
          <td>
            <div className="typ typ--alignRight">
              {line.amount}
            </div>
          </td>
        </tr>
      ))}
      <tr>
        <td></td>
        <td>TOTAL</td>
        <td>{props.total}</td>
      </tr>
    </table>
  );
};
