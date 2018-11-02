import React, { Component } from 'react';
import StackAdderForm from './StackAdderForm';

class StackAdder extends Component{
  constructor(props){
    super(props);

  }

  adderFunction(prips) {
    console.log(prips)
  }

  render() {
    return ( <div>
      <StackAdderForm adderFunction={this.adderFunction}/>

      </div> )
    }
}

export default StackAdder;
