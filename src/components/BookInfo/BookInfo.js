import React, { Component } from 'react';
import BookDetails          from '../BookDetails';
import BookEdit             from '../BookEdit';

class BookInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      display        : 'details',
      editButtonText : 'Edit',
      shelf          : false,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit(){
    const newDisplay        = this.state.display === 'details' ? 'edit'   : 'details';
    const newEditButtonText = this.state.display === 'details' ? 'Cancel' : 'Edit';
    this.setState({
      display        : newDisplay,
      editButtonText : newEditButtonText,
    });
  }

  getShelfLocation(shelfLocation){
    const req = new XMLHttpRequest();
    req.open("GET",`/api/stacks/${shelfLocation}`,true);
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        const data = JSON.parse(req.responseText);
        this.setState({shelf: data});
      }
    }
    req.send();
  }

  componentDidMount(){
    this.getShelfLocation(this.props.book.shelfLocation);
  }

  render(){
    const {book} = this.props;
    return (
      <div id='BookInfo'>
      <div class='topBar'><button onClick={this.toggleEdit}>{this.state.editButtonText}</button><button onClick={this.props.hideBookInfo}>X</button></div>
      {this.state.display === 'details' ?
        <BookDetails book={book} shelf={this.state.shelf} /> :
        <BookEdit book={book} shelf={this.state.shelf} /> }
      </div>
    )
  }
}

export default BookInfo;
