import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import _ from 'lodash';

import { addLots } from '../actions/lots';

const formRoot = {
  'flexDirection': "column",
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
  }

  handleChange(values) {
    
  }
  
  handleUpdate(form) {
    
  }
  
  handleSubmit(values) {
    console.log('show details now');
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={formRoot}>
        <span style={{ fontSize: 20, marginBottom: 10 }}>
          Enter Order No:
        </span>
        <LocalForm
            style={form}
            onUpdate={(form) => this.handleUpdate(form)}
            onChange={(values) => this.handleChange(values)}
            onSubmit={(values) => this.handleSubmit(values)}
        >
          <Control.text style={inputStyle} placeholder="Order Number" model=".num" />
          <button style={inputStyle}>Submit</button>
        </LocalForm>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Base);
