import React from 'react';
// import './BookAdderForm.css';




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
    <form id='BookAdderForm'>
      <label> title:         <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='title' />        </label><br/>
      <label> authorFirst:   <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='authorFirst' />  </label><br/>
      <label> authorLast:    <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='authorLast' />   </label><br/>
      <label> genre:         <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='genre' placeholder='Seperate, each, genre, with, a, comma'/>    </label><br/>
      <label> subjects:      <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='subjects' peholder='Seperate, each, genre, with, a, comma'/>    </label><br/>
      <label> publisher:     <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='publisher' />    </label><br/>
      <label> publishedYear: <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='publishedYear' /></label><br/>
      <label> upc:           <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='upc' />          </label><br/>
      <label> isbn:          <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='isbn' />         </label><br/>
      <label> format:        <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='format' list='formatList' />       </label><br/>
        <datalist id='formatList'>
          <option>Paperback</option>
          <option>Hardback</option>
          <option>DVD</option>
        </datalist>
      <label>
        shelfLocation:
        <select onChange={this.formDataUpdater} type  ='text' id ='shelfLocation' >
          {selectionList}
        </select>
      </label><br/>
      <label> condition:     <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='state' />        </label><br/>
      <datalist id='conditionList'>
        <option>Perfect</option>
        <option>Used</option>
        <option>Damaged</option>
        <option>Falling Apart</option>
      </datalist>
      <button onClick={this.handleSubmit}>Submit</button>
      <div id='serverResponse'>{this.state.responseFeedback}</div>
    </form>

    </div>)
  }
}

export default BookAdderForm;
