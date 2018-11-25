import React, {Component} from 'react';
import BooksListDisplay   from './BooksListDisplay';
import BooksSearchForm    from './BooksSearchForm';
import BookInfo           from '../BookInfo';
import './BookSearch.css';

class BookSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverResponse    : '',
      details           : false,
      detailsBook       : {},
      booksList         : [],
      filteredBooksList : [],
      genreList         : [],
      subjectsList      : [],
      searchString      : '',
    }
    this.updateSearchString = this.updateSearchString.bind(this);
    this.genreTicker        = this.genreTicker.bind(this);
    this.subjectTicker      = this.subjectTicker.bind(this);
    this.filterList         = this.filterList.bind(this);
    this.checkGenre         = this.checkGenre.bind(this);
    this.checkSubjects      = this.checkSubjects.bind(this);
    this.matchAll           = this.matchAll.bind(this);
    this.showBookInfo       = this.showBookInfo.bind(this);
    this.hideBookInfo       = this.hideBookInfo.bind(this);
  }

  findAnyMatch(a1,a2) {
    for(let i=0;i<a1.length;i++){
      if(a2.some(t=>t===a1[i])) return true
    }
    return false;
  }

  //Returns true if all items in array1 are found in array2
  matchAll(a1,a2) {
    for(let i = 0; i < a1.length; i++){
      console.log(a1[i],a2,a2.some(a=>a1[i]));
      if(!a2.some(a => a1[i])) return false;
    }
    return true;
  }

  checkGenre(book) {
    const activeGenre = this.state.genreList.filter( g => g[1] ).map(g => g[0])
    const bookGenre = book.genre;
    if(activeGenre.length === 0){ //There are no active genre, don't filter.
      return true;
    } else if(bookGenre.length === 0){
      return false;
    } else {
      return activeGenre.every( genre => bookGenre.indexOf(genre) >-1 );
    }
  }

  checkSubjects(book) {
    const activeSubjects = this.state.subjectsList.filter( g => g[1] ).map(g => g[0])
    const bookSubject = book.subject;
    if(activeSubjects.length === 0){ //There are no active genre, don't filter.
      return true;
    } else if(bookSubject.length === 0){
      return false;
    } else {
      return activeSubjects.every( subject => bookSubject.indexOf(subject) >-1 );
    }
  }

  genreTicker(event) {
    const genre    = event.target.nextSibling.data;
    const value    = event.target.checked;
    const oldState = [...this.state.genreList];
    const index    = oldState.findIndex(i => i[0]===genre);
    oldState[index][1] = value;
    this.setState({genreList : oldState})
  }

  subjectTicker(event) {
    const subject  = event.target.nextSibling.data;
    const value    = event.target.checked;
    const oldState = [...this.state.subjectsList];
    const index    = oldState.findIndex(i => i[0]===subject);
    oldState[index][1] = value;
    this.setState({subjectsList : oldState})
  }

  updateSearchString(e){
    this.setState({searchString : e.target.value})
  }

  removeRepeatedItems(array){
     return array.reduce( (acc,curr) => acc.indexOf(curr) === -1 ? [...acc, curr] : acc, [])
  }

  arrayToChecklist(array) {
    return array.map( (curr) => [curr,false])
  }

  parseBooklist(bookList) {
    this.setState({booksList:[...bookList]})
  }

  parseGenreList(booksList) {
    const bigOlArray = booksList.reduce( (acc, book) => {
      acc = acc.length > 0 ? [...acc, ...book.genre] : [...book.genre];
      return acc;
    },[] )
    const filteredArray = this.removeRepeatedItems(bigOlArray)
    const checklist = this.arrayToChecklist(filteredArray)
    this.setState({genreList : [...checklist]})
  }

  parseSubjectsList(booksList) {
    const bigOlArray = booksList.reduce( (acc, book) => {
      acc =[...acc, ...book.subject];
      return acc;
    },[] )
    const filteredArray = this.removeRepeatedItems(bigOlArray)
    const checklist = this.arrayToChecklist(filteredArray)
    this.setState({subjectsList : [...checklist]})
  }

  getBookList(){
    const req = new XMLHttpRequest();
    req.open("GET",'/api/books',true);
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        const booksList = JSON.parse(req.responseText);
        this.parseBooklist(booksList)
        this.parseGenreList(booksList)
        this.parseSubjectsList(booksList)
      }
    }
    req.send();
  }

  componentDidMount(){
    this.getBookList();
  }

  filterList(booksList) {
    let list = booksList.filter(book => book.title.toLowerCase().indexOf(this.state.searchString.toLowerCase())>-1);
    list = list.filter(this.checkGenre);
    list = list.filter(this.checkSubjects);
    return list;
  }

  showBookInfo(book) {
    this.setState({
      detailsBook : book,
      details     : true,
    })
  }

  hideBookInfo() {
    this.getBookList();
    this.setState({details:false});
  }

  render(){
    let filteredList = this.filterList(this.state.booksList);

    return (<div id='BooksSearch'>
      {this.state.details === true ? <BookInfo book={this.state.detailsBook} hideBookInfo={this.hideBookInfo}/> : <div></div>}
      <BooksSearchForm
        updateSearchString = {this.updateSearchString}
        genreList          = {this.state.genreList}
        subjectsList       = {this.state.subjectsList}
        genreTicker        = {this.genreTicker}
        subjectTicker      = {this.subjectTicker}
        booksList          = {filteredList}
      />
      <BooksListDisplay
        showBookInfo  = {this.showBookInfo}
        booksList     = {filteredList}
      />
      <div id='serverResponse'>{this.state.serverResponse}</div>
    </div>)
      }
}

export default BookSearch;
