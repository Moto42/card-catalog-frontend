import React from 'react';
// import './BookAdderForm.css';




class BookAdderForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stacksList : {
        'this':1,
        'is'  :2,
        'a'   :3,
        'test':4,
      },
      formData : {
        title        : '',
        authorFirst  : '',
        authorLast   : '',
        publisher    : '',
        publishedYear: '',
        upc          : '',
        isbn         : '',
        format       : '',
        checkedOut   : '',
        shelfLocation: '',
        state        : '',
      },
    };
    this.formDataUpdater = this.formDataUpdater.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  stackReducer(acc,cur) {
    acc={'one':1,'two':2,'three':3,'four':4}
    return acc;
  }

  getStacksList(){
    const req = new XMLHttpRequest();
    req.open("GET",'/api/stacks',true);
    req.onreadystatechange = () => {
      if(req.readyState === 4){
        const data = JSON.parse(req.responseText);
        const stacks = data.reduce(this.stackReducer,{})
        this.setState({stacksList: stacks})

      }
    }
    req.send();
  }

  formDataUpdater(event){
    const key = event.target.id;
    const value = event.target.value;

    const newFormData = {...this.state.formData};
    newFormData[key]=value;
    this.setState({formData: newFormData})
  }

  handleResponse(){
    // TODO: add feedback for data submission.
    console.log('HTML Response: 724, This line should be unreachable.')
  }

  handleSubmit(event){
    const payload = JSON.stringify(this.state.formData);
    const req = new XMLHttpRequest();
    req.open('POST','api/books',true);
    req.setRequestHeader('Content-Type','application/json');
    req.send(payload);
  }

  render(){

    this.getStacksList();

    const selectionList = Object.keys(this.state.stacksList).map(k=><option> {k} </option>)

    return (<div id='StackAdderContainer'>
    <form id='BookAdderForm'>
      <label> title:         <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='title' />        </label><br/>
      <label> authorFirst:   <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='authorFirst' />  </label><br/>
      <label> authorLast:    <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='authorLast' />   </label><br/>
      <label> publisher:     <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='publisher' />    </label><br/>
      <label> publishedYear: <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='publishedYear' /></label><br/>
      <label> upc:           <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='upc' />          </label><br/>
      <label> isbn:          <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='isbn' />         </label><br/>
      <label> format:        <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='format' />       </label><br/>
      <label> checkedOut:    <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='checkedOut' />   </label><br/>
      <label>
        shelfLocation: <select onChange={this.formDataUpdater} type  ='text' id ='shelfLocation' >
          {selectionList}
          </select>
      </label><br/>
      <label> condition:     <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='state' />        </label><br/>
      <button onClick={this.getStacksList}>Test it</button>
    </form>
    <div>

    </div>
    </div>)
  }
}

export default BookAdderForm;
