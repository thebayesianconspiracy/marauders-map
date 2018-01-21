import React, { Component } from 'react';
import { connect } from 'react-redux';
const _ = require('lodash');

class Base extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const username = this.props.login.get('username');
    return (<div>Yoyo logged in {username}</div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Base);
