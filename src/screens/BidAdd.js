import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getBids, addBid } from '../actions/bids';
import { getLots } from '../actions/lots'

const rootStyle = {
  'flex-direction': 'column',
  flex: 1
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
        this.state.selectedAddresses.push(entry.address);
      })
      return this.state;
  }

  applyAddBid(entry) {
    this.props.dispatch(addBid(this.state.selectedAddresses));
  }

  render() {
    const username = this.props.login.get('username');
    const lots = this.props.lots.get('lots');
    const lotsDataView = lots.map(lot => {
      const lotInfo = lot.toJS();
      return (
        <div style={rootStyle}>
          <div onclick={this.addBid.bind(this, lotInfo)}>
          lotInfo.address
          </div>
          <button onclick={this.applyAddBid.bind(this)}>Apply</button>
        </div>
      );
    })
    return (<div>{lotsDataView}</div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
    lots: state.lots
  }
}

export default connect(mapStateToProps)(Base);
