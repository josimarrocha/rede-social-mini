import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import api from '../../config/api'
import NewPost from './NewPost'
import MessagesViewed from '../MessagesViewed'
import Post from './Post'
import { ContainerPosts } from './styles'

let postsIds = {}
const UserPosts = ({ posts, userInfo, profile, postsTimeline, isScroll, profileId, url }) => {
  const [isInitScrollEvent, setIsInitScrollEvent] = useState(true)
  const [linePositionInScreen, setLinePositionInScreen] = useState()
  let scrollY = 0

  useEffect(() => {
    setLinePositionInScreen(document.querySelector('.area').getBoundingClientRect().top)
    isScroll ? postsTimeline(1, profileId) : postsTimeline(url)
    return () => window.onscroll = null
  }, [])

  const registerPostViews = async () => {
    let postss = document.querySelectorAll('.post-teste')
    postss && await postss.forEach(async post => {
      if (post.getBoundingClientRect().top < linePositionInScreen) {
        let [postId, userId] = post.getAttribute('datatype').split(':')
        if (!postsIds[postId] && userInfo.id !== +userId) {
          await api.post('post/views', { postId })
        }
        postsIds = {
          ...postsIds,
          [postId]: true
        }
      }
    })
  }

  const scroll = async (e) => {
    isInitScrollEvent && registerPostViews()
    setIsInitScrollEvent(true)
    let pagey = posts.page + 1
    scrollY = e.currentTarget.scrollY + e.currentTarget.innerHeight
    if (document.body.scrollHeight - scrollY < 500) {
      isScroll && isInitScrollEvent && postsTimeline(pagey, profile.id)
      setIsInitScrollEvent(false)
    }
  }
  window.onscroll = scroll

  return (
    <ContainerPosts >
      <MessagesViewed />
      {userInfo.id === profile.id && <NewPost />}
      {posts.posts.map((post, i) => (
        <Post
          key={`post:${post.id}${i}`}
          post={post}
        />
      ))}
    </ContainerPosts>
  )
}

const mapStateToProps = state => ({
  posts: state.posts,
  userInfo: state.userInfo,
  profile: state.friendsInfo.profile
})

export default connect(mapStateToProps)(UserPosts)
