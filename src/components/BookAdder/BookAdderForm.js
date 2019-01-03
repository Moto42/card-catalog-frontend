import React from 'react';
import './BookAdderForm.css';




class BookAdderForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responseFeedback: '',
      stacksList : {},
      formData : {
        title        : '',
        authorFirst  : '',
        authorLast   : '',
        publisher    : '',
        publishedYear: '',
        upc          : '',
        isbn         : '',
        format       : '',
        shelfLocation: '',
        state        : '',
        genre        : '',
        subjects     : '',
      },
    };
    this.formDataUpdater = this.formDataUpdater.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
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
        const firstKey = Object.keys(stacks)[0];
        this.setState({stacksList: stacks});
        this.setState({shelfLocation: firstKey});
      }
    }
    req.send();
  }

  formDataUpdater(event){
    const key = event.target.id;
    const value = event.target.value;

    const newFormData = {...this.state.formData};
    newFormData[key]=value;
    this.setState({formData: newFormData});
  }

  handleResponse(){
    // TODO: add feedback for data submission.
    console.log('HTML Response: 724, This line should be unreachable.')
  }

  handleSubmit(event){
    event.preventDefault();
    if(!this.state.formData.shelfLocation){
      this.setState({responseFeedback:"Shelf Location cannot be empty."})
      return;
    }
    const payloadData = {...this.state.formData}
    // payloadData.shelfLocation = this.state.stacksList[payloadData.shelfLocation]
    payloadData.shelfLocation = payloadData.shelfLocation?
      this.state.stacksList[payloadData.shelfLocation] :
      this.state.stacksList[Object.keys(this.state.stacksList)[0]];
    const payload = JSON.stringify(payloadData);
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        switch(req.status) {
          case 200:
            this.setState({responseFeedback:`Successfully added ${this.state.formData.title} to database.`});
            const emptyFormData = {
              title        : '',
              authorFirst  : '',
              authorLast   : '',
              publisher    : '',
              publishedYear: '',
              upc          : '',
              isbn         : '',
              format       : '',
              state        : '',
              genre        : '',
              subjects     : '',
            };
            this.setState({formData:emptyFormData});
            break;
          case 500:
            this.setState({responseFeedback:`An error has occured ${this.state.formData.title} not added to database`});
            break;
          default:
            this.setState({responseFeedback:`Something unexpected has occured. status was: ${req.status}`});
            break;
        }
      }
    };
    req.open('POST','api/books',true);
    req.setRequestHeader('Content-Type','application/json');
    req.send(payload);
  }

  componentDidMount() {
    this.getStacksList();
  }

  render(){
    const selectionList = Object.keys(this.state.stacksList).map(k=><option> {k} </option>)

    return (<div id='StackAdderContainer'>
    <details>
      <summary>How To Use</summary>
      Just fill in the form with the details of your book.<br/>
      The 'Shelf Location' field is required. The book has to go somewhere<br/>
      If the Shelf Location you need is not found in the list, or the list is empty, please go to the 'Add Storage Location' tab to add it.<br/>
      All other fields are optional.
      <details>
        <summary>Description of fields</summary>
        <ul>
          <li>Title: The title of the book.<em>ie: 'Al Azif'</em></li>
          <li>Author First: The authors first name.<em>ie: 'Alhazred'</em></li>
          <li>Author Last: The authors last name.<em>ie: 'Abdule'</em></li>
          <li>Genre: A comma, seperated, list, of any genre this book belongs too. <em>ie: 'antique, occult, cookbooks'</em></li>
          <li>Subjects: A comma, seperated, list, of any subjects this book pertains too. <em>ie: 'occult, rituals, forbidden knowledge, charcuterie, alchemy'</em></li>
          <li>Publister: The company that published the book. <em>ie: 'self published'</em></li>
          <li>Published Year: What year the book was published. <em>ie: '738 AD'</em></li>
          <li>UPC: An identifying UPC code, if the book has one, or if one was added by the librarian.<em>ie: 9782352947103</em></li>
          <li>ISBN: The books ISBN number, if it has one.<em>ie: 9782352947103</em></li>
          <li>Format:<em>ie: 'Leather bound manuscript'</em></li>
          <li>Shelf Location: Where this book is stored, selected from the list.<em>ie:'Burried Under Barn'</em></li>
          <li>Condition: The general condition of the book.<em>ie: 'Minor Fire Damage, stained'</em></li>
        </ul>
      </details>
    </details>
    <form id='BookAdderForm'>
      <label> Title:         <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='title' />        </label><br/>
      <label> Author First:   <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='authorFirst' />  </label><br/>
      <label> Author Last:    <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='authorLast' />   </label><br/>
      <label> Genre:         <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='genre' placeholder='Seperate, each, genre, with, a, comma'/>    </label><br/>
      <label> Subjects:      <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='subjects' peholder='Seperate, each, genre, with, a, comma'/>    </label><br/>
      <label> Publisher:     <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='publisher' />    </label><br/>
      <label> Published Year: <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='publishedYear' /></label><br/>
      <label> UPC:           <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='upc' />          </label><br/>
      <label> ISBN:          <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='isbn' />         </label><br/>
      <label> Format:        <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='format' list='formatList' />       </label><br/>
        <datalist id='formatList'>
          <option>Paperback</option>
          <option>Hardback</option>
          <option>DVD</option>
        </datalist>
      <label>
        Shelf Location:
        <select onChange={this.formDataUpdater} type  ='text' id ='shelfLocation' >
          {selectionList}
        </select>
      </label><br/>
      <label> Condition:     <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='state' />        </label><br/>
      <datalist id='conditionList'>
        <option>Perfect</option>
        <option>Damaged</option>
        <option>Used</option>
        <option>Falling Apart</option>
      </datalist>
      <button onClick={this.handleSubmit}>Submit</button>
      <div id='serverResponse'>{this.state.responseFeedback}</div>
    </form>

    </div>)
  }
}

export default BookAdderForm;
