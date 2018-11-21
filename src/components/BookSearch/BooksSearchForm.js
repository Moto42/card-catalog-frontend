import React, { Component } from 'react';
import ChecklistDisplay     from './ChecklistDisplay';

class BooksSearchForm extends Component {

  filterByGenre(books, checklist){
    let returnList = checklist.filter( c => books.some( b => b.genre.some( g => g === c[0] ) ) )
    return returnList;
  }

  filterBySubject(books, checklist){
    let returnList = checklist.filter( c => books.some( b => b.subject.some( g => g === c[0] ) ) )
    return returnList;
  }

  render() {
    const { genreList, subjectsList, booksList } = this.props;
    return (<div id='BooksSearchForm'>
      <input type='text' placeholder = 'Title Search' onChange={this.props.updateSearchString}/>
      <hr />
      <em>Genre Filters</em>
      <ChecklistDisplay list={this.filterByGenre(booksList, genreList)} callback={this.props.genreTicker} />
      <hr />
      <em>Subjects Filter</em>
      <ChecklistDisplay list={this.filterBySubject(booksList, subjectsList)} callback={this.props.subjectTicker} />
    </div>)
  }
}

export default BooksSearchForm;
