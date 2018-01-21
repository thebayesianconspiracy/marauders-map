import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Root from './screens/Root';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Root} />
        </Router>
      </Provider>
    );
  }
}

export default App;
