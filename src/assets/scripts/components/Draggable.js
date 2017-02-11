import Inferno from 'inferno';
import Component from 'inferno-component';


export default class Draggable extends Component {

  state = {
    isDragging: false,
    left: 0,
    top: 0,
  };

  offset = [ 0, 0 ];

  onMouseDown = e => {
    // Prevent text-selection or any other default behavior
    e.preventDefault();

    // Store the initial offset
    this.offset[0] = e.clientX;
    this.offset[1] = e.clientY;

    // Start tracking the mouse movement
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    this.setState({ isDragging: true });
  };

  onMouseMove = e => {
    this.setState({
      left: e.clientX - this.offset[0],
      top:  e.clientY - this.offset[1],
    });
  };

  onMouseUp = () => {
    window.removeEventListener('mousemove', this.onMouseMove);
    this.setState({ isDragging: false });
  };

  render() {
    return this.props.children(this);
  }

};
