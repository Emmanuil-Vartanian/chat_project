import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const promiseReducer = (state = {}, { type, name, status, payload, error }) => {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: {
        status,
        payload,
        error,
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
    error: null,
  });
  const actionRejected = (error) => ({
    type: "PROMISE",
    name,
    status: "REJECTED",
    payload: null,
    error,
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

const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  promiseReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// const store = createStore(promiseReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export { store, actionPromise, getGQL };

