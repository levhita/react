import React, { Component } from "react";
import "./NewPost.css";

class NewPost extends Component {
  constructor() {
    super();

    this.state = {
      value:"",
      privacy: "private",
      disabled: "disabled",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="new_post">
        <h1>Nueva Publicación</h1>
        <textarea onChange={this.handleChange} value={this.state.value} placeholder="¿Qué estás pensando?"/>
        <div className="post_options">
          <select value={this.state.privacy} onChange={this.handlePrivacyChange}>
            <option value="private">Amigos</option>
            <option value="public">Público</option>
          </select>
          <div className="error">{this.state.error}</div>
          <input disabled={this.state.value<=0?"disabled":""} type="button" onClick={this.handleSubmit} value="Publicar"/>
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value:event.target.value });
  }

  handlePrivacyChange(event) {
    this.setState({ privacy:event.target.value });
  }
  
  handleSubmit() {
    console.log(this.state);
  }

}

export default NewPost;
