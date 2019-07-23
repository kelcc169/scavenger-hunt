import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import ImageUploader from './ImageUploader'
import {
  BrowserRouter as Router,
  Route,
  Link
}from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.liftToken = this.liftToken.bind(this)
    this.logout = this.logout.bind(this)
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // found a token in local storage, verify it
      axios.post('/auth/me/from/token', {token})
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken');
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user
            })
          }
        })
    }
  }

  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  logout() {
    // remove token from local storage
    localStorage.removeItem('mernToken');
    // remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  componentDidMount() {
    this.checkForLocalToken();
  }

  render() {
    var user = this.state.user;
    var contents;
    if (user) {
      contents = (
        <>
          <ImageUploader/>
          <Profile user={user} />
        </>
      );
    } else {
      contents = (
        <>
          <Router>
            <nav>
              <Link className="brn-default" to="/login">Login</Link>{" "}
              <Link className="brn-default"  to="/signup">Signup</Link>
            </nav>
            <Route path="/login" 
              render={() => <Login liftToken={this.liftToken}/>} 
            />
            <Route path="/signup" 
              render={() => <Signup liftToken={this.liftToken}/>} 
            />
          </Router>
        </>
      )
    }

    return(
      <>
        {contents} 
      </>
    );
  }
}

export default App;
