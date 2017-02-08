import Inferno from 'inferno';


/**
 * Application setup
 *
 * @class App
 */
export default class App {
  constructor() {
    Inferno.render(
      <div>Welcome to the client-side boilerplate!</div>,
      document.querySelector('.js-welcome'),
    );
  }
};
