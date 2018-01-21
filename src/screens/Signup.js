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

const formRoot = {
  'flexDirection': "row",
  'justify-content': "center",
  'alignItems': "center",
  display: "flex"
};

const inputStyle = {
  width: '340px',
  height: '30px',
  'border-radius': '6px',
  margin: '8px',
  'font-size': '18px'
};

const form = {
  'borderWidth': 1,
  'flexDirection': "column",
  'justify-content': "center",
  'alignItems': "center",
  display: "flex"
};


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
      <div style={formRoot}>
        <LocalForm
            style={form}
            onUpdate={(form) => this.handleUpdate(form)}
            onChange={(values) => this.handleChange(values)}
            onSubmit={(values) => this.handleSubmit(values)}
        >
          <Control.text style={inputStyle} placeholder="username" model=".username" />
          <Control.text style={inputStyle} placeholder="password" model=".password" />
          <Control.text style={inputStyle} placeholder="entityType" defaultValue="Farmer" model=".entityType" />
          <Control.text style={inputStyle} placeholder="farmerType" defaultValue="Organic" model=".farmerType" />
          <button style={inputStyle} >Submit</button>
        </LocalForm>
      </div>
    );
  }
}

export default connect()(Signup);
