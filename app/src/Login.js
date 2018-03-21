import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="login">
        <Email />
        <Password />
        <div className="field">
          <button onClick={this.handleSubmit}>Acceder</button>
        </div>
      </div>
    );
  }

  handleSubmit() {
    alert(this.state.email);
  }
}

class Email extends Component {
  constructor(props) {
    super(props);

    this.errors = {
      empty: "El Correo Electrónico no puede estar vacio.",
      invalid: "El Correo Electrónico es invalido."
    };

    this.state = {
      value: "",
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="field">
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          name="email"
          type="email"
          value={this.state.email}
          placeholder="nombre@ejemplo.com"
          onChange={this.handleChange}
        />
        <div className="error">{this.state.error}</div>
      </div>
    );
  }

  handleChange(event) {
    const value = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ value }); //We use the new ES6 function to create dynamic objects automagically

    if (value.length <= 0) {
      this.setState({
        error: this.errors.empty
      });
    } else if (!this.validateEmail(value)) {
      this.setState({
        error: this.errors.invalid
      });
    } else {
      this.setState({
        error: ""
      });
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

class Password extends Component {
  constructor(props) {
    super(props);
    this.errors = { empty: "La Contraseña no puede estar vacia." };

    this.state = {
      value: "",
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="field">
        <label htmlFor="password">Contraseña:</label>
        <input name="password" type="password" value={this.state.value} onChange={this.handleChange}/>
        <div className="error">{this.state.error}</div>
      </div>
    );
  }

  handleChange(event) {

    const value = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ value }); //We use the new ES6 function to create dynamic objects automagically
    if (value.length <= 0) {
      this.setState({
        error: this.errors.empty
      });
    } 
  }
}

export default Login;
