import { actionPromise, getGQL } from "../../../store/store";

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
    await dispatch(actionCreateImagePromise(image, autorId));
  };
}

function actionChangeAvatarPromise(id, avatar) {
  let promise = getGQL("http://localhost:9999/graphql")(
    `mutation changeAvatar($id: ID!, $avatar: String) {
      changeAvatar(id: $id, avatar: $avatar) {
       id, createdAt, email, login, avatar, online
      } 
     }`,
    { id, avatar }
  );
  return actionPromise("changeAvatar", promise);
}

function actionChangeAvatar(id, avatar) {
  return async (dispatch) => {
    await dispatch(actionChangeAvatarPromise(id, avatar));
  };
}

export { actionCreateImage, actionChangeAvatar };
