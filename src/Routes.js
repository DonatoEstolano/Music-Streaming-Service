import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/404";
import AppliedRoute from "./AppliedRoute";

import React from "react";
import { Route, Switch } from "react-router-dom";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    { /* catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

