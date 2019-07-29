import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Bits from './pages/Bits'
import Games from './pages/Games'
import Users from './pages/Users'
import GameEdit from './pages/GameEdit'
import Login from './pages/Login'
import { connect } from 'react-redux'
import * as actions from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup()
  }

  render() {
    const routes = this.props.isAuthenticated ? (
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
    ) : (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login"/>
      </Switch>
    )
    return <>{routes}</>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
