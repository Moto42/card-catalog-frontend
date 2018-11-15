import React, {Component} from 'react';
import BooksListDisplay from './BooksListDisplay';

class BookSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverResponse: '',
      booksList:[],
    }
  }

  //convert raw Array of Book Objects to an array of BookListings.

  getBookList(){
    const req = new XMLHttpRequest();
    req.open("GET",'/api/books',true);
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        const books = JSON.parse(req.responseText);
        this.setState({booksList:[...books]})
      }
    }
    req.send();
  }

  componentDidMount(){
    this.getBookList();
  }

  render(){
    return (<div>
      <BooksListDisplay booksList={this.state.booksList} />
      <div id='serverResponse'>{this.state.serverResponse}</div>
      </div>)
  }
}

export default BookSearch;
