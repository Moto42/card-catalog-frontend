import React, { Component } from 'react';
import ChecklistDisplay     from './ChecklistDisplay';

class BooksSearchForm extends Component {
  render() {
    return (<div id='BooksSearchForm'>
      <input type='text' placeholder = 'Title Search' onChange={this.props.updateSearchString}/>
      <ChecklistDisplay list={this.props.genreList} callback={this.props.genreTicker} />
      <ChecklistDisplay list={this.props.subjectsList} callback={this.props.subjectTicker} />
    </div>)
  }
}

export default BooksSearchForm;
