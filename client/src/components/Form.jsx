import React, { Component } from 'react';

class BasicForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      number: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className='container'>
        <form>
          <input ref="text" type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
          <input ref="email" type="email" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email}/>
          <input ref="number" type="number" name="phonenumber" placeholder="What your phone number?" onChange={this.handleChange} value={this.state.number}/>
          <button>Add Item</button>
        </form>
      </div>
    )
  }
}
export default BasicForm;
