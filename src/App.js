import React, { Component } from 'react';
import './App.css';
import Header     from './components/Header';
import BookAdder  from './components/BookAdder';
import StackAdder from './components/StackAdder';
import BookSearch from './components/BookSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        // <Header />
        <BookAdder />
        // <BookSearch />
      </div>
    );
  }
}

export default App;
