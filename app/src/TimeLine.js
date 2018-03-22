import React, { Component } from "react";
import Post from "./Post";
import "./Post.css";
import firebase from "firebase";

class TimeLine extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    const db = firebase.database();
    this.timelineRef = db.ref().child("timeline");

    this.timelineRef.on("child_added", snap => {
      let posts = this.state.posts;
      posts.push(snap.val());
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div className="timeline">
        {this.state.posts.map((post, i) => <Post key={i} post={post} />)}
      </div>
    );
  }
}

export default TimeLine;
