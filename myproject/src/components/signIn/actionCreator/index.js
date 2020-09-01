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
    if (token.data.getLogin !== null) history.push("/my_profile");
  };
};

export { actionLogin };
