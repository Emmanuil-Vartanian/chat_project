import React, { Component } from "react";
import { connect } from "react-redux";

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

          <div className="lastMessageContainer">
            <div className="lastMessage">
              {this.props.lastMessage
                ? this.props.lastMessage.length > 25
                  ? this.props.lastMessage.substr(0, 25) + "..."
                  : this.props.lastMessage
                : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ChatGroup = (props) => (
  <ConnectedChatGroupBar
    id={props.id}
    login={props.login}
    avatar={props.avatar}
    lastMessage={props.lastMessage}
    updatedAt={props.updatedAt}
    addedName={props.addedName}
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
