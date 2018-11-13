import React from 'react';
import BookAdderForm from './BookAdderForm';

function  BookAdder() {
  return ( <div className='.compBorder'>
  <BookAdderForm adderFunction={this.adderFunction}/>
  </div> )
}


export default BookAdder;
