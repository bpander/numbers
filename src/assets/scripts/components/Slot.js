import Inferno from 'inferno';


export default function Slot(props) {
  return (
    <div className="slot">
      <div className="slot__content">
        {props.number}
      </div>
      <div className="slot__other">
        {props.children}
      </div>
    </div>
  );
};
