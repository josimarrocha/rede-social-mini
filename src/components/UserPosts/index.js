import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import NewPost from './NewPost'
import Post from './Post'
import { addNewComment } from '../../reducers/comments/actionsCreators'
import { ContainerPosts } from './styles'

const UserPosts = ({ visitProfile, socket, addNewComment, posts }) => {
  const [emitComment, setEmitComment] = useState()

  useEffect(() => {
    let comment = socket.comment
    let answersComment = socket.answersComment
    setEmitComment({
      comment,
      answersComment
    })

    comment && comment.on('newComment', async (m) => {
      const { post_id } = m[0]
      await addNewComment(post_id, m[0])
    })
    answersComment && answersComment.on('newAnswersComment', async (m) => {
      const { comment_id } = m[0]
      await addNewComment(comment_id, m[0], true)

    })
  }, [])
  return (
    <ContainerPosts>
      {!visitProfile && <NewPost />}

      {posts.map((post, i) => (
        <Post key={`post:${post.pathImage}${i}`}
          emitComment={emitComment}
          post={post}
        />
      ))
      }
    </ContainerPosts>
  )
}


const mapStateToProps = state => ({
  posts: state.initialDataProfile.posts,
  socket: state.socket
})


export default connect(mapStateToProps, { addNewComment })(UserPosts)
