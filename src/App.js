import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bits from "./pages/Bits";
import Games from "./pages/Games";
import Users from "./pages/Users";
import GameForm from "./pages/GameForm";

function App() {

  return (
    <Layout>
      <Switch>
        <Route path="/bits" component={Bits} />
        <Route path="/games/:id" component={GameForm} />
        <Route path="/games" component={Games} />

        <Route path="/users" component={Users} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Layout>
  );
}

export default App;
