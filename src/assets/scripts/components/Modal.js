import Inferno from 'inferno';


export default function Modal(props) {
  return (
    <div className="overlay">
      <div className="aligner aligner--fillHeight aligner--alignCenter">
        {props.children}
      </div>
    </div>
  );
};
