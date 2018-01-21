import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import Signup from './Signup';
import Router from './Router';
const _ = require('lodash');

class Root extends React.Component {

  constructor(props) {
    super(props);
  }
  
  handleChange(values) {
    
  }
  
  handleUpdate(form) {
    
  }
  
  handleSubmit(values) {
    console.log('values are', values);
  }
  
  render() {
    const username = this.props.login.get('username');
    return _.isEmpty(username) ? (
      <Signup />
    ) : <Router />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Root);
