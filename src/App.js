import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import api from './config/api'
import Routes from './routes'
import Header from './components/Header'
import Auth from './pages/Auth'
import { initSocket } from './reducers/socket-io/actionsCreators'
import { loadingProfile } from './reducers/userInfo/actionsCreators'
import { addNewComment } from './reducers/comments/actionsCreators'

function App({ initSocket, loadingProfile, socket, addNewComment, userInfo }) {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    let comment = socket.comment
    comment && comment.on('newComment', async (comment) => {
      const { post_id } = comment
      await addNewComment(post_id, comment)
    })
    comment && comment.on('newAnswersComment', async (comment) => {
      const { id: comment_id } = comment
      await addNewComment(comment_id, comment, true)
    })
  }, [socket])

  useEffect(() => {
    const isToken = JSON.parse(localStorage.getItem('@midiasocial@'))
    if (isToken) {
      initSocket()
      loadingProfile(isToken.id)
      setIsAuth(false)
      // console.log('passei')
    } else {
      setIsAuth(true)
    }
  }, [])

  return (
    <Router>
      {isAuth === false &&
        <>
          <Header />
          <Routes />
        </>
      }

      {isAuth === true && <Auth setIsAuth={setIsAuth} />}
    </Router>
  );
}

const mapStateToProps = state => ({
  socket: state.socket,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { initSocket, addNewComment, loadingProfile })(App);
