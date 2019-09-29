import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { HomeContainer, ProfileContainer } from './container/Container.home'
import SinglePost from './pages/SinglePost'
import Auth from './pages/Auth'
import Profile from './pages/Profile'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomeContainer} />
    <Route exact path='/auth' component={Auth} />
    <Route exact path='/:username/:profileId' component={ProfileContainer} />
    <Route exact path='/:username/:profileId/posts/:postId' component={SinglePost} />
    <Route exact path='/:username/:profileId/posts/:postId/comment/:commentId' component={SinglePost} />
  </Switch>
)

export default Routes