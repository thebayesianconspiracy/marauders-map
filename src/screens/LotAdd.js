import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addLots } from '../actions/lots';

class Base extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(addLots({
      created: Date.now(),
      location: 'Rajasthan',
      num: 2
    }));
  }

  render() {
    const username = this.props.login.get('username');
    return (<div>Yoyo logged in {username}</div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Base);
