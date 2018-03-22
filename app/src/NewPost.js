import React, { Component } from "react";
import "./NewPost.css";
import firebase from "firebase";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      privacy: "private",
      disabled: "disabled"
    };

    const db = firebase.database();
    this.timelineRef = db.ref().child("timeline");

    this.handleChange = this.handleChange.bind(this);
    this.handlePrivacyChange = this.handlePrivacyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="new_post">
        <textarea
          onChange={this.handleChange}
          value={this.state.text}
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
    this.setState({ text: event.target.value });
  }

  handlePrivacyChange(event) {
    this.setState({ privacy: event.target.value });
  }

  isValid() {
	//We allow string up to 3 chars, like LOL and ALV
    return this.state.text.toString().trim().length > 2;
  }

  handleSubmit() {
    if ( !this.isValid() ) {
      return;
    }
    //We don't want extra spaces in the DB.
    const trimmed_text = this.state.text.toString().trim();
    const key = this.timelineRef.push().key;
    this.timelineRef.child(key).set({
      uid: this.props.user.uid,
      private: this.state.privacy === "private",
      text: trimmed_text,
      timestamp: Date.now()
    });

	//Reset Form to Empty
    this.setState({ text: "" });

  }
}

export default NewPost;
