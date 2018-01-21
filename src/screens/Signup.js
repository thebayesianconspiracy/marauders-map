import React, { Component } from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { connect } from 'react-redux';
import { login } from '../actions/login';

class Signup extends React.Component {
  
  handleChange(values) {
    
  }
  
  handleUpdate(form) {
    
  }
  
  handleSubmit(values) {
    this.props.dispatch(login(values));
  }
  
  render() {
    return (
      <LocalForm
          style={[styles.form]}
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
      >
        <Control.text placeholder="username" model=".username" />
        <Control.text placeholder="password" model=".password" />
        <button>Submit!</button>
      </LocalForm>
    );
  }
}

const styles = {
  form: {
    
  }
};

export default connect()(Signup);
