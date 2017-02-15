import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions';
import NumbersGame from 'components/NumbersGame';


const mapStateToProps = state => {
  return {
    cursor: state.cursor,
    numbers: state.numbers,
    stream: state.stream,
    target: state.target,
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  render() {
    const { actions, cursor, numbers, stream, target } = this.props;
    return (
      <div className="wrap">
        <div className="well well--2x">
          <NumbersGame {...{ actions, cursor, numbers, stream, target }} />
        </div>
      </div>
    );
  }
};
