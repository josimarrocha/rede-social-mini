import React from 'react'
import { Route } from 'react-router-dom'
import Home from './pages/Home'

const Routes = () => (
  <>
    <Route exact component={Home} />
  </>
)

export default Routes