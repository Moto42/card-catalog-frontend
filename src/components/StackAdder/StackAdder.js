import React from 'react';
import StackAdderForm from './StackAdderForm';

function StackAdder(){
  return ( <div>
    <StackAdderForm adderFunction={this.adderFunction}/>
    </div> )
}

export default StackAdder;
