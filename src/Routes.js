import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";


import React from "react";
import { Route, Switch } from "react-router-dom";


export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </Switch>;

