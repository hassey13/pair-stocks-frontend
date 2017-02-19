import React, { Component } from 'react';
import NavBar from './components/NavBar'




export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}
