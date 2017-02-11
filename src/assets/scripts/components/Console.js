import Inferno from 'inferno';


export default function Console(props) {
  return (
    <div className="console">
      <div className="typ typ--2x">
        {props.message}
      </div>
    </div>
  );
};
