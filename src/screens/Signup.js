import React, { Component } from 'react';
import { LocalForm, Control } from 'react-redux-form';

export default class MyApp extends React.Component {
  
  handleChange(values) {
    
  }
  
  handleUpdate(form) {
    
  }
  
  handleSubmit(values) {
    
  }
  
  render() {
    return (
      <LocalForm
          onUpdate={(form) => this.handleUpdate(form)}
          onChange={(values) => this.handleChange(values)}
          onSubmit={(values) => this.handleSubmit(values)}
      >
        <Control.text model=".username" />
        <Control.text model=".password" />
      </LocalForm>
    );
  }
}
