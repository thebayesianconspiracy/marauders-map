import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import _ from 'lodash';
import Modal from 'react-modal';
import { LocalForm, Control } from 'react-redux-form';

import utils from '../actions/utils';

import { getLots } from '../actions/lots';
import { getBids } from '../actions/bids';


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
    this.values = {};
    this.state = {
      showAddSale: false,
    };
  }

  getModal(data, state) {
    const closeFn = () => this.toggle(state);
    return (
      <Modal
          isOpen={this.state[state]}
          contentLabel="Lots for sale"
      >
        <div style={{ marginTop: 80, flexDirection: 'row', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
          <div onClick={closeFn} style={{ position: 'absolute', top: 10, right: 10 }}>X</div>
          {data}
        </div>
      </Modal>
    );
  }

  componentDidMount() {
    
  }

  toggle(state) {
    this.setState({
      [state]: !this.state[state]
    });
  }

  handleInputChangeLot(lot) {
    console.log(lot);
    if (this.values[lot.id]) {
      delete this.values[lot.id];
    } else {
      this.values[lot.id] = lot;
    }
    console.log(this.values);
  }

  handleSubmitSale(values) {
    console.log('sale', values);
  }

  render() {
    const userInfo = this.props.login.toJS().data || {};
    const lots = this.props.lots.get('lots');
    const bids = this.props.login.get('bids') || [];
    const textStyle = {
      position: 'relative',
      top: '15px',
      fontSize : '25px'
    };
    const imgSize = 150;
    const userDiv = _.isEmpty(userInfo) ? null : (
      <div style={userinfoStyle}>
        <pre>
          <div style={{flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', position:'absolute',top:200,right:20}}> <br/>
            <div> <p style={textStyle}>Entity type</p> <img height={imgSize} width={imgSize} src={entityTypeImages[userInfo.entityType]} /> </div> <br/>
            <div> <p style={textStyle}>Farmer Type </p> <img height={imgSize} width={imgSize} src={farmerTypeImages[userInfo.farmerType]} /></div>
          </div>
        </pre>
      </div>
    );
    const tableStyle = { padding: 15, paddingLeft: 20, paddingRight: 20, borderWidth: '1px', border: 'solid', padding: '5px', textAlign: 'center' };
    const lotData = _.concat(
      [(
        <tr>
          <th style={tableStyle}>Add Lots</th>
          <th style={tableStyle}>Location</th>
          <th style={tableStyle}>Date created</th>
          <th style={tableStyle}>Bids Received</th>
        </tr>
      )],
      _.map(lots, lot => (
        <tr>
          <td style={tableStyle}>
            <input
                type="checkbox"
                onChange={this.handleInputChangeLot.bind(this, lot)} />
          </td>
          <td style={tableStyle}>{lot.location}</td>
          <td style={tableStyle}>{formatDate(new Date(lot.created))}</td>
          <td style={tableStyle}>{lot.bids}</td>
        </tr>
      ))
    );

    const bidData = _.concat(
      [(
        <tr>
          <th style={tableStyle}>Lot Id</th>
          <th style={tableStyle}>Date received</th>
          <th style={tableStyle}>Price</th>
        </tr>
      )],
      _.map(bids, bid => (
        <tr>
          <td style={tableStyle}>{bid.lotId}</td>
          <td style={tableStyle}>{formatDate(new Date(bid.created))}</td>
          <td style={tableStyle}>{bid.price} Rs</td>
        </tr>
      ))
    );

    const tableRootStyle = {
      width: '800px',
      borderCollapse: 'collapse',
    };

    const sellModal = this.getModal(
      (
        <LocalForm
            style={form}
            onSubmit={(values) => this.handleSubmitSale(values)}
        >
          <Control.text style={inputStyle} placeholder="Amount" model=".amount" />
          <button style={inputStyle} >Submit</button>
        </LocalForm>
      ),
      "showAddSale"
    );
    
    return (
      <div style={rootStyle}>
        {sellModal}
        <div style={{textAlign: 'right', marginRight: '40px'}}>
          Welcome back, {userInfo.entityName}</div>
      <div>
        <span onClick={this.toggle.bind(this, "showAddSale")} style={{marginBottom: '10px', display: 'block', color: 'white', marginLeft: 20, background: '#333333', padding: '10px', width: 200, borderRadius: 5, textAlign: 'center', fontSize: '20px', textDecoration: 'none'}} >Add lots</span>
        <a  style={{marginBottom: '10px', display: 'block', color: 'white', marginLeft: 20, background: '#333333', padding: '10px', width: 200, borderRadius: 5, textAlign: 'center', fontSize: '20px', textDecoration: 'none'}} href="http://127.0.0.1:7970">Farmer Intelligence</a>
        <Link style={{marginBottom: '10px', display: 'block', color: 'white', marginLeft: 20, background: '#333333', padding: '10px', width: 200, borderRadius: 5, textAlign: 'center', fontSize: '20px', textDecoration: 'none'}} to="/addbids">Add bids</Link>
      </div>
      <div style={{nav}}>
        {userDiv}
      </div>
      <div style={lotRoot}>
          
          <h2>List of Lots</h2>
          <div style={lotDataStyle}>
            <table style={tableRootStyle}>
              {lotData}
            </table>
          </div>

          <h2>List of Bids</h2>
          <div style={lotDataStyle}>
            <table style={tableRootStyle}>
              {bidData}
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
