import React, { Component } from "react";
import "./NewPost.css";
import firebase from "firebase";

class NewPost extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      privacy: "private",
      disabled: "disabled"
    };

    const db = firebase.database();
    this.timeline = db.ref().child("timeline");

    this.handleChange = this.handleChange.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="new_post">
        <h1>Nueva Publicación</h1>
        <textarea
          onChange={this.handleChange}
          value={this.state.value}
          onKeyPress={event => {
            if (event.key === "Enter" && !event.shiftKey) {
              this.handleSubmit();
            }
          }}
          placeholder="¿Qué estás pensando?"
        />
        <div className="post_options">
          <select
            value={this.state.privacy}
            onChange={this.handlePrivacyChange}
          >
            <option value="private">Amigos</option>
            <option value="public">Público</option>
          </select>
          <input
            disabled={this.isValid() ? "":"disabled"}
            type="button"
            onClick={this.handleSubmit}
            value="Publicar"
          />
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handlePrivacyChange(event) {
    this.setState({ privacy: event.target.value });
  }

  isValid() {
    return this.state.value.toString().trim().length > 2;
  }

  handleSubmit() {
    if ( !this.isValid() ) {
      return;
    }
    //We don't want extra spaces in the DB.
    const trimmed_value = this.state.value.toString().trim();
    //A timestamp up to millisecons is always a good key, and doubles up as a date.
    this.timeline.child(Date.now()).set({
      uid: this.props.user.uid,
      private: this.state.privacy === "private",
      post: trimmed_value
    });

    this.setState({ value: "" });

  }
}

export default NewPost;
