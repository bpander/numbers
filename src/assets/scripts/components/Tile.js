import Inferno from 'inferno';
import Component from 'inferno-component';


export default function Tile(props) {
  return (
    <div className="tile">
      <div className="tile__content">
        {props.number}
      </div>
    </div>
  );
}
