import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import _ from 'lodash';

import { getLots } from '../actions/lots';

const userinfo = {
  'text-align' : 'right'
};

const lotDataStyle = {
  flex: 1,
  display: 'inline-block'
};

const lotRoot = {
  'flex-direction': 'row',
  flex: 1,
  'align-items': 'center',
  'justify-content': 'center',
  display: 'inline-block',
  'margin-left': '60px',
}

const rootStyle = {
  'flex-direction': 'column',
  flex: 1
};

const nav = {
  'height' : '20px' ,
  'width' : '100%',
  'background' : '#27ae60'
}

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
      <div style={rootStyle}>
        <div style={{nav}}>
          <div style={userinfo}>
              Welcome back, {username}
          </div>
        </div>
        <Link style={{display: 'block'}} to="/addlots">Add lots</Link>
        <div style={lotRoot}>
          <div style={lotDataStyle}>
            {lotData}
          </div>
          <div style={Object.assign({}, userinfo)}>
            
          </div>
        </div>
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
