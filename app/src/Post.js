import React, { Component } from "react";
import "./Post.css";
import nl2br from "react-nl2br";
import firebase from "firebase";

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
      isOwner: this.props.isOwner,
      isEditing: false,
      editedValue: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ isEditing: true, editedValue: this.state.text });
  }
  
  handleChange(event) {
    this.setState({ editedValue: event.target.value });
  }

  handleDelete(e) {
    e.preventDefault();
    firebase
      .database()
      .ref()
      .child("timeline/" + this.props.post.key)
      .remove();
  }

  handleSave(e) {
    e.preventDefault();
    const trimmed_text = this.state.editedValue.toString().trim();
    firebase
      .database()
      .ref()
      .child("timeline/" + this.props.post.key)
      .update({ text: trimmed_text });
    this.setState({ isEditing: false, text: trimmed_text });
  }

  handleCancel(e) {
    e.preventDefault();
    this.setState({ isEditing: false });
    
  }

  render() {
    return (
      <div className="post">
        <div>
          <div className="date">{this.state.date}</div>
          <div className="privacy">{this.state.privacy}</div>
          {this.state.isEditing ? (
            <div className="editor">
              <textarea
                onChange={this.handleChange}
                value={this.state.editedValue}
              />
            </div>
          ) : (
            <div className="text">{nl2br(this.state.text)}</div>
          )}
          <div className="user">{this.state.email}</div>
          {this.state.isOwner && !this.state.isEditing ? (
            <div className="tools">
              <a href="#" onClick={this.handleEdit}>Editar</a> |
              | <a href="#" onClick={this.handleDelete}>Eliminar</a>
            </div>
          ) : null}
          {this.state.isEditing ? (
            <div className="tools">
              <a href="#" onClick={this.handleSave}>Guardar</a> |
              | <a href="#" onClick={this.handleCancel}>Cancelar</a>
            </div>
          ) : null}
          <div className="clear"/>
        </div>
      </div>
    );
  }
}

export default Post;
