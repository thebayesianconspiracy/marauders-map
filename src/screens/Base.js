import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
const _ = require('lodash');

class Base extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const username = this.props.login.get('username');
    return (
      <div>
        Yoyo logged in {username}
        <Link to="/addlots">Add lots</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Base);
