import Inferno from 'inferno';


export default function Slot(props) {
  const { className = '', value, children, ...rest } = props;
  return (
    <div className={`slot ${className}`} {...rest}>
      <div className="slot__content">
        {value}
      </div>
      <div className="slot__other">
        {children}
      </div>
    </div>
  );
};
