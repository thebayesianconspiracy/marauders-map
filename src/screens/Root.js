import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import store from '../store';
import history from '../history';
import Signup from './Signup';
import Base from './Base';
import Retailer from './Retailer';
import Track from './Track';
import OrderTrackPage from './OrderTrackPage';
import LotAdd from './LotAdd';
import BidAdd from './BidAdd';

import { Router, Route, browserHistory, Link } from 'react-router';

function isLoggedIn() {
  const username = store.getState().login.username  || localStorage.username;
  return !_.isEmpty(username);
}

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {

    if (!isLoggedIn()) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      browserHistory.replace("/login")
    }
  }

  componentWillReceiveProps() {

    if (!isLoggedIn()) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      browserHistory.replace("/login")
    }
  }

  render() {
    if (isLoggedIn()) {
      return this.props.children
    } else {
      return null
    }
  }
}



export default class Root extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Router history={history}>
        <Route path="/login" component={Signup} />
        <Route path="/track" component={Track} />
        <Route path="/retailer" component={Retailer} />
        <Route path="/ordertrack" component={OrderTrackPage} />
        <Route component={EnsureLoggedInContainer}>
          <Route path="/" component={Base} />
          <Route path="/addlots" component={LotAdd} />
          <Route path="/addbids" component={BidAdd} />

        </Route>
      </Router>
    );
  }
}
