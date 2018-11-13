import React from 'react';
import './StackAdderForm.css';

class StackAdderForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      serverResponse : '',
      formData : {
        name         : '',
        building     : '',
        floor        : '',
        room         : '',
        container    : '',
        containerType: '',
        description  : '',
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
    req.onreadystatechange = () => {
      if(req.readyState === 4) {
        switch (req.status) {
          case 200:
            this.setState({serverResponse:`New container "${this.state.formData.name}" successfully added to the stacks.`})
            break;
          case 500:
            this.setState({serverResponse:`Error adding new container to stacks.`})
            break;
          default:
            this.setState({serverResponse:`Something unexpected has occured. Server response code: ${req.status}`})
            break;
        }
      }
    };
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
    <div id='serverResponse'>
      {this.state.serverResponse}
    </div>
    </div>)
  }
}

export default StackAdderForm;
