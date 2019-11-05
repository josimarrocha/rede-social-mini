import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Comments from '../../Comments'
import SendComment from '../../Comments/SendComment'
import ListUser from '../../InputSearch/ListUser'
import PreviewImagePost from '../../PreviewImg'

import { addLikePost, removeLikePost, deletePost, postsByUser } from '../../../reducers/posts/actionsCreators'
import { hide } from '../../../reducers/ui'
import { showCommentPost } from '../../../reducers/comments/actionsCreators'

import getHours from '../../../config/getHours'
import { friendsIO } from '../../../config/util'
import api from '../../../config/api'
import imageUserDefault from '../../../assets/images/user@50.png'
import { ContainerPost } from './styles'

const Post = ({ post, addLikePost, removeLikePost, userInfo, showCommentPost, deletePost, comments }) => {
  const [showComment, setShowComment] = useState(false)
  const [showOptionsPost, setShowOptionsPost] = useState(false)
  const [urlPreviewImagePost, setUrlPreviewImagePost] = useState('')
  const [mouseEnterNameUser, setMouseEnterNameUser] = useState('')
  const usersMarkup = []
  let userSearched = {}

  const showComments = async (postId) => {
    if (!comments.hasOwnProperty(postId)) {
      await showCommentPost(postId)
      return true
    }
    const { page, lastPage } = comments[postId]
    if (page < lastPage) {
      await showCommentPost(postId)
    }
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

  const userMarkup = (legend) => {
    let updateLegend = !legend ? '' : legend.replace(/(@\w+\d+\${\d+})/gi, function (str, math) {
      let [username, id] = math.split('$')
      id = id.substring(1, id.length - 1)
      usersMarkup.push(username)
      return `
      <a href='#/${username}/${id}' 
        class='user-markup' data-post='postId:${post.id}' data-user='${username}:${id}'>
        ${username}
      </a>`
    })
    return { __html: updateLegend }
  }

  const renderUserMarkup = (user) => {
    setMouseEnterNameUser(user)
  }

  const abortImagePreview = () => {
    setUrlPreviewImagePost('')
  }

  return (
    <>
      <PreviewImagePost
        inPosts={true}
        imagePreview={urlPreviewImagePost}
        abortImagePreview={abortImagePreview}
      />
      <ContainerPost className='post-teste' datatype={`${post.id}:${post.user_id}`}>
        <div className="content">
          <div className="header-post">
            {userInfo.id === post.user_id &&
              <div className="options-post">
                <div className="viewed">
                  <span>{post.views && post.views}</span>
                  <i className="far fa-eye" style={{ display: 'inline' }}>
                  </i>
                </div>
                <i className="fas fa-ellipsis-v"
                  onClick={() => setShowOptionsPost(!showOptionsPost)}
                  tabIndex={0} onBlur={() => {
                    setTimeout(() => setShowOptionsPost(false), 200)
                  }} />
                {showOptionsPost &&
                  <ul className='options' onClick={() => deletePost(post.id)}>
                    <li>Excluir</li>
                  </ul>
                }
              </div>}
            <div className="post-user">
              <div className="post-image-user">
                <img src={post.image_profile_mini
                  ? post.image_profile_mini
                  : imageUserDefault} alt="" />
              </div>
              <div className="post-user-info">
                <Link to={`/${post.username}/${post.user_id}`}>
                  <label>{post.name}</label>
                </Link>
                <label className='post-user-hour'>
                  {getHours(post.data_post)}
                </label>
              </div>
            </div>
          </div>
          <div className="post-user-content"
            onMouseLeave={() => setMouseEnterNameUser('')}>
            {mouseEnterNameUser &&
              <ListUser
                userSearch={mouseEnterNameUser}
                cleanInput={setMouseEnterNameUser}
                markupUser={userSearched}
                link={true}
              />}
            <p className='post-user-legend' onMouseEnter={() => {
              const $re = document.querySelectorAll(`[data-post='postId:${post.id}']`)
              $re.forEach((tagLink, i) => {
                tagLink.onmouseover = function () {
                  if (tagLink.textContent.trim() === usersMarkup[i]) {
                    renderUserMarkup(tagLink.textContent.replace(/\W+/g, ''))
                  }
                }
              })
            }}
              dangerouslySetInnerHTML={userMarkup(post.legend)}
            />
            <div className="post-user-image" onClick={() => setUrlPreviewImagePost(post.pathImage)}>
              <img src={post.pathImage} alt="" />
            </div>
          </div>
          <span>
            <i className="fas fa-thumbs-up"> {post.likes}</i>
          </span>
        </div>
        <div className="btn-actions">
          <a href='/' className={`btn ${post.usersLikesPost
            .some(usersLike => usersLike.user_id === userInfo.id) && 'like'}`
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
          }>Gostei</a>
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
  profile: state.friendsInfo.profile,
  comments: state.comments.comments
})

export default connect(mapStateToProps, { postsByUser, addLikePost, removeLikePost, showCommentPost, deletePost, hide })(Post)
