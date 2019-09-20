import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser, loadingProfile } from '../../reducers/userInfo/actionsCreators'
import { showPostsTimeline } from '../../reducers/posts/actionsCreators'
import { initSocket } from '../../reducers/socket-io/actionsCreators'
import { showFriends, friendsPending } from '../../reducers/friends/actionsCreators'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import { Container } from './styles'

const Home = ({ showPostsTimeline, showFriends, friendsPending, loadingProfile }) => {
  useEffect(() => {
    const loadingData = async () => {
      const user = JSON.parse(await localStorage.getItem('@midiasocial@'))
      if (user.token) {
        await friendsPending()
        // await loadingProfile(user.id)
        await showPostsTimeline()
        await showFriends()
      }
    }
    loadingData()
  }, [])

  return (
    <Container>
      <UserInfo />
      <UserPosts />
    </Container>
  )
}

export default connect(null, { showPostsTimeline, loginUser, showFriends, friendsPending, loadingProfile, initSocket })(Home)
