import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Comments from '../../Comments'
import SendComment from '../../Comments/SendComment'
import { addLikePost, removeLikePost, deletePost, postsByUser } from '../../../reducers/posts/actionsCreators'
import { hide } from '../../../reducers/ui'
import { showCommentPost } from '../../../reducers/comments/actionsCreators'
import { ContainerPost } from './styles'
import { friendsIO } from '../../../config/util'
import api from '../../../config/api'

const Post = ({ post, addLikePost, removeLikePost, userInfo, showCommentPost, deletePost, hide }) => {
  const [showComment, setShowComment] = useState(false)
  const [showOptionsPost, setShowOptionsPost] = useState(false)

  const showComments = async (post_id) => {
    await showCommentPost(post_id)
  }

  const createNotificationLike = async () => {
    try {
      userInfo.id !== post.user_id && await api.post('/notification', {
        user_id: post.user_id,
        action_id: post.legend ? 2 : 5,
        post_id: post.id
      })
      friendsIO.emit('pendingFriends', 'notifications')
    } catch (error) { }
  }

  const createLikePost = () => {
    addLikePost(post.id)
    createNotificationLike()
  }

  return (
    <>
      <ContainerPost onClick={() => hide()}>
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
                <Link to={`/${post.username}/${post.user_id}`}><label>{post.name}</label></Link>
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
          <a href='/' className={`btn ${post.usersLikesPost
            .some(usersLike => usersLike.user_id === userInfo.id) ? 'like' : ''}`
          } onClick={(e) => {
            e.preventDefault()
            const userPost = {
              post_id: post.id,
              user_id: userInfo.id
            }
            post
              .usersLikesPost.some(usersLike => usersLike.user_id === userInfo.id)
              ? removeLikePost(userPost)
              : createLikePost()
          }
          }>
            Gostei</a>
          <a href='/' className='btn' onClick={(e) => {
            e.preventDefault()
            showComments(post.id)
            setShowComment(!showComment)
          }
          }>Comentários</a>
        </div>
        <Comments
          postByUserId={post.user_id}
          postId={post.id}
        />
        <div className='send'>
          <SendComment
            imageProfile={userInfo.image_profile_mini}
            postId={post.id}
            userInfo={userInfo}
            postByUserId={post.user_id}
          />
        </div>
      </ContainerPost>
    </>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  profile: state.friendsInfo.profile
})

export default connect(mapStateToProps, { postsByUser, addLikePost, removeLikePost, showCommentPost, deletePost, hide })(Post)
