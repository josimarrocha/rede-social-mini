import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Comments from '../../Comments'
import { ContainerPost } from './styles'
import { addLikePost, removeLikePost, deletePost } from '../../../reducers/posts/actionsCreators'
import { showCommentPost } from '../../../reducers/comments/actionsCreators'

const Post = ({ post, addLikePost, removeLikePost, userInfo, showCommentPost, deletePost, emitComment }) => {
  const [showComment, setShowComment] = useState(false)
  const [showOptionsPost, setShowOptionsPost] = useState(false)

  const showComments = async (post_id) => {
    await showCommentPost(post_id)
  }

  return (
    <>
      <ContainerPost>
        <div className="content">
          <div className="header-post">
            {userInfo.id === post.user_id && <div className="options-post">
              <i className="fas fa-ellipsis-v" onClick={() => setShowOptionsPost(!showOptionsPost)}></i>
              {showOptionsPost &&
                <ul className='options' onClick={() => deletePost(post.id)}>
                  <li>Excluir</li>
                </ul>
              }
            </div>}
            <div className="post-user">
              {post.image_profile_mini
                ? <img src={post.image_profile_mini} alt="" />
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
            <p className='post-user-legend'>{post.legend ? post.legend : ''}</p>
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
    </>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  comments: state.comments.comments,
})

export default connect(mapStateToProps, { addLikePost, removeLikePost, showCommentPost, deletePost })(Post)
