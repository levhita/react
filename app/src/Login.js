import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
    };
  
  }
  
  render() {
    return (
      <div className="login">
        <div className="field">
          <label htmlFor="email">Correo Electrónico:</label>
          <input name="email" type="text" value={this.state.email} placeholder="nombre@ejemplo.com"/>
          <div className="error">El campo de Correo Electrónico no puede estar vacio.</div>
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña:</label>
          <input name="password" type="password" value=""/>
          <div className="error">El campo de Contraseña no puede estar vacio.</div>
        </div>
        <div className="field">
          <button>Acceder</button>
        </div>
      </div>
    );
  }

}

export default Login;
