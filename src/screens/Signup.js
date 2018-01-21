import React, { Component } from 'react';
import store from '../store';
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { login } from '../actions/login';
import { Router, Route, browserHistory, Link } from 'react-router';


function isLoggedIn() {
  const username = store.getState().login.username || localStorage.username;
  return !_.isEmpty(username);
}


class Signup extends React.Component {
  
  handleChange(values) {
    
  }
  
  handleUpdate(form) {
    
  }
  
  handleSubmit(values) {
    this.props.dispatch(login(values));
  }

  componentDidMount() {
    if (isLoggedIn()) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      browserHistory.replace("/")
    }
  }

  componentWillReceiveProps() {
    if (isLoggedIn()) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      browserHistory.replace("/")
    }
  }
  
  render() {
    return (
      <LocalForm
          style={[styles.form]}
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
      >
        <Control.text placeholder="username" model=".username" />
        <Control.text placeholder="password" model=".password" />
        <Control.text placeholder="entityType" defaultValue="Farmer" model=".entityType" />
        <Control.text placeholder="farmerType" defaultValue="Organic" model=".farmerType" />
        <button>Submit!</button>
      </LocalForm>
    );
  }
}

const styles = {
  form: {
    
  }
};

export default connect()(Signup);
