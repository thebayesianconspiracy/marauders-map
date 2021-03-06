import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Root from './screens/Root';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
