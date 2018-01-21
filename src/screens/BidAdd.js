import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { LocalForm, Control } from 'react-redux-form';

import { getBids, addBid } from '../actions/bids';
import { getLots } from '../actions/lots'

const rootStyle = {
  'flex-direction': 'column',
  flex: 1
};



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

class Base extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAddresses : []
    }
  }

  componentDidMount() {
    const admin = this.props.login.get('admin');
    const address = admin.address;
    this.props.dispatch(getLots(address));
  }

  addBid(entry) {
    this.setState(state =>
      {
        state.selectedAddresses.push(entry.address);
        return state;
      })
    console.log('stat e is', this.state.selectedAddresses);
  }

  applyAddBid(amount) {
    this.props.dispatch(addBid(this.state.selectedAddresses, amount));
  }

  handleSubmit({amount}) {
    this.applyAddBid(amount);
  }

  render() {
    const username = this.props.login.get('username');
    const lots = this.props.lots.get('lots');
    const lotsDataView = lots.map(lot => {
      const lotInfo = lot;
      return (
        <div style={rootStyle}>
          <div onClick={this.addBid.bind(this, lotInfo)}>
          lotInfo.address
          </div>
        </div>
      );
    })
    return (
      <div>
      {lotsDataView}
      <div style={formRoot}>
        <LocalForm
            style={form}
            onSubmit={(values) => this.handleSubmit(values)}
        >
          <Control.text style={inputStyle} placeholder="amount" model=".amount" />
          <button style={inputStyle} >Submit</button>
        </LocalForm>
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
