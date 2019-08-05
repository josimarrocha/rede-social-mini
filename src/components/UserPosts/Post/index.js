import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ContainerPost } from './styles'
import { addLikePost, removeLikePost } from '../../../reducers/posts/actionsCreators'

const Post = ({ posts, addLikePost, removeLikePost, userInfo }) => {
  return (
    <>
      {posts.map(post => (
        <ContainerPost key={`post:${post.pathImage}`}>
          <div className="content">
            <div className="header-post">
              <div className="post-user">
                <img src={`http://localhost:3333/imageProfile/${post.image_profile_mini}`} alt="" />
                <div className="post-user-info">
                  <label>{post.username}</label>
                  <label className='post-user-hour'>{new Date(post.data_post).toLocaleTimeString().split(/:\b\d+\b$/g)[0]}</label>
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
            <a
              className={`btn ${post
                .usersLikesPost
                .some(usersLike => usersLike.user_id === userInfo.id) ? 'like' : ''}`
              }
              onClick={() => {
                const userPost = {
                  post_id: post.id,
                  user_id: userInfo.id
                }
                post
                  .usersLikesPost
                  .some(usersLike => usersLike.user_id === userInfo.id) ? removeLikePost(userPost) : addLikePost(post.id)
              }
              }>
              Gostei</a>
            <a className='btn'>Comentar</a>
          </div>
        </ContainerPost>
      ))}
    </>
  )
}

const mapStateToProps = state => ({
  posts: state.initialDataProfile.posts,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { addLikePost, removeLikePost })(Post)
