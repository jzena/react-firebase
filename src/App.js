import React, { Component } from 'react';
import {Routes} from "./Routes";
import './App.css';
import NavBar from './components/common/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Routes/>
      </div>
    );
  }
}

export default App;
