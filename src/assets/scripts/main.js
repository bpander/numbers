import 'babel-polyfill';
import Inferno from 'inferno';
import { Provider } from 'inferno-redux';
import { applyMiddleware, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunkMiddleware from 'redux-thunk';
import App from 'App';
import reducer from 'reducers/reducer';

const store = createStore(enableBatching(reducer), applyMiddleware(thunkMiddleware));
const node = document.getElementById('js-app');

Inferno.options.findDOMNodeEnabled = true;

node.innerHTML = '';

window.provider = Inferno.render(
  <Provider store={store}>
    <App />
  </Provider>,
  node,
);
