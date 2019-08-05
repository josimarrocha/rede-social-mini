import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { showPostsTimeline } from '../../reducers/posts/actionsCreators'
import { loginUser } from '../../reducers/userInfo/actionsCreators'
import { Container } from './styles'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'

const Home = ({ showPostsTimeline, loginUser }) => {
  useEffect(() => {
    loginUser()
    showPostsTimeline()
  }, [])

  return (
    <Container>
      <UserInfo />
      <UserPosts />
    </Container>
  )
}

export default connect(null, { showPostsTimeline, loginUser })(Home)
