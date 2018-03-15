import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div class="field">
          <label for="email">Email:</label>
          <input name="email" type="text" value=""/>
          <div class="error">Email doesn't exist</div>
        </div>
        <div class="field">
          <label for="password">Password:</label>
          <input name="password" type="password" value=""/>
        </div>
        <div class="field">
          <button>Login</button>
        </div>
      </div>
      );
  }
}

export default Login;
