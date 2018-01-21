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
    const admin = this.props.login.get('admin');
    const address = admin.address;
    this.props.dispatch(getLots(address));
  }
  
  render() {
    const username = this.props.login.get('username');
    const lots = this.props.lots.get('lots');
    console.log('lots are', lots);
    const lotData = _.map(lots, lot => (
      <div>
      Lot location: {lot.location}, date: {_.toString(new Date(lot.created))}
      </div>
    ));
    return (
      <div>
        Welcome back, {username}
        {lotData}
        <Link to="/addlots">Add lots</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
    lots: state.lots
  }
}

export default connect(mapStateToProps)(Base);
