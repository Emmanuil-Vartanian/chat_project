import React, { Component } from "react";
import { connect } from "react-redux";
import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";

import date from "../../../date/date";
import { actionAllImagesOneUser, actionAllImages } from "./actionCreator/index";
import { actionAllChatsGroupOneUser } from "../actionCreator/index";
import { actionAllMessageOneUser } from "../chatMessage/actionCreator/index";

import "./chatGroups.css";

class ChatGroupBar extends Component {
  constructor(props) {
    super(props);
    this.state = { online: this.props.online };
  }

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
          {this.props.online ? <div className="userOnline"></div> : null}
        </div>

        <div className="data">
          <div className="userName">
            <span>{this.props.login}</span>
            <span className="date">
              {this.props.updatedAt
                ? date(this.props.updatedAt, "forChatGroups")
                : ""}
            </span>
          </div>

          <div className="lastMessage">
            {this.props.lastMessage ? reactStringReplace(
              this.props.lastMessage,
              /:(.+?):/g,
              (match, i) => (
                <Emoji
                  key={i + this.props.id}
                  emoji={match}
                  set="apple"
                  size={18}
                />
              )
            ) : ""}
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
    online={props.online}
  />
);

const ConnectedChatGroupBar = connect(
  (state) => {
    return { state };
  },
  {
    allImagesOneUser: actionAllImagesOneUser,
    allImages: actionAllImages,
    allChatsGroupOneUser: actionAllChatsGroupOneUser,
    allMessageOneUser: actionAllMessageOneUser,
  }
)(ChatGroupBar);

export default ChatGroup;
