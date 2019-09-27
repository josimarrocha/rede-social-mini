import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import UserInfo from '../../components/UserInfo'
import UserPosts from '../../components/UserPosts'
import Loader from '../../components/Loader'
import { showPostsTimeline } from '../../reducers/posts/actionsCreators'
import { showFriends, friendsPending, loadingProfile } from '../../reducers/friends/actionsCreators'
import { loadingNotifications } from '../../reducers/notifications/actionsCreators'
import { Container } from './styles'

const Home = ({ showPostsTimeline, showFriends, friendsPending, loadingProfile, loadingNotifications, page, lastPage }) => {
  const [isLoader, setIsLoader] = useState(true)
  const [IsMorePosts, setIsMorePosts] = useState(false)
  const [isInitScrollEvent, setIsInitScrollEvent] = useState(true)
  let scrollY = 0

  useEffect(() => {
    setIsLoader(true)
    const loadingData = async () => {
      const user = JSON.parse(await localStorage.getItem('@midiasocial@'))
      if (user.token) {
        await loadingProfile(user.id)
        await showFriends(user.id)
        friendsPending()
        loadingNotifications()
        showPostsTimeline(1)
        setIsLoader(false)
      }
    }
    loadingData()
    return () =>
      window.onscroll = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scroll = (e) => {
    setIsInitScrollEvent(true)

    let pagey = page + 1
    scrollY = e.currentTarget.scrollY + e.currentTarget.innerHeight
    if (document.body.scrollHeight - scrollY < 600) {
      isInitScrollEvent && showPostsTimeline(pagey)
      setIsInitScrollEvent(false)
    }
  }

  window.onscroll = scroll

  return (
    <>
      {isLoader
        ? <Loader isLoading={isLoader} />
        : <Container>
          <UserInfo />
          <UserPosts />
          {IsMorePosts && <Loader isLoading={IsMorePosts} />}
        </Container>
      }
    </>
  )
}

const mapStateToProps = state => ({
  lastPage: state.initialDataProfile.lastPage,
  page: state.initialDataProfile.page
})

export default connect(mapStateToProps, { showPostsTimeline, showFriends, friendsPending, loadingProfile, loadingNotifications })(Home)
