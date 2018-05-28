import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlaidLink from 'react-plaid-link';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BasicForm from './components/Form';
import makeRequest from 'util';
import firebase from './firebase.js';


// onChange={props.change} value={props.state.username}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/');
    const body = await response.json();
  
    if (response.status !== 200) throw Error(body.message);
  
    return body;
  };

  //where we send token to client server (firebase in our instance)
  handleOnSuccess(token, metadata) {
    console.log(token);
    console.log("-------------------");
    console.log(metadata);
    makeRequest({
      parameters: {
        token: token,
        metadata: metadata,
      },
      url: 'https://localhost:3000/exchangeLinkToken/',
      method: 'POST',
      onError: function() {},
      onLoad: function(statusCode, responseBody) {},
    });
  }

  handleOnExit(error, metadata) {
    console.log('link: user exited');
    console.log(error, metadata);
  }
  handleOnLoad() {
    console.log('link: loaded');
  }
  handleOnEvent(eventname, metadata) {
    console.log('link: user event', eventname, metadata);
  }
  render() {
    return (
      <Router>
      <div>
        <NavBar />
        <PlaidLink name="plaid-button"
          clientName="Plaid Client"
          env="development"
          product={['auth', 'transactions']}
          publicKey="2d72a0b491537451ea42af02a76b30"
          className="some-class-name"
          apiVersion="v2"
          onSuccess={this.handleOnSuccess}
          onExit={this.handleOnExit}
          onEvent={this.handleOnEvent}
          onLoad={this.handleOnLoad}>
          Open Plaid Link button
        </PlaidLink>
        <Route path="/settings" component={BasicForm} />
      </div>
      
    </Router>
    );
  }
}
export default App;
