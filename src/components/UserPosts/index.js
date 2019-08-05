import React from 'react'
import NewPost from './NewPost'
import Post from './Post'
import { ContainerPosts } from './styles'

const UserPosts = () => {
  return (
    <ContainerPosts>
      <NewPost />
      <Post />
    </ContainerPosts>
  )
}

export default UserPosts
