import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div class="field">
          <label for="email">Correo Electrónico:</label>
          <input name="email" type="text" value=""/>
          <div class="error">El campo de Correo Electrónico no puede estar vacio.</div>
        </div>
        <div class="field">
          <label for="password">Contraseña:</label>
          <input name="password" type="password" value=""/>
          <div class="error">El campo de Contraseña no puede estar vacio.</div>
        </div>
        <div class="field">
          <button>Acceder</button>
        </div>
      </div>
      );
  }
}

export default Login;
