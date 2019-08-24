import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Ws from '@adonisjs/websocket-client'
import Comments from '../../Comments'
import { ContainerPost } from './styles'
import { addLikePost, removeLikePost, showPostsTimeline } from '../../../reducers/posts/actionsCreators'
import { showCommentPost, addNewComment } from '../../../reducers/comments/actionsCreators'

const io = Ws('ws://localhost:3333')
const Post = ({ posts, addLikePost, removeLikePost, userInfo, showCommentPost, addNewComment, socket }) => {
  const [emitComment, setEmitComment] = useState()
  const [showComment, setShowComment] = useState(false)

  useEffect(() => {
    // const { token } = JSON.parse(localStorage.getItem('@midiasocial@'))
    // io.withJwtToken(token)
    //   .connect()
    let comment = socket.comment
    let answersComment = socket.answersComment
    setEmitComment({
      comment,
      answersComment
    })

    // comment.on('ready', () => { })
    // answersComment.on('ready', () => { })

    comment && comment.on('newComment', async (m) => {
      const { post_id } = m[0]
      await addNewComment(post_id, m[0])
    })
    answersComment && answersComment.on('newAnswersComment', async (m) => {
      const { comment_id } = m[0]
      await addNewComment(comment_id, m[0], true)

    })
    // return () => io.close()
  }, [])

  const showComments = async (post_id) => {
    await showCommentPost(post_id)
  }

  return (
    <>
      {posts.map((post, i) => (
        <ContainerPost key={`post:${post.pathImage}${i}`}>
          <div className="content">
            <div className="header-post">
              <div className="post-user">
                {post.image_profile_mini
                  ? <img src={`http://localhost:3333/imageProfile/${post.image_profile_mini}`} alt="" />
                  : <img src={`images/user@50.png`} alt="" />
                }
                <div className="post-user-info">
                  <label>{post.name}</label>
                  <label className='post-user-hour'>
                    {new Date(post.data_post).toLocaleTimeString().split(/:\b\d+\b$/g)[0]}</label>
                </div>
              </div>
            </div>
            <div className="post-user-content">
              <p className='post-user-legend'>{post.legend}</p>
              <div className="post-user-image">
                <img src={post.pathImage} alt="" />
              </div>
            </div>
            <span>
              <i className="fas fa-thumbs-up"> {post.likes}</i>
            </span>
          </div>
          <div className="btn-actions">
            <a href='/'
              className={`btn ${post
                .usersLikesPost
                .some(usersLike => usersLike.user_id === userInfo.id) ? 'like' : ''}`
              }
              onClick={(e) => {
                e.preventDefault()
                const userPost = {
                  post_id: post.id,
                  user_id: userInfo.id
                }
                post
                  .usersLikesPost
                  .some(usersLike => usersLike.user_id === userInfo.id)
                  ? removeLikePost(userPost)
                  : addLikePost(post.id)
              }
              }>
              Gostei</a>
            <a href='/'
              className='btn'
              onClick={(e) => {
                e.preventDefault()
                showComments(post.id)
                setShowComment(true)
              }
              }>Comentários</a>
          </div>

          {emitComment && <Comments postId={post.id} emitComment={emitComment} showComment={showComment} />}
        </ContainerPost>
      ))}
    </>
  )
}

const mapStateToProps = state => ({
  posts: state.initialDataProfile.posts,
  userInfo: state.userInfo,
  comments: state.comments.comments,
  socket: state.socket
})

export default connect(mapStateToProps, { addLikePost, removeLikePost, showCommentPost, addNewComment })(Post)
