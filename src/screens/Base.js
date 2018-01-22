import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import _ from 'lodash';

import utils from '../actions/utils';

import { getLots } from '../actions/lots';
import { getBids } from '../actions/bids';


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

const entityTypeImages = {
  1: "https://image.ibb.co/j7UvTb/farmer1.png",
}

const farmerTypeImages = {
  1: "https://image.ibb.co/etf28b/organic.png",
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
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
    this.props.dispatch(getBids(address));
    this.props.dispatch(utils.getUserInfo(username));
  }

  render() {
    const userInfo = this.props.login.toJS().data || {};
    const lots = this.props.lots.get('lots');
    const bids = this.props.login.get('bids') || [];
    console.log('bids are', bids);
    const textStyle = {
      position: 'relative',
      top: '15px',
      fontSize : '25px'
    };
    const imgSize = 150;
    const userDiv = _.isEmpty(userInfo) ? null : (
      <div style={userinfoStyle}>
        <pre>
          <div style={{flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column'}}> <br/>
            <div style={{position:'absolute',top:200,right:250}}> <p style={textStyle}>Entity type</p> <img height={imgSize} width={imgSize} src={entityTypeImages[userInfo.entityType]} /> </div> <br/>
            <div style={{position:'absolute',top:200,right:20}}> <p style={textStyle}>Farmer Type </p> <img height={imgSize} width={imgSize} src={farmerTypeImages[userInfo.farmerType]} /></div>
          </div>
        </pre>
      </div>
    );

    const lotData = _.map(lots, lot => (
      <tr>
        <td style={{borderWidth: '1px', border: 'solid', padding: '5px'}}>Lot location: {lot.location}, date: {formatDate(new Date(lot.created))}</td>
      </tr>
    ));
    return (
      <div style={rootStyle}>
        <div style={{textAlign: 'right', marginRight: '10px'}}>
          Welcome back, {userInfo.entityName}</div>
      <div>
          <Link style={{marginBottom: '10px', display: 'block', color: 'white', marginLeft: 20, background: '#333333', padding: '10px', width: 200, borderRadius: 5, textAlign: 'center', fontSize: '20px', textDecoration: 'none'}} to="/addlots">Add lots</Link>
          <a style={{marginBottom: '10px', display: 'block', color: 'white', marginLeft: 20, background: '#333333', padding: '10px', width: 200, borderRadius: 5, textAlign: 'center', fontSize: '20px', textDecoration: 'none'}} href="http://127.0.0.1:5609">Farmer Intelligence</a>
          <Link style={{marginBottom: '10px', display: 'block', color: 'white', marginLeft: 20, background: '#333333', padding: '10px', width: 200, borderRadius: 5, textAlign: 'center', fontSize: '20px', textDecoration: 'none'}} to="/addbids">Add bids</Link>
        </div>
        <div style={{nav}}>
          {userDiv}
        </div>
        <div style={lotRoot}>
          <h2>List of Lots</h2>
          <div style={lotDataStyle}>
          <table>
            {lotData}
          </table>
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
