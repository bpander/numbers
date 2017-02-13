import Inferno from 'inferno';
import Component from 'inferno-component';


export default class Draggable extends Component {

  static defaultProps = {
    onDragStart: () => {},
    onDragEnd: () => {},
  };

  state = {
    left: 0,
    top: 0,
  };

  offset = [ 0, 0 ];

  onMouseDown = e => {
    // Prevent text-selection or any other default behavior
    e.preventDefault();

    // Store the initial offset
    const { clientX, clientY } = (e.type === 'touchstart') ? e.touches[0] : e;
    this.offset[0] = clientX;
    this.offset[1] = clientY;

    // Start tracking the mouse movement
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
    this.props.onDragStart(this);
    this.setState({ left: 0, top: 0 });
  };

  onMouseMove = e => {
    const { clientX, clientY } = (e.type === 'touchmove') ? e.touches[0] : e;
    this.setState({
      left: clientX - this.offset[0],
      top:  clientY - this.offset[1],
    });
  };

  onMouseUp = () => {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onMouseUp);
    this.props.onDragEnd(this);
  };

  render() {
    return this.props.children(this);
  }

};
