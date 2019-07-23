import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then( (res) => {
      if (res.data.type === 'error') {
        this.setState({
          message: res.data.message
        })
      } else {
        localStorage.setItem('mernToken', res.data.token)
        this.props.liftToken(res.data, this.props.history)
      }
    }).catch(err => {
      this.setState({
        message: 'Maximum login attempts exceeded. Please try again later.'
      })
    })
  }

  render() {
    return (
      <div className="Login">
        <h3>Log into your account:</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={this.handleInputChange}
            value={this.state.email} /><br />
          <input type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={this.handleInputChange}
            value={this.state.password} /><br />
          <input type="submit" value="Log In!" />
        </form>
      </div>
    )
  }
}

export default Login;