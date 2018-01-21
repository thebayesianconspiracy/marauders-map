import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import _ from 'lodash';

import { addLots } from '../actions/lots';

const styles = {
  form: {
    
  }
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
    this.props.dispatch(addLots(
      Object.assign(
        {
          created: Date.now(),
        }, values
      )
    ));
  }

  componentDidMount() {
  }
  
  render() {
    return (
      <LocalForm
          style={[styles.form]}
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
      >
        <Control.text placeholder="location" model=".location" />
        <Control.text placeholder="number" model=".num" />
        <button>Submit!</button>
      </LocalForm>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(Base);
