import React, { Component } from 'react';
import './App.css';
import BookAdder from './components/BookAdder';
import StackAdder from './components/StackAdder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BookAdder />
        <StackAdder />
      </div>
    );
  }
}

export default App;
