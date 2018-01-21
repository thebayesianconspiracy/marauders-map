import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import _ from 'lodash';

import { getLots } from '../actions/lots';

class Base extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getLots());
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
