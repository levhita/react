import React, { Component } from "react";
import "./Post.css";
import nl2br from "react-nl2br";

class Post extends Component {
  constructor(props) {
    super(props);
    const post = this.props.post;
    const date = new Date(parseInt(post.timestamp, 10));

    this.state = {
      privacy: post.private ? "Amigos" : "Público",
      timestamp: post.timestamp,
      text: post.text,
      date: date.toLocaleString(),
      email: this.props.user.email,
      isOwner: this.props.isOwner
    };
  }

  render() {
    return (
      <div className="post">
        <div>
          <div className="date">{this.state.date}</div>
          <div className="privacy">{this.state.privacy}</div>
          <div className="text">{nl2br(this.state.text)}</div>
          <div className="email">{this.state.email}</div>
          { this.state.isOwner 
            ? <div className="buttons">buttons</div> 
            : ''
          }
        </div>
      </div>
    );
  }
}

export default Post;
