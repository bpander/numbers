import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions';

const mapStateToProps = state => {
  return { didFoo: state.didFoo };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {

  componentDidMount() {
    setTimeout(() => this.props.actions.foo(), 500);
  }

  render() {
    const { didFoo } = this.props;
    return (
      <div>
        Welcome to the client-side boilerplate!
        {(didFoo) && (
          <div>Redux is working!</div>
        )}
      </div>
    );
  }
};
