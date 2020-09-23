import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Picker } from "emoji-mart";

import { SmileOutlined } from "@ant-design/icons";

import "./chatMessage.css";
import "emoji-mart/css/emoji-mart.css";

import date from "../../../date/date";

import Messages from "./messages/messages";
import { actionAllChatsGroupOneUser } from "../actionCreator/index";
import {
  actionAllMessageOneUser,
  actionCreateMessage,
  actionAllMessage,
  actionChangeLastMessage,
} from "./actionCreator/index";
import dialogueIsEmpty from "../../../imagesForSite/dialogueIsEmpty.png";

const socket = io.connect("http://localhost:9999");

class ChatMessageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: "",
      windowEmoji: false,
      messageWriteNow: false,
      messageSelected: [],
      messageSettings: false,
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

  updateDate = (value) => {
    this.setState({
      messageSelected: [...this.state.messageSelected, value],
    });
    if (value === false) {
      this.state.messageSelected.pop();
      this.state.messageSelected.shift();
    }
  };

  buttonEnter = (e) => {
    if (e.key === "Enter") {
      socket.emit("send mess", this.state.sendMessage);
      this.props.createMessage(
        this.state.sendMessage,
        localStorage.getItem("idAutorForMessage"),
        localStorage.getItem("idPartnerForMessage")
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
  };

  way(obj, resolverName, a) {
    const stateObj = this.props.state[obj];
    for (var keys in stateObj) {
      for (var keyData in stateObj[keys]) {
        if (keyData === "data") {
          const allObj = stateObj[keys][keyData][resolverName];
          if (allObj === null || allObj.length === 0) {
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
        } else if (stateObj[keys] === "PENDING") {
          return (
            <div className="dialogueIsEmpty">
              <div>
                <img
                  src="https://www.arthor.ru/wp-content/themes/woodmart/images/tour/ajax-loader.gif"
                  alt="loading"
                  width="150px"
                />
                <p>Собираем все сообщения</p>
              </div>
            </div>
          );
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
    socket.on("add online", (data) => {
      const idAutor = localStorage.getItem("idAutor");
      this.props.allChatsGroupOneUser(idAutor);
    });
  }

  componentDidUpdate(preProps, preState) {
    this.scrollToBottom();
  }

  messageSettingsOrInput() {
    setTimeout(() => {
      this.state.messageSelected.length === 0
        ? this.setState({ messageSettings: true })
        : this.setState({ messageSettings: false });
    }, 0);
  }

  render() {
    return (
      <>
        <div className="loginPartner">
          {localStorage.getItem("loginPartner")}
          {localStorage.getItem("onlinePartner") === "false" ? (
            " был(а) в сети " +
            date(localStorage.getItem("updatedAtPartner"), "forChatGroups")
          ) : (
            <span style={{ color: "#03c603" }}> онлайн</span>
          )}
        </div>

        <div className="chatMessages">
          <div
            className="messagesBlock"
            ref={(el) => (this.messagesContainer = el)}
          >
            {this.way("allMessageOneUser", "getAllMessagesOneUser", (el) => {
              // console.log(el);
              return (
                <Messages
                  key={el.id}
                  createdAt={el.createdAt}
                  message={el.message}
                  autorLogin={el.autorId.login}
                  partnerLogin={el.partnerId.login}
                  autorAvatar={el.autorId.avatar}
                  partnerAvatar={el.partnerId.avatar}
                  updateDate={this.updateDate}
                />
              );
            })}
          </div>

          {this.messageSettingsOrInput()}
          {this.state.messageSettings ? (
            <div className="sendMessage" onKeyPress={this.buttonEnter}>
              {this.state.windowEmoji && (
                <div className="emojiOn">
                  <Picker set="apple" />
                </div>
              )}

              <SmileOutlined
                className="smiles"
                onClick={() =>
                  this.setState({ windowEmoji: !this.state.windowEmoji })
                }
              />
              <input
                type="text"
                value={this.state.sendMessage}
                onChange={(e) => {
                  this.setState({ sendMessage: e.target.value });
                  this.setState({ messageWriteNow: true });
                }}
              />
              <button
                onClick={() => {
                  socket.emit("send mess", this.state.sendMessage);

                  this.props.createMessage(
                    this.state.sendMessage,
                    localStorage.getItem("idAutorForMessage"),
                    localStorage.getItem("idPartnerForMessage")
                  );

                  setTimeout(() => {
                    const idAutor = localStorage.getItem("idAutor");
                    this.props.allChatsGroupOneUser(idAutor);
                    this.props.changeLastMessage(
                      localStorage.getItem("idChatGroup"),
                      this.state.sendMessage
                    );
                  }, 0);

                  this.setState({ sendMessage: "" });
                }}
              >
                Send
              </button>
            </div>
          ) : (
            <div className="messageSettings">
              <div>удалить</div>
              <div>изменить</div>
              <div>отмена</div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const ChatMessage = () => <ConnectedChatMessage />;

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
