import React, { Component } from "react";
import Post from "./Post";
import "./TimeLine.css";
import firebase from "firebase";

class TimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      users: []
    };

    firebase
      .database()
      .ref()
      .child("users")
      .once("value", snap => {
        this.setState({ users: snap.val() });
      });
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("timeline")
      .on("child_added", snap => {
        let posts = this.state.posts.slice();
        let post = snap.val();
        post.key = snap.key;
        posts.unshift(post);
        this.setState({ posts });
      });

    firebase
      .database()
      .ref()
      .child("timeline")
      .on("child_removed", snap => {
        let posts = this.state.posts.slice();
        posts.splice(posts.findIndex(post => post.key === snap.key), 1);
        this.setState({ posts });
      });

    firebase
      .database()
      .ref()
      .child("timeline")
      .on("child_changed", snap => {
        let posts = this.state.posts.slice();
        let index = posts.findIndex(post => post.key === snap.key);
        let post = snap.val();
        post.key = snap.key;
        //React doesn't update if you only change the variables inside the array, so we need to trick-it
        //'delete' leaves a empty space in the array, and doesn't update the length variable.
        delete posts[index];
        this.setState({ posts }, () => {
          //Once the state is applied, we cant put the new value there and this triggers the re-render
          //of just that element accros clients.
          posts[index] = post;
          this.setState({ posts });
        });
      });
  }

  render() {
    return (
      <div className="timeline">
        {this.state.posts.map((post, i) => {
          return (
            <Post
              key={post.key}
              post={post}
              isOwner={post.uid === this.props.user.uid}
              user={this.state.users[post.uid]}
            />
          );
        })}
      </div>
    );
  }
}

export default TimeLine;
