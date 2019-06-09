import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bits from "./pages/Bits";
import Games from "./pages/Games";
import Users from "./pages/Users";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/bits" component={Bits} />
        <Route path="/games" component={Games} />
        <Route path="/users" component={Users} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);
