import { actionPromise, getGQL } from "../../../store/store";
import history from "../../../history";

const actionLoginPromise = (login, password) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query login($login: String, $password: String) {
      getLogin(login: $login, password: $password)
    }`,
    { login, password }
  );
  return actionPromise("login", promise);
};

const actionLogin = (login, password) => {
  return async (dispatch) => {
    var token = await dispatch(actionLoginPromise(login, password));
    if (token.data.getLogin !== null) {
      history.push("/my_profile");
    }
  };
};

const actionUserOnlinePromise = (id, online) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `mutation changeOnline($id: ID!, $online: Boolean) {
      changeOnline(id: $id, online: $online) {
        id, email, login, avatar, online
      }
    }`,
    { id, online }
  );
  return actionPromise("login", promise);
};

const actionUserOnline = (id, online) => {
  return async (dispatch) => {
    var token = await dispatch(actionUserOnlinePromise(id, online));
    console.log(token);
  };
};

export { actionLogin, actionUserOnline };
