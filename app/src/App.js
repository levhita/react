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
      user: null
    };

    firebase.auth().onAuthStateChanged(User => {
      if (User) {
        this.setState({ user: User });
        
        /*
        /* With this we create a reference of the auth users in the
        /* database as they login, firebase doesn't provide an API to check auth users
        */

        const usersRef = firebase.database().ref().child("users");
        usersRef.child(User.uid).update({
          email:User.email
        });

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
            <strong>{this.state.user.email}</strong>
            <input
              type="button"
              onClick={() => {
                firebase.auth().signOut();
              }}
              value="Logout"
            />
          </div>
          <NewPost user={this.state.user}/>
          <TimeLine user={this.state.user}/>
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
