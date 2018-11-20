import React, { Component } from 'react';
import CheckListing from './CheckListing';

class ChecklistDisplay extends Component {
  render() {
    const { list, callback } = this.props;
    return (<div class='bookSearchChecklist'>
      { list.map( item => <CheckListing item={item} callback={callback} /> ) }
    </div>)
  }
}

export default ChecklistDisplay;
