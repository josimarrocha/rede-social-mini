import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewPost from './NewPost'
import Post from './Post'

import { ContainerPosts } from './styles'

const UserPosts = ({ posts, userInfo, profile }) => {
  useEffect(() => {

  }, [])
  return (
    <>
      {userInfo.hasOwnProperty('id') &&
        <ContainerPosts onScroll={() => console.log('posts')}>
          {userInfo.id === profile.id && <NewPost />}

          {Object.keys(posts).map((key, i) => (
            <Post key={`post:${key}${i}`}
              post={posts[key]}
            />
          ))
          }
        </ContainerPosts>}
    </>
  )
}


const mapStateToProps = state => ({
  posts: state.initialDataProfile.posts,
  socket: state.socket,
  userInfo: state.userInfo,
  profile: state.friendsInfo.profile
})


export default connect(mapStateToProps)(UserPosts)
