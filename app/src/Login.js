import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.errors = {
      empty_email: "El Correo Electrónico no puede estar vacio.",
      invalid_email: "El Correo Electrónico es invalido.",
      empty_password: "La Contraseña no puede estar vacia.",
    };

    this.state = {
      email: "",
      password: "",
      email_error: "",
      password_error: "",
    };
    
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  render() {
    return (
      <div className="login">
        <div className="field">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            placeholder="nombre@ejemplo.com"
            onChange={this.handleEmailChange}
          />
          <div className="error">{this.state.email_error}</div>
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña:</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <div className="error">{this.state.password_error}</div>
        </div>
        <div className="field">
          <button onClick={this.handleSubmit}>Acceder</button>
        </div>
      </div>
    );
  }

  handleEmailChange(event) {
    const email = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ email }); //We use the new ES6 function to create dynamic objects automagically

    if (email.length <= 0) {
      this.setState({
        error: this.errors.empty_email
      });
    } else if (!this.validateEmail(email)) {
      this.setState({
        email_error: this.errors.invalid_email
      });
    } else {
      this.setState({
        email_error: ""
      });
    }
  }



  handlePasswordChange(event) {
    const password = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({password}); //We use the new ES6 function to create dynamic objects automagically

    if (password.length <= 0) {
      this.setState({ password_error: this.errors.empty_password });
    } else {
      this.setState({ password_error: "" });
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleSubmit() {
    console.log(this.state.email);
  }
}

export default Login;
