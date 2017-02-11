import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions';
import NumbersGame from 'components/NumbersGame';


const mapStateToProps = state => {
  return {
    dragIndex: state.dragIndex,
    equations: state.equations,
    numbers: state.numbers,
    target: state.target,
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  onMouseUp = () => {
    this.props.actions.stopDrag();
  };

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
  }

  render() {
    const { actions, dragIndex, equations, numbers, target } = this.props;
    return (
      <div className="wrap">
        <div className="well well--2x">
          <NumbersGame {...{ actions, dragIndex, equations, numbers, target }} />
        </div>
      </div>
    );
  }
};
