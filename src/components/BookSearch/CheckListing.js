import React, { Component } from 'react';

class CheckListing extends Component {
  render() {
    const { item, callback } = this.props;
    return(<div>
      {
        item[1] ?
        <input type='checkbox' onChange={callback} checked /> :
        <input type='checkbox' onChange={callback} />
      }
      {item[0]}
    </div>)
  }
}

export default CheckListing;
