import React from 'react';
import './StackAdderForm.css';

class StackAdderForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData : {
        name         : 'Lower Shelf',
        building     : 'home',
        floor        : 'ground',
        room         : 'bedroom',
        container    : 'Black Bookshelf',
        containerType: 'shelf',
        description  : 'Black bookshelf in closet, lower shelf.',
      },
      containerTypes : [],
    };
    this.formDataUpdater = this.formDataUpdater.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  formDataUpdater(event){
    const key = event.target.id;
    const value = event.target.value;

    const newFormData = {...this.state.formData};
    newFormData[key]=value;

    this.setState({formData: newFormData})
  }

  handleResponse(){
    console.log('HTML Response: 724, This line should be unreachable.')
  }

  handleSubmit(event){
    const payload = JSON.stringify(this.state.formData);
    const req = new XMLHttpRequest();
    req.open('POST','api/stacks',true);
    req.setRequestHeader('Content-Type','application/json');
    req.send(payload);
  }

  render(){
    return (<div id='StackAdderContainer'>
    <form id='StackAdderForm'>
      <label> name         : <input onChange={this.formDataUpdater} value={this.state.formData.name}  type  ='text' id ='name' /></label><br/>
      <label> building     : <input onChange={this.formDataUpdater} value={this.state.formData.building}  type  ='text' id ='building' /></label><br/>
      <label> floor        : <input onChange={this.formDataUpdater} value={this.state.formData.floor}  type  ='text' id ='floor' /></label><br/>
      <label> room         : <input onChange={this.formDataUpdater} value={this.state.formData.room}  type  ='text' id ='room' /></label><br/>
      <label> container    : <input onChange={this.formDataUpdater} value={this.state.formData.container}  type  ='text' id ='container' /></label><br/>
      <label> containerType: <input onChange={this.formDataUpdater} value={this.state.formData.containerType}  type  ='text' id ='containerType' /></label><br/>
      <label> description  : <textarea onChange={this.formDataUpdater} value={this.state.formData.description}  id ='description' /></label><br/>
      <button type='button' onClick={this.handleSubmit}>submit</button>
    </form>
    <div>

    </div>
    </div>)
  }
}

export default StackAdderForm;
