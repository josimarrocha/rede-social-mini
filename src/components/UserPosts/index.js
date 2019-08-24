import React from 'react'
import NewPost from './NewPost'
import Post from './Post'
import { ContainerPosts } from './styles'

const UserPosts = ({ visitProfile }) => {
  return (
    <ContainerPosts>
      {!visitProfile && <NewPost />}
      <Post />
    </ContainerPosts>
  )
}

export default UserPosts
