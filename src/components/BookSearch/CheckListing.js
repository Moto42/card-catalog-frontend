import React, { Component } from 'react';

class CheckListing extends Component {
  render() {
    const { item, callback } = this.props;
    return(<div>
      <input type='checkbox' onChange={callback}/>
      {item[0]}
    </div>)
  }
}

export default CheckListing;
