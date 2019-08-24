import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/:username/:id' component={Profile} />
  </Switch>
)

export default Routes