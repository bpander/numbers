import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import { flatten, pullAt, times } from 'lodash';
import * as actions from './actions/actions';
import NumbersGame from 'components/NumbersGame';
import randomInt from 'util/randomInt';


const mapStateToProps = state => {
  return { didFoo: state.didFoo };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

const _largeSet = [ 25, 50, 75, 100 ];
const _smallSet = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10 ];
const twoBigRestSmall = () => {
  const largeSet = [ ..._largeSet ];
  const smallSet = [ ..._smallSet ];
  return flatten([
    times(2, () => pullAt(largeSet, randomInt(0, largeSet.length - 1))),
    times(4, () => pullAt(smallSet, randomInt(0, smallSet.length - 1))),
  ]);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  state = {
    numbers:  twoBigRestSmall(),
    target:   randomInt(101, 999),
  };

  render() {
    const { numbers, target } = this.state;
    return (
      <div className="wrap">
        <div className="well well--2x">
          <NumbersGame numbers={numbers} target={target} />
        </div>
      </div>
    );
  }
};
