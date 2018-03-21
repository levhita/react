import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import firebase from "firebase";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: null
    };

    firebase.auth().onAuthStateChanged(User => {
      if (User) {
        this.setState({ user: User });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    if (this.state.user) {
      console.log(this.state.user);

      return (
        <div className="App">
          <h1>Welcome {this.state.user.email}!</h1>
          <input type="button" onClick={()=>{firebase.auth().signOut()}} value="Logout" />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login />
        </div>
      );
    }
  }
}

export default App;
