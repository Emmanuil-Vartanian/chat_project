import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import io from "socket.io-client";

import "./chatMessage.css";
import Messages from "./messages/messages";
import { actionAllChatsGroupOneUser } from "../actionCreator/index";
import {
  actionAllMessageOneUser,
  actionCreateMessage,
  actionAllMessage,
  actionChangeLastMessage,
} from "./actionCreator/index";
import dialogueIsEmpty from "../../../dialogueIsEmpty.png";

const socket = io.connect("http://localhost:9999");

class ChatMessageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: "",
      buttonEnter: (e) => {
        if (e.key === "Enter") {
          socket.emit("send mess", this.state.sendMessage);
          this.props.createMessage(
            this.state.sendMessage,
            localStorage.getItem("idAutor"),
            localStorage.getItem("idPartner")
          );
          this.props.changeLastMessage(
            localStorage.getItem("idChatGroup"),
            this.state.sendMessage
          );
          setTimeout(() => {
            const idAutor = localStorage.getItem("idAutor");
            this.props.allChatsGroupOneUser(idAutor);
          }, 0);
          this.setState({ sendMessage: "" });
        }
      },
    };

    socket.on("add mess", () => {
      this.props.allMessageOneUser(
        localStorage.getItem("autorMessId"),
        localStorage.getItem("partnerMessId")
      );
      const idAutor = localStorage.getItem("idAutor");
      this.props.allChatsGroupOneUser(idAutor);
    });
  }

  way(obj, resolverName, a) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          console.log(stateObj[keys][keyData]);
          if (!allObj) {
            return (
              <div className="dialogueIsEmpty">
                <div>
                  <img
                    src={dialogueIsEmpty}
                    alt={dialogueIsEmpty}
                    width="200px"
                  />
                  <p>Диалог пуст</p>
                </div>
              </div>
            );
          }
          return allObj.map(a);
        }
      }
    }
  }

  way2(obj, resolverName, a) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (allObj) return allObj;
        }
      }
    }
  }

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <>
        <div className="loginPartner">
          {localStorage.getItem("loginPartner")}
        </div>

        <div className="chatMessages">
          <div
            className="messagesBlock"
            ref={(el) => {
              this.messagesContainer = el;
            }}
          >
            {this.way("allMessageOneUser", "getAllMessagesOneUser", (el) => {
              // const a = this.way2("allMessageOneUser", "getAllMessagesOneUser");
              // const lastMess = a[a.length - 1];
              // localStorage.setItem("lastMess", lastMess.message);
              return (
                <Messages
                  key={el.id}
                  createdAt={el.createdAt}
                  message={el.message}
                  autorLogin={el.autorId.login}
                  partnerLogin={el.partnerId.login}
                  autorAvatar={el.autorId.avatar}
                  partnerAvatar={el.partnerId.avatar}
                />
              );
            })}
          </div>

          <div className="sendMessage" onKeyPress={this.state.buttonEnter}>
            <input
              type="text"
              value={this.state.sendMessage}
              onChange={(e) => this.setState({ sendMessage: e.target.value })}
            />
            <button
              onClick={() => {
                socket.emit("send mess", this.state.sendMessage);

                this.props.createMessage(
                  this.state.sendMessage,
                  localStorage.getItem("idAutor"),
                  localStorage.getItem("idPartner")
                );

                this.props.changeLastMessage(
                  localStorage.getItem("idChatGroup"),
                  this.state.sendMessage
                );

                setTimeout(() => {
                  const idAutor = localStorage.getItem("idAutor");
                  this.props.allChatsGroupOneUser(idAutor);
                }, 0);

                this.setState({ sendMessage: "" });
              }}
            >
              Send
            </button>
          </div>
        </div>
      </>
    );
  }
}

const ChatMessage = (props) => <ConnectedChatMessage />;

const ConnectedChatMessage = connect(
  (state) => {
    return { state };
  },
  {
    createMessage: actionCreateMessage,
    allMessageOneUser: actionAllMessageOneUser,
    allMessage: actionAllMessage,
    changeLastMessage: actionChangeLastMessage,
    allChatsGroupOneUser: actionAllChatsGroupOneUser,
  }
)(ChatMessageInfo);

export default ChatMessage;
