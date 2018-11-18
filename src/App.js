import React, { Component } from 'react';
import './App.css';
// import Header     from './components/Header';
import Tabber     from './components/Tabber';
import BookAdder  from './components/BookAdder';
import StackAdder from './components/StackAdder';
import BookSearch from './components/BookSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabber>
          <BookSearch tabName = 'BookSearch' />
          <StackAdder tabName = 'StackAdder' />
          <BookAdder  tabName = 'BookAdder' />
        </Tabber>
      </div>
    );
  }
}

export default App;
