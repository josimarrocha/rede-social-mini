import React, { useEffect, useState } from 'react'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import Loader from '../../components/Loader'
import ImageBgProfile from '../../components/UserInfo/ImageBgProfile'
import { Container } from '../Home/styles'

const Profile = ({ loadingProfile, match: { params }, postsByUser, showFriends, profile }) => {
  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setIsLoader(true)
    const loading = async () => {
      await loadingProfile(params.profileId)
      await showFriends(params.profileId)
      setIsLoader(false)
    }
    loading()
  }, [params.profileId])

  return <>{isLoader
    ? <Loader isLoading={isLoader} />
    : <Container>
      <UserInfo visitProfile={true} />
      <ImageBgProfile
        imageBackground={profile.image_background}
        visitProfile={true}
      />
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
