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

const entityTypeImages = {
  1: "https://lh4.googleusercontent.com/Gq4YdQzTGszaJUj7SPpJbwKtb_azZAdDag8lCud1t1ymQCSVflIlKYgfON4LJn1auiRkRT2iWZzZaMq4Jleq=w3360-h1818",
}

const farmerTypeImages = {
  1: "https://lh3.googleusercontent.com/KC-PSCuwK_Qv_k-Eu_NWh1Tfy1SPhs7XrjqLtVLq81J3-JU6Vxqt4QqizIJ2qBpy6HReCW4a3ycZ4o9BAeQP=w3360-h1818",
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
      <div>
        Lot location: {lot.location}, date: {_.toString(new Date(lot.created))}
      </div>
    ));
    return (
      <div style={rootStyle}>
        <div style={{textAlign: 'right', marginRight: '10px'}}>
          Welcome back, {userInfo.entityName}</div>
      <div>
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
