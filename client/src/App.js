import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PlaidLink from 'react-plaid-link';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import util from 'util';

function BasicForm(props) {
  return (
    <div className='container'>
    <section className='add-item'>
        <form>
          <input type="text" name="username" placeholder="What's your name?" />
          <input type="email" name="email" placeholder="What's your email?" />
          <input type="number" name="currentItem" placeholder="What your phone number?" />
          <button>Add Item</button>
        </form>
    </section>
    <section className='display-item'>
      <div className='wrapper'>
        <ul>
        </ul>
      </div>
    </section>
    </div>
  );
}

class App extends Component {

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

  constructor(props) {
    super(props);
  }

  //where we send token to client server (firebase in our instance)
  handleOnSuccess(token, metadata) {
    util.makeRequest({
      parameters: {
        token: token,
        metadata: metadata,
      },
      url: 'https://clientwebsite.com/exchangeLinkToken/',
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
        <Route name="home" exact path="/" component={HomePage} />
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
        <BasicForm />
      </div>
    </Router>
    );
  }
}
export default App;
