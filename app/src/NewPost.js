import React, { Component } from "react";
import "./NewPost.css";

class NewPost extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="new_post">
        <h1>Nueva Publicación</h1>
        <textarea/>
        <div className="post_options">
          <select name="privacy">
            <option>Amigos</option>
            <option>Público</option>
          </select>
          <input type="button" value="Publicar"/>
        </div>
      </div>
    );
  }
}

export default NewPost;
