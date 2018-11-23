import React, { Component } from 'react';
import BookDetails          from '../BookDetails';
import BookEdit             from '../BookEdit';

class BookInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      display        : 'details',
      editButtonText : 'Edit'
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

  render(){
    return (
      <div id='BookInfo'>
      <div><button onClick={this.toggleEdit}>{this.state.editButtonText}</button><button onClick={this.props.hideBookInfo}>X</button></div>
      {this.state.display === 'details' ? <BookDetails book={this.props.book} /> : <BookEdit book={this.props.book} /> }
      </div>
    )
  }
}

export default BookInfo;
