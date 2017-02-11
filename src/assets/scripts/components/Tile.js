import Inferno from 'inferno';
import Component from 'inferno-component';


export default function Tile(props) {
  const { value, className = '', ...rest } = props;
  return (
    <div className={`tile ${className}`} {...rest}>
      <div className="tile__content">
        {value}
      </div>
    </div>
  );
}
