import React, { Component } from 'react'
import Base from './Base';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Match, Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="" component={Base}/>
        </div>
      </Router>
    )
  }
}
