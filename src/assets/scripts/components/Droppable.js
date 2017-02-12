import Inferno from 'inferno';
import Component from 'inferno-component';


export default class Droppable extends Component {

  static defaultProps = {
    data: null,
    isDragging: false,
    onDropEnter: () => {},
    onDropLeave: () => {},
  };

  aabb = null;

  isInAABB = false;

  onMouseMove = e => {
    const { clientX, clientY } = (e.type === 'touchmove') ? e.touches[0] : e;
    const { aabb } = this;
    const isInAABB = clientX > aabb.left && clientX < aabb.right
      && clientY > aabb.top && clientY < aabb.bottom;
    if (!this.isInAABB) {
      if (isInAABB) {
        this.isInAABB = isInAABB;
        this.props.onDropEnter(this);
      }
    } else {
      if (!isInAABB) {
        this.isInAABB = isInAABB;
        this.props.onDropLeave(this);
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isDragging) {
      if (nextProps.isDragging) {
        const elem = Inferno.findDOMNode(this);
        this.aabb = elem.getBoundingClientRect();
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('touchmove', this.onMouseMove);
      }
    } else {
      if (!nextProps.isDragging) {
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('touchmove', this.onMouseMove);
      }
    }
  }

  render() {
    return this.props.children(this);
  }

};
