import React, { Component } from 'react';

class TabsBox extends Component {

  render(){
    return(
      <div>
        {this.props.children.filter(c => c.props.tabName === this.props.displayTab)}
      </div>

    )
  }
}

export default TabsBox;
