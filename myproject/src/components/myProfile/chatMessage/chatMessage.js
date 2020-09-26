import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Picker } from "emoji-mart";

import { SmileOutlined, CloseOutlined } from "@ant-design/icons";

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
  actionChangeMessage,
  actionDeleteMessage,
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
      messageSelectedResult: [],
      messageSelectedMessage: "",
      messageSettings: true,
      messageSelectedForDeleteMessage: [],
      messageSelectedForChangesMessage: true,
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

  updateDate = ({ idMessage, messageForChanges }) => {
    var messageSelectedResult = [];
    this.setState({ messageSelectedMessage: messageForChanges });

    this.setState({
      messageSelected: [...this.state.messageSelected, idMessage],
    });

    this.state.messageSelected.sort((a, b) => a - b);

    for (var i = 0; i < this.state.messageSelected.length; i++) {
      this.state.messageSelected[i] != this.state.messageSelected[i - 1] &&
        this.state.messageSelected[i + 1] != this.state.messageSelected[i] &&
        messageSelectedResult.push(this.state.messageSelected[i]);
    }

    this.setState({ messageSelectedResult: messageSelectedResult });

    if (!this.state.messageSelectedResult.length) {
      this.setState({ messageSettings: true });
      this.setState({ messageSelected: [] });
    } else this.setState({ messageSettings: false });
  };

  buttonEnter = (e) => {
    if (e.key === "Enter") {
      if (this.state.messageSelectedForChangesMessage) {
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
      } else {
        socket.emit("send mess", this.state.sendMessage);
        this.props.changeMessage(
          this.state.messageSelectedResult[0],
          this.state.sendMessage
        );
        this.setState({ messageSelectedForChangesMessage: true });
        this.setState({ sendMessage: "" });
        this.setState({ messageSelected: [] });
        this.setState({ messageSelectedResult: [] });
      }
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
              return (
                <Messages
                  key={el.id}
                  createdAt={el.createdAt}
                  id={el.id}
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

          {this.state.messageSettings ? (
            this.state.messageSelectedForChangesMessage ? (
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
              <>
                <div className="editMessage">
                  <div>
                    <p>Hедактировать сообщение</p>
                    <p>{this.state.messageSelectedMessage}</p>
                  </div>
                  <div className="iconClose">
                    <CloseOutlined
                      onClick={() => {
                        // this.setState({ messageSelected: [] });
                        this.setState({ messageSettings: true });
                        // this.setState({ messageSelectedResult: [] });
                        socket.emit("send mess", "");

                        this.setState({
                          messageSelectedForChangesMessage: true,
                        });
                        this.setState({ sendMessage: "" });
                        this.setState({ messageSelected: [] });
                        this.setState({ messageSelectedResult: [] });
                      }}
                    />
                  </div>
                </div>

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
                      // this.setState({ messageWriteNow: true });
                    }}
                  />
                  <button
                    onClick={() => {
                      socket.emit("send mess", this.state.sendMessage);
                      this.props.changeMessage(
                        this.state.messageSelectedResult[0],
                        this.state.sendMessage
                      );
                      this.setState({ messageSelectedForChangesMessage: true });
                      this.setState({ sendMessage: "" });
                      this.setState({ messageSelected: [] });
                      this.setState({ messageSelectedResult: [] });
                    }}
                  >
                    Send
                  </button>
                </div>
              </>
            )
          ) : this.state.messageSelectedResult.length <= 1 ? (
            <div className="messageSettings">
              <div
                className="deleteMessage"
                onClick={() => {
                  this.props.deleteMessage(this.state.messageSelectedResult);
                  socket.emit("send mess", "");
                  this.setState({ messageSelected: [] });
                  this.setState({ messageSettings: true });
                }}
              >
                удалить
              </div>
              <div
                onClick={() => {
                  this.setState({ messageSelectedForChangesMessage: false });
                  this.setState({ messageSettings: true });
                  this.setState({
                    sendMessage: this.state.messageSelectedMessage,
                  });
                }}
              >
                изменить
              </div>
              <div
                onClick={() => {
                  this.setState({ messageSelected: [] });
                  this.setState({ messageSettings: true });
                  this.setState({ messageSelectedResult: [] });
                  socket.emit("send mess", "");
                }}
              >
                отмена
              </div>
            </div>
          ) : (
            <div className="messageSettings">
              <div
                className="deleteMessage"
                onClick={() => {
                  this.props.deleteMessage(this.state.messageSelectedResult);
                  socket.emit("send mess", "");
                  this.setState({ messageSelected: [] });
                  this.setState({ messageSettings: true });
                }}
              >
                удалить
              </div>
              <div
                onClick={() => {
                  this.setState({ messageSelected: [] });
                  this.setState({ messageSettings: true });
                  this.setState({ messageSelectedResult: [] });
                  socket.emit("send mess", "");
                }}
              >
                отмена
              </div>
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
    changeMessage: actionChangeMessage,
    deleteMessage: actionDeleteMessage,
  }
)(ChatMessageInfo);

export default ChatMessage;
