import Inferno from 'inferno';
import Component from 'inferno-component';


export default class Draggable extends Component {

  static defaultProps = {
    onDragStart: () => {},
    onDragEnd: () => {},
  };

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
    if (e.type === 'touchstart') {
      this.offset[0] = e.touches[0].clientX;
      this.offset[1] = e.touches[0].clientY;
    } else {
      this.offset[0] = e.clientX;
      this.offset[1] = e.clientY;
    }

    // Start tracking the mouse movement
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
    this.props.onDragStart();
    this.setState({ isDragging: true, left: 0, top: 0 });
  };

  onMouseMove = e => {
    let { clientX, clientY } = e;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
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
    this.props.onDragEnd();
    this.setState({ isDragging: false });
  };

  render() {
    return this.props.children(this);
  }

};
