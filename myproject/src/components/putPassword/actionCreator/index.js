import { actionPromise, getGQL } from "../../../store/store";
import history from '../../../history';

const actionPutPasswordPromise = (email, password) => {
  let promise = getGQL("http://localhost:9999/graphql")(
    `mutation changePassword($email: String, $password: String) {
      changePassword(email: $email, password: $password) {
        id, email, login, avatar, online
      }
    }`,
    { email, password }
  );
    return actionPromise("putPassword", promise);
};

const actionPutPassword = (email, password) => {
  return async (dispatch) => {
    let putPassword = await dispatch(actionPutPasswordPromise(email, password));
    if(putPassword.data.changePassword.login !== null) history.push("/")
  };
};

export { actionPutPassword };
