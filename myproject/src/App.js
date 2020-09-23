import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import "reset-css";

import {store} from "./store/store"
import history from "./history";

import Login from './components/signIn/signIn';
import putPassword from './components/putPassword/putPassword';
import Register from './components/signUp/signUp';
import GoodRegister from './components/goodRegister/goodRegister';
import MyProfile from './components/myProfile/myProfile';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path={["/", "/sign_in"]} component={Login} />
          <Route exact path="/put_password" component={putPassword} />
          <Route exact path="/sign_up" component={Register} />
          <Route exact path="/registered" component={GoodRegister} />
          <Route exact path="/my_profile" component={MyProfile} />
          <Route exact path="/my_profile/:id" component={MyProfile} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
