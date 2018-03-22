import React, { Component } from "react";
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
          <input
            type="button"
            disabled={this.isValid() ? "" : "disabled"}
            onClick={this.handleSubmit}
            value="Acceder"
          />
          <div className="error">{this.state.form_error}</div>
        </div>
      </div>
    );
  }

  handleEmailChange(event) {
    const email = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ email }); //We use the new ES6 function to create dynamic objects automagically
    this.isValidEmail(email);
  }

  handlePasswordChange(event) {
    const password = event.target.value; //We use a local copy because state doesn't propagate instantly
    this.setState({ password }); //We use the new ES6 function to create dynamic objects automagically
    this.isValidPassword(password);
  }

  isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length <= 0) {
      this.setState({ email_error: this.errors.empty_email });
      return false;
    } else if (!re.test(email)) {
      this.setState({ email_error: this.errors.invalid_email });
      return false;
    }

    this.setState({ email_error: "" });
    return true;
  }

  isValidPassword(password) {
    if (password.length <= 0) {
      this.setState({ password_error: this.errors.empty_password });
      return false;
    }
    this.setState({ password_error: "" });
    return true;
  }

  isValid() {
    return this.state.email_error === "" && this.state.password_error === "";
  }

  handleSubmit() {
    let error_flag = false;

    if (!this.isValidEmail(this.state.email)) {
      error_flag = true;
    }

    //If we only have one condition with ||, the second validation(that also updates the UI, wouldn't trigger)
    if (!this.isValidPassword(this.state.password)) {
      error_flag = true;
    }

    if (error_flag) {
      this.setState({ form_error: this.errors.form_errors });
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(() => {
        //We don't reveal if the email or the password is wrong to avoid easing brute force attacks
        this.setState({ form_error: this.errors.auth_error });
      });
  }
}

export default Login;
