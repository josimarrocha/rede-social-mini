import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from './routes'
import Header from './components/Header'
import { loadingProfile } from './reducers/userInfo/actionsCreators'
import { addNewComment } from './reducers/comments/actionsCreators'
import { friendsPending } from './reducers/friends/actionsCreators'
import { loadingNotifications } from './reducers/notifications/actionsCreators'
import { commentIO, friendsIO, userToken } from './config/util'

function App({ addNewComment, loadingProfile, loadingNotifications, friendsPending }) {
  const [showHeader, setShowHeader] = useState(false)
  useEffect(() => {
    if (userToken) {
      setShowHeader(true)
      loadingProfile(userToken.id)
      commentIO.on('newComment', async (comment) => {
        const { post_id } = comment
        await addNewComment(post_id, comment)
      })
      commentIO.on('newAnswersComment', async (comment) => {
        const { id: comment_id } = comment
        await addNewComment(comment_id, comment, true)
      })
      friendsIO.on('friendsPending', async (type) => {
        if (type === 'notifications') {
          loadingNotifications()
          return
        }
        await friendsPending()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      {showHeader && <Header />}
      <Routes />
    </Router>
  )
}

export default connect(null, { addNewComment, loadingProfile, friendsPending, loadingNotifications })(App);
