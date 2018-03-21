import React, { Component } from "react";
import bcryptjs from "bcryptjs";
import "./Login.css";
import firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.errors = {
      empty_email: "El Correo Electrónico no puede estar vacio.",
      invalid_email: "El Correo Electrónico es invalido.",
      empty_password: "La Contraseña no puede estar vacia.",
      form_errors: "Favor de arreglar los errores arriba.",
      auth_error: "Correo Electrónico o Contraseña invalida."
    };

    this.state = {
      email: "",
      password: "",
      email_error: "",
      password_error: "",
      form_error: ""
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
          <div className="error">{this.state.form_error}</div>
        </div>
      </div>
    );
  }

  handleEmailChange(event) {
    const email = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ email }); //We use the new ES6 function to create dynamic objects automagically
    this.validateEmail(email);
  }

  handlePasswordChange(event) {
    const password = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ password }); //We use the new ES6 function to create dynamic objects automagically
    this.validatePassword(password);
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid= true;

    if (email.length <= 0) {
      this.setState({
        email_error: this.errors.empty_email
      });
      valid = false;
    } else if (!re.test(email)) {
      this.setState({
        email_error: this.errors.invalid_email
      });
      valid = false;
    } else {
      this.setState({
        email_error: ""
      });
    }
    return valid;
  }

  validatePassword(password) {
    let valid = true;

    if (password.length <= 0) {
      this.setState({
        password_error: this.errors.empty_password
      });
      valid = false;
    } else {
      this.setState({
        password_error: ""
      });
    }

    return valid;
  }

  handleSubmit() {
    let error = false;
    if (!this.validateEmail(this.state.email)) {
      this.setState({ form_error: this.errors.form_errors });
      error = true;
    }
    //If we only have one condition with ||, the second validation(that also updates the UI, wouldn't trigger)
    if (!this.validatePassword(this.state.password)) {
      this.setState({ form_error: this.errors.form_errors});
      error = true;
    }
    if (error) {
      return;
    }
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
    promise.catch(() => {
        //We don't reveal if the email or the password is wrong to avoid easing brute force attacks
        this.setState({ form_error: this.errors.auth_error});
    });
  }
}

export default Login;
