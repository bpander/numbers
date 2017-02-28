import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';
import NumbersGame from 'components/NumbersGame';
import { getInventory, getPointSummary } from 'selectors/selectors';
import { last } from 'util/arrays';


const mapStateToProps = state => {
  const inventory = getInventory(state);
  return {
    inventory,
    hasGivenUp: state.hasGivenUp,
    numbers: state.numbers,
    pointSummary: (last(inventory) === state.target) ? getPointSummary(state) : null,
    score: state.score,
    showRulesPrompt: state.showRulesPrompt,
    solution: state.solution,
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
    const { showRulesPrompt, ...rest } = this.props;
    return (
      <div className="wrap">

        <div className={`toast ${(showRulesPrompt) ? 'toast--popped' : ''}`}>
          <div className="tier tier--error">
            <div className="well well--2x">
              <div className="typ typ--alignCenter typ--lightest">
                Only whole numbers are allowed.
              </div>
            </div>
          </div>
        </div>

        <div className="well well--2x">
          <NumbersGame {...rest} />
        </div>
      </div>
    );
  }
};
