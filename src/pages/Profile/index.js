import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import ImageBgProfile from '../../components/UserInfo/ImageBgProfile'
import { postsByUser } from '../../reducers/posts/actionsCreators'
import { loadingProfile } from '../../reducers/friends/actionsCreators'
import { Container } from '../Home/styles'

const Profile = ({ loadingProfile, match: { params }, postsByUser }) => {
  useEffect(() => {
    const loadinProfile = async () => {
      postsByUser(params.id)
      loadingProfile(params.id)
    }
    loadinProfile()
  }, [params.id])

  return (
    <Container>
      <UserInfo visitProfile={true} />
      <ImageBgProfile />
      <UserPosts visitProfile={true} />
    </Container>
  )
}


export default connect(null, { loadingProfile, postsByUser })(Profile)
