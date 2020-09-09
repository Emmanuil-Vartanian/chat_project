import { actionPromise, getGQL } from "../../../store/store";
import history from "../../../history";
// import { signUpValidateRepeat } from "../signUpValidate/signUpValidate";

function actionRegisterPromise(email, password, login, avatar) {
  let promise = getGQL("http://localhost:9999/graphql")(
    `mutation createUser($email: String, $login: String, $password: String, $avatar: String) {
      createUser(email: $email, login: $login, password: $password, avatar: $avatar) {
        id, email, login, avatar, online
      }
    }`,
    { email, password, login, avatar }
  );
  return actionPromise("register", promise);
}

function actionRegister(email, password, login, avatar = "") {
  return async (dispatch) => {
    let user = await dispatch(
      actionRegisterPromise(email, password, login, avatar)
    );
    if (user.data.createUser !== null) {
      setTimeout(()=> history.push("/registered"), 0) 
      localStorage.setItem("registerIdForImage", user.data.createUser.id);
    } else {
      const repeatEmail = document.querySelector(".repeat-email");
      repeatEmail.style.display = "inline-block";
    }
  };
}

function actionCreateImagePromise(image, autorId) {
  let promise = getGQL("http://localhost:9999/graphql")(
    `mutation createImage($image: String, $autorId: String) {
      createImage(image: $image, autorId:$autorId) {
        id, createdAt, image
      }
    }`,
    { image, autorId }
  );
  return actionPromise("createImage", promise);
}

function actionCreateImage(image, autorId) {
  return async (dispatch) => {
    const token = await dispatch(actionCreateImagePromise(image, autorId));
    console.log(token);
  };
}

export { actionRegister, actionCreateImage };
