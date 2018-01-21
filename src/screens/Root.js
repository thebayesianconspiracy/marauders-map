import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';

import history from '../history';
import Signup from './Signup';
import Base from './Base';
import LotAdd from './LotAdd';

class Router extends Component {
  
  render() {
    const username = this.props.login.username;

    if (_.isEmpty(username)) {
      return (<Signup />);
    }

    const path = window.location.pathname;
    
    if (path.match(/addlots/i)) {
      return(
        <LotAdd />
      )
    }
    return (<Base />)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Router);
