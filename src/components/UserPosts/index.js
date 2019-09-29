import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import NewPost from './NewPost'
import Post from './Post'
import { ContainerPosts } from './styles'

const UserPosts = ({ posts, userInfo, profile, postsTimeline, isScroll, profileId, url }) => {
  const [isInitScrollEvent, setIsInitScrollEvent] = useState(true)
  let scrollY = 0
  useEffect(() => {
    isScroll ? postsTimeline(1, profileId) : postsTimeline(url)
    return () => window.onscroll = null
  }, [])

  const scroll = (e) => {
    setIsInitScrollEvent(true)
    let pagey = posts.page + 1
    scrollY = e.currentTarget.scrollY + e.currentTarget.innerHeight
    if (document.body.scrollHeight - scrollY < 600) {
      isScroll && isInitScrollEvent && postsTimeline(pagey, profile.id)
      setIsInitScrollEvent(false)
    }
  }

  window.onscroll = scroll

  return (
    <ContainerPosts>
      {userInfo.id === profile.id && <NewPost />}
      {posts.posts.map((post, i) => (
        <Post key={`post:${post.id}${i}`}
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
