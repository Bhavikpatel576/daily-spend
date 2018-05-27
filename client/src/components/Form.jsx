import React, { Component } from 'react';
import firebase from '../firebase.js';

class BasicForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      number: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('users');
    const item = {
      username: this.state.username,
      email: this.state.email,
      number: this.state.number
    }
    itemsRef.push(item);
    this.setState({
      username: "",
      email: "",
      number: ""
    });
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <input ref="username" type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
          <input ref="email" type="email" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email}/>
          <input ref="tel" type="tel" name="phonenumber" placeholder="What your phone number?" onChange={this.handleChange} value={this.state.number}/>
          <button>Add Item</button>
        </form>
      </div>
    )
  }
}
export default BasicForm;
