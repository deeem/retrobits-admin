import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Bits from './pages/Bits'
import Games from './pages/Games'
import Users from './pages/Users'
import GameEdit from './pages/GameEdit'
import Login from './pages/Login'

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Layout>
        <Route path="/bits" component={Bits} />
        <Route path="/games/:id" component={GameEdit} />
        <Route path="/games" component={Games} />
        <Route path="/users" component={Users} />
        <Route path="/" exact component={Dashboard} />
      </Layout>
    </Switch>
  )
}

export default App
