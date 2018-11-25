import React, { Component }from 'react';

class BookEdit extends Component {
  constructor(props) {
    super(props);

    const {
      title,
      authorFirst,
      authorLast,
      publisher,
      publishedYear,
      upc,
      isbn,
      format,
      // checkedOut,
      // shelfLocation,
      state : condition,
      genre,
      subject,
    }=props.book;

    this.state = {
      responseFeedback : '',
      stacksList       : {},

      title            : title,
      authorFirst      : authorFirst,
      authorLast       : authorLast,
      publisher        : publisher,
      publishedYear    : publishedYear,
      upc              : upc,
      isbn             : isbn,
      format           : format,
      // checkedOut    : 'Waiting...',
      shelfLocation    : `${props.shelf.container}-${props.shelf.name}`,
      condition        : condition,
      genre            : genre,
      subject          : subject,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const formData = {
      title         : this.state.title,
      authorFirst   : this.state.authorFirst,
      authorLast    : this.state.authorLast,
      publisher     : this.state.publisher,
      publishedYear : this.state.publishedYear,
      upc           : this.state.upc,
      isbn          : this.state.isbn,
      format        : this.state.format,
      state         : this.state.condition,
      genre         : this.state.genre.join(','),
      subjects      : this.state.subject.join(','),
      shelfLocation : this.state.shelfLocation,
    };
    const payloadData = {...formData}
    payloadData.shelfLocation = this.state.stacksList[payloadData.shelfLocation];

    const payload = JSON.stringify(payloadData);
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        switch(req.status) {
          case 200:
            this.setState({responseFeedback:`Successfully updated ${this.state.title}.`});
            this.props.updateNotifyer();
            break;
          case 500:
            this.setState({responseFeedback:`An error has occured ${this.state.title} was not updated`});
            break;
          default:
            this.setState({responseFeedback:`Something unexpected has occured. status was: ${req.status}`});
            break;
        }
      }
    };
    req.open('PUT',`api/books/${this.props.book.id}`,true);
    req.setRequestHeader('Content-Type','application/json');
    req.send(payload);
  }

  stackReducer(acc,cur) {
    acc[`${cur.container}-${cur.name}`]=cur.id;
    return acc;
  }

  getStacksList(){
    const req = new XMLHttpRequest();
    req.open("GET",'/api/stacks',true);
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        const data = JSON.parse(req.responseText);
        const stacks = data.reduce(this.stackReducer,{});
        const selected = this.state.shelfLocation;
        this.setState({stacksList: stacks});
        this.setState({shelfLocation: selected});
      }
    }
    req.send();
  }

  componentDidMount(){
    this.getStacksList();
  }

  handleChange(key,value) {
    const thinger = {};
    thinger[key] = value;
    this.setState(thinger)
  }

  render() {
    const {
      title = 'untitled',
      authorFirst,
      authorLast,
      publisher,
      publishedYear,
      upc,
      isbn,
      format,
      // checkedOut,
      shelfLocation,
      condition,
      genre,
      subject,
    }=this.state;

    const selectionList = Object.keys(this.state.stacksList)
      .map(k=>{
        return (
          k === this.state.shelfLocation ?
          <option selected = 'selected'>{k} </option> :
          <option> {k} </option>
        )
      })

    return (
      <div id="BookDetails">
        <h2 className="title">{title}</h2>

        <p>
        Author: <input type='text' placeholder="" value={authorFirst} onChange={(e) => this.handleChange('authorFirst',e.target.value)} />
        <input type='text' placeholder="" value={authorLast} onChange={(e) => this.handleChange('authorLast',e.target.value)} />;
        Publisher: <input type='text' placeholder="" value={publisher} onChange={(e) => this.handleChange('publisher',e.target.value)} />;
        Year: <input type='text' placeholder="" value={publishedYear} onChange={(e) => this.handleChange('publishedYear',e.target.value)} />
        </p>
        <p>
        ISBN: <input type='text' placeholder="" value={isbn} onChange={(e) => this.handleChange('isbn',e.target.value)} />;
        UPC: <input type='text' placeholder="" value={upc} onChange={(e) => this.handleChange('upc',e.target.value)} />;
        Format: <input type='text' placeholder="" value={format} onChange={(e) => this.handleChange('format',e.target.value)} />
          <datalist id='formatList'>
            <option>Paperback</option>
            <option>Hardback</option>
            <option>DVD</option>
          </datalist>
        </p>
        <p>
        ShelfLocation:<select value={shelfLocation} onChange={(e) => this.handleChange('shelfLocation',e.target.value)}>
          {selectionList}
        </select>

        </p>
        <p>
        condition <input type='text' placeholder="" value={condition} onChange={(e) => this.handleChange('condition',e.target.value)} />
        </p>
        <p>
        Genre:<input type='text' placeholder="" value={genre.join(',')} onChange={(e) => this.handleChange('genre',e.target.value.toLowerCase().split(','))} />
        </p>
        <p>
        Subject: <input type='text' placeholder="" value={subject.join(',')} onChange={(e) => this.handleChange('subject',e.target.value.toLowerCase().split(','))} />
        </p>
      <div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
      <div>
        <p>{this.state.responseText}</p>
      </div>
      </div>
    )
  }

}




export default BookEdit;
