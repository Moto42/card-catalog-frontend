import React, { Component } from 'react';
import TabsBar from './Tabsbar';
import TabsBox from './TabsBox';

class Tabber extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayTab : '',
    }
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount(){
    if(this.props.defaultTab){
      this.setState({displayTab : this.props.defaultTab})
    } else {
      this.setState({displayTab : this.props.children[0].props.tabName})
    }
  }

  changeTab(tabName) {
    this.setState({displayTab : tabName});
  }

  render(){
    return (
      <div>
        <TabsBar changeTab = {this.changeTab}>
          {this.props.children}
        </TabsBar>
        <TabsBox displayTab = {this.state.displayTab}>
          {this.props.children}
        </TabsBox>
      </div>
    )
  }
}

export default Tabber;
