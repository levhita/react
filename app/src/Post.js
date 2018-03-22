import React, { Component } from "react";
//import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    const post = this.props.post;
    const date = new Date(parseInt(post.timestamp, 10));

    this.state = {
      privacy: post.private ? "Amigos" : "Público",
      timestamp: post.timestamp,
      text: post.text,
      date: date.toLocaleString()
    };
  }

  render() {
    return (
      <div className="post">
        <div>
          <div className="date">{this.state.date}</div>
          <div className="privacy">{this.state.privacy}</div>
          <div className="text">{this.state.text}</div>
        </div>
      </div>
    );
  }
}

export default Post;
