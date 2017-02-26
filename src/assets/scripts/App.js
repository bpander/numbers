import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/actions';
import NumbersGame from 'components/NumbersGame';
import { getInventory } from 'selectors/selectors';


const mapStateToProps = state => {
  return {
    inventory: getInventory(state),
    numbers: state.numbers,
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
