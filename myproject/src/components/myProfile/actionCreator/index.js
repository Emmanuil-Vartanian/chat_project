import { actionPromise, getGQL } from "../../../store/store";

const actionAllChatsgroupOneUserPromise = (id) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query chatOneUser($id: ID!) {
      getAllChatGroupOneUser(id: $id) {
        id, updatedAt, lastMessage, autorId {
          id, login, avatar
        }, partnerId {
          id, login, avatar
        }
      }
    }`,
    { id }
  );
  return actionPromise("allChatsGroupOneUser", promise);
};

const actionAllChatsGroupOneUser = (id) => {
  return async (dispatch) => {
    await dispatch(actionAllChatsgroupOneUserPromise(id));
  };
};

const actionCreateChatGroupPromise = (autorId, partnerId) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation createChatGroup($autorId: String, $partnerId: String) {
      createChatGroup(autorId: $autorId, partnerId: $partnerId){
        id, createdAt, autorId {
          id, login, avatar
        }, partnerId {
          id, login, avatar
        }
      }
    }`,
    { autorId, partnerId }
  );
  return actionPromise("createChatGroup", promise);
};

const actionCreateChatGroup = (autorId, partnerId) => {
  return async (dispatch) => {
    await dispatch(actionCreateChatGroupPromise(autorId, partnerId));
  };
};

const actionOneUserPromise = (login) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query oneUser($login: String) {
      getOneUser(login: $login) {
        id, email, login, avatar
      }
    }`,
    { login }
  );
  return actionPromise("oneUser", promise);
};

const actionOneUser = (login) => {
  return async (dispatch) => {
    await dispatch(actionOneUserPromise(login));
  };
};

const actionLogOutPromise = (logout) => {
  var promise = logout
  return actionPromise("logOut", promise);
};

const actionLogOut = (logout) => {
  return async (dispatch) => {
    await dispatch(actionLogOutPromise(logout));
  };
};

export {
  actionAllChatsGroupOneUser,
  actionCreateChatGroup,
  actionOneUser,
  actionLogOut,
};
