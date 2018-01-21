import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import _ from 'lodash';

import utils from '../actions/utils';

import { getLots } from '../actions/lots';

const userinfoStyle = {
  'text-align' : 'left',
  'margin-left': '20px',
  'margin-top': '20px'
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
  flex: 1,
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
    const username = this.props.login.get('username');
    const address = admin.address;
    this.props.dispatch(getLots(address));
    this.props.dispatch(utils.getUserInfo(username));
  }
  
  render() {
    const userInfo = this.props.login.toJS().data || {};
    const lots = this.props.lots.get('lots');
    const userDiv = _.isEmpty(userInfo) ? null : (
      <div style={userinfoStyle}>
        <pre>
          Welcome back, {userInfo.entityName}<br/>
          Farmer Type, {userInfo.entityType}
        </pre>
      </div>
    );
    
    
    const lotData = _.map(lots, lot => (
      <div>
        Lot location: {lot.location}, date: {_.toString(new Date(lot.created))}
      </div>
    ));
    return (
      <div style={rootStyle}>
        <div style={{textAlign: 'right', marginRight: '10px'}}>
          <Link style={{marginBottom: '10px', display: 'block', color: 'blue', fontSize: '20px', textDecoration: 'none'}} to="/addlots">Add lots</Link>
          <a style={{marginBottom: '10px', display: 'block', color: 'blue', fontSize: '20px', textDecoration: 'none'}} href="http://192.168.0.161:5609">Farmer Intelligence</a>
          <Link style={{marginBottom: '10px', display: 'block', color: 'blue', fontSize: '20px', textDecoration: 'none'}} to="/Add Bids">Add bids</Link>
        </div>
        <div style={{nav}}>
          {userDiv}
        </div>
        <div style={lotRoot}>
          <h2>List of Lots</h2>
          <div style={lotDataStyle}>
            {lotData}
          </div>
          <div style={Object.assign({}, userinfoStyle)}>
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
