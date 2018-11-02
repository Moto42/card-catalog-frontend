import React, { Component } from 'react';
import BookAdderForm from './BookAdderForm';

class BookAdder extends Component{
  constructor(props){
    super(props);

  }

  adderFunction(prips) {
    console.log(prips)
  }

  render() {
    return ( <div>
      <BookAdderForm adderFunction={this.adderFunction}/>

      </div> )
    }
}


export default BookAdder;
