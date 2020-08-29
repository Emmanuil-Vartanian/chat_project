import { actionPromise, getGQL } from "../../../../store/store";

const actionAllImagesOneUserPromise = (autorId) => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query imagesOneUser($autorId: String) {
      getAllImagesOneUser(autorId: $autorId) {
        id, createdAt, image, autorId {
          id, login
        }
      }
    }`,
    { autorId }
  );
  return actionPromise("allImagesOneUser", promise);
};

const actionAllImagesOneUser = (autorId) => {
  return async (dispatch) => {
    await dispatch(actionAllImagesOneUserPromise(autorId));
  };
};

const actionAllImagesPromise = () => {
  var promise = getGQL("http://localhost:9999/graphql")(
    `query images{
      getAllImages {
        id, createdAt, image, autorId {
          id, login
        }
      }
    }`
  );
  return actionPromise("allImages", promise);
};

const actionAllImages = () => {
  return async (dispatch) => {
    await dispatch(actionAllImagesPromise());
  };
};

export { actionAllImagesOneUser, actionAllImages };
