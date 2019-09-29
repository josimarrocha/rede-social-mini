import React, { useEffect, useState } from 'react'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import Loader from '../../components/Loader'
import { userToken } from '../../config/util'
import { Container } from './styles'

const Home = ({ showPostsTimeline, showFriends, loadingProfile, history }) => {
  const [isLoader, setIsLoader] = useState(true)
  const [IsMorePosts, setIsMorePosts] = useState(false)

  useEffect(() => {
    setIsLoader(true)
    const loadingData = async () => {
      if (userToken.token) {
        await loadingProfile(userToken.id)
        await showFriends(userToken.id)
        setIsLoader(false)
      }
    }
    if (userToken) {
      loadingData()
    } else {
      history.push('/auth')
    }
  }, [])

  return <> {isLoader
    ? <Loader isLoading={isLoader} />
    : <Container>
      <UserInfo />
      <UserPosts
        postsTimeline={showPostsTimeline}
        isScroll={true}
      />
      {IsMorePosts && <Loader isLoading={IsMorePosts} />}
    </Container>
  }
  </>
}

export default Home
