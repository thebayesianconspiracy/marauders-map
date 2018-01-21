import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import history from '../history';
import Signup from './Signup';
import Base from './Base';
import LotAdd from './LotAdd';

function requireAuth(username, nextState, replace) {
  if (_.isEmpty(username)) {
    replace({
      pathname: '/login'
    });
  }
}


function requireNoAuth(username, nextState, replace) {
  if (!_.isEmpty(username)) {
    replace({
      pathname: '/'
    });
  }
}


class Root extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const username = this.props.login.get('username');

    return (
      <Router history={history}>
        <Route path="/login" component={Signup} onEnter={requireNoAuth.bind(this, username)} /> 
        <Route path="/" component={Base} onEnter={requireAuth.bind(this, username)} />
        <Route path="/addlots" component={LotAdd} onEnter={requireAuth.bind(this, username)} />
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Root);
