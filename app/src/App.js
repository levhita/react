import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import NewPost from "./NewPost";
import TimeLine from "./TimeLine";
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
      return (
        <div className="App">
          <div className="header">
            Welcome {this.state.user.email}!
            <input
              type="button"
              onClick={() => {
                firebase.auth().signOut();
              }}
              value="Logout"
            />
          </div>
          <NewPost />
          <TimeLine />
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
