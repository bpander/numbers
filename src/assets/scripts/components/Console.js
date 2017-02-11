import Inferno from 'inferno';


export default function Console(props) {
  return (
    <div className="console">
      <div className="well well--3x">
        <div className="typ typ--2x typ--alignCenter">
          {props.message}
        </div>
      </div>
    </div>
  );
};
