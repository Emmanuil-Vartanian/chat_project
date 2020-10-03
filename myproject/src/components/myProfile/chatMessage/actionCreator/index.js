import { actionPromise, getGQL } from "../../../../store/store";

const actionAllMessageOneUserPromise = (autorId, partnerId) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query allMessageOneUser($autorId: String, $partnerId: String) {
      getAllMessagesOneUser(autorId: $autorId, partnerId: $partnerId) {
        id, message, createdAt, autorId {
          id, login, avatar, writeMessage
        }, partnerId {
          id, login, avatar, writeMessage
        }
      }
    }`,
    { autorId, partnerId }
  );
  return actionPromise("allMessageOneUser", promise);
};

const actionAllMessageOneUser = (autorId, partnerId) => {
  return async (dispatch) => {
    await dispatch(actionAllMessageOneUserPromise(autorId, partnerId));
  };
};

const actionCreateMessagePromise = (message, autorId, partnerId) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation createMessage($message: String, $autorId: String, $partnerId: String) {
      createMessage(message: $message, autorId: $autorId, partnerId: $partnerId) {
        id
        message
      }
    }`,
    { message, autorId, partnerId }
  );
  return actionPromise("createMessage", promise);
};

const actionCreateMessage = (message, autorId, partnerId) => {
  return async (dispatch) => {
    await dispatch(actionCreateMessagePromise(message, autorId, partnerId));
  };
};

const actionAllMessagePromise = () => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query allMessages {
      getAllMessages {
        id, message, createdAt, autorId{
          id, login, avatar
        }, partnerId{
          id, login, avatar
        }
      }
    }`
  );
  return actionPromise("allMessage", promise);
};

const actionAllMessage = () => {
  return async (dispatch) => {
    await dispatch(actionAllMessagePromise());
  };
};

const actionChangeLastMessagePromise = (id, lastMessage) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation changeLastMess($id: ID!, $lastMessage: String) {
      changeLastMessage(id: $id, lastMessage: $lastMessage) {
        id, lastMessage, autorId {
          id, login, avatar
        }, partnerId {
          id, login, avatar
        }
      }
    }`,
    { id, lastMessage }
  );
  return actionPromise("changeLastMessage", promise);
};

const actionChangeLastMessage = (id, lastMessage) => {
  return async (dispatch) => {
    await dispatch(actionChangeLastMessagePromise(id, lastMessage));
  };
};

const actionChangeMessagePromise = (id, message) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation changeMessage($id: ID!, $message: String) {
      changeMessage(id: $id, message: $message) {
        id, message
      }
    }`,
    { id, message }
  );
  return actionPromise("changeMessage", promise);
};

const actionChangeMessage = (id, message) => {
  return async (dispatch) => {
    await dispatch(actionChangeMessagePromise(id, message));
  };
};

const actionDeleteMessagePromise = (id) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation deleteMessage($id: [ID!]) {
      deleteMessage(id: $id) 
    }`,
    { id }
  );
  return actionPromise("deleteMessage", promise);
};

const actionDeleteMessage = (id) => {
  return async (dispatch) => {
    await dispatch(actionDeleteMessagePromise(id));
  };
};

const actionChangeWriteMessagePromise = (id, writeMessage) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation changeWriteMessage($id: ID!, $writeMessage: Boolean) {
      changeWriteMessage(id: $id, writeMessage: $writeMessage) {
        id, email, login, avatar, online, writeMessage
      }
    }`,
    { id, writeMessage }
  );
  return actionPromise("deleteMessage", promise);
};

const actionWriteMessage = (id, writeMessage) => {
  return async (dispatch) => {
    await dispatch(actionChangeWriteMessagePromise(id, writeMessage));
  };
};

export {
  actionAllMessageOneUser,
  actionCreateMessage,
  actionAllMessage,
  actionChangeLastMessage,
  actionChangeMessage,
  actionDeleteMessage,
  actionWriteMessage
};
