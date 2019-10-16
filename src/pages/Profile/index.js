import React, { useEffect, useState } from 'react'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import Loader from '../../components/Loader'
import ImageBgProfile from '../../components/UserInfo/ImageBgProfile'
import { Container } from '../Home/styles'

const Profile = ({ loadingProfile, match: { params }, postsByUser, showFriends, profile, userInfo, showPostsTimeline }) => {
  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setIsLoader(true)
    const loading = async () => {
      showPostsTimeline(false, 'clean')
      await loadingProfile(params.profileId)
      await showFriends(params.profileId)
      setIsLoader(false)
    }
    loading()
  }, [params.profileId])

  useEffect(() => {
    loadingProfile(params.profileId)
  }, [userInfo.image_background])

  const renderImageBackground = () => {
    return (
      <ImageBgProfile
        imageBackground={profile.image_background}
        visitProfile={true}
        idUserLogged={userInfo.id}
        idUser={profile.id}
      />
    )
  }

  return <>{isLoader
    ? <Loader isLoading={isLoader} />
    : <Container>
      <UserInfo visitProfile={true} />
      {renderImageBackground()}
      <UserPosts
        isScroll={true}
        postsTimeline={postsByUser}
        profileId={params.profileId}
      />
    </Container>
  }
  </>
}

export default Profile
