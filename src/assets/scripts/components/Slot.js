import Inferno from 'inferno';


export default function Slot(props) {
  return (
    <div className="slot">
      {props.children}
    </div>
  );
};
