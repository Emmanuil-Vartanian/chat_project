import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import date from "../../../date/date";
import { actionAllImagesOneUser, actionAllImages } from "./actionCreator/index";

import "./chatGroups.css";

class ChatGroupBar extends Component {
  way(obj, resolverName, a) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (allObj) return allObj.map(a);
        }
      }
    }
  }

  componentDidMount() {
    this.props.allImagesOneUser(+localStorage.getItem("idPartner"));
    this.props.allImages();
  }

  render() {
    return (
      <div className={this.props.addedName}>
        <div className="avatar">
          {this.props.avatar === "" ? (
            <div className="notImage">
              <p>{this.props.login.substr(0, 1)}</p>
            </div>
          ) : (
            <img src={`/${this.props.avatar}`} alt={this.props.avatar} />
          )}
        </div>

        <div className="data">
          <div className="userName">
            <span>{this.props.login}</span>
            <span className="date">
              {this.props.updatedAt ? date(this.props.updatedAt) : ""}
            </span>
          </div>

          <div>
            <div>{this.props.lastMessage ? this.props.lastMessage : "" }</div>
          </div>
        </div>
      </div>
    );
  }
}

const ChatGroup = ({
  id,
  login,
  avatar,
  lastMessage,
  updatedAt,
  addedName,
}) => (
  <ConnectedChatGroupBar
    id={id}
    login={login}
    avatar={avatar}
    lastMessage={lastMessage}
    updatedAt={updatedAt}
    addedName={addedName}
  />
);

const ConnectedChatGroupBar = connect(
  (state) => {
    return { state };
  },
  {
    allImagesOneUser: actionAllImagesOneUser,
    allImages: actionAllImages,
  }
)(ChatGroupBar);

export default ChatGroup;
