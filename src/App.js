import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ba from 'blockapps-rest-mod';

const { util, config, Promise, rest } = ba;

function* createUser(username, password) {
  const admin = yield rest.createUser(username, password);
  const constract = yield rest.uploadContract(admin);
}

class App extends Component {

  componentDidMount() {
    const a = createUser('soumeeeeee', 'lolololol');
    window.a = a;
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
