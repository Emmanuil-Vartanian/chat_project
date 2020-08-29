import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const promiseReducer = (state = {background: null}, { type, name, status, payload }) => {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: {
        status,
        payload,
      },
    };
  }

  return state;
};

const actionPromise = (name, promise) => {
  const actionPending = () => ({
    type: "PROMISE",
    name,
    status: "PENDING",
    payload: null,
  });
  const actionResolved = (payload) => ({
    type: "PROMISE",
    name,
    status: "RESOLVED",
    payload,
  });
  return async (dispatch) => {
    dispatch(actionPending());

    try {
      let payload = await promise;
      dispatch(actionResolved(payload));
      return payload;
    } catch (error) {
      dispatch(actionRejected(error));
    }
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  promiseReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// const store = createStore(promiseReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export { store, actionPromise };
