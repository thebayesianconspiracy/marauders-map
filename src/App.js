import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Signup from './screens/Signup';

import utils from './Utils.js'

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  }
}

export default App;
