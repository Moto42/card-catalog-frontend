import React, {Component } from 'react';

class Tabsbar extends Component {



  render(){
    const buttons = this.props.children.map( c => <button onClick={()=>this.props.changeTab(c.props.tabName)}>{c.props.tabName}</button> );
    return (
      <div>
        {buttons}
      </div>
    )
  }
}

export default Tabsbar
