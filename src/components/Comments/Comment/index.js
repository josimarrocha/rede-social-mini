import React, { useState } from 'react'
import api from '../../../config/api'
import { connect } from 'react-redux'
import { deleteComment, deleteReplyComment } from '../../../reducers/comments/actionsCreators'
import { friendsIO } from '../../../config/util'
import { UserComment } from './styles'

const Comment = ({ comment, userId, postId, removeLike, addLike, children, answer, idCommentPrincipal, deleteComment, deleteReplyComment }) => {
  const [showOptionsComment, setShowOptionsComment] = useState(false)
  const [isComponentSend, setIsComponentSend] = useState(false)

  const createNotificationLike = async () => {

    try {
      userId !== comment.user_id && await api.post('/notification', {
        user_id: comment.user_id,
        action_id: 1,
        post_id: postId,
        comment_id: comment.comment_id
      })
      friendsIO.emit('pendingFriends', 'notifications')
    } catch (error) {

    }
  }
  const createLikeComment = () => {
    addLike(postId, comment.comment_id, answer, idCommentPrincipal)
    createNotificationLike()
  }

  return (
    <UserComment answer={answer}>
      <div className="img-user">
        {comment.image_profile_mini
          ? <img className='img' src={comment.image_profile_mini} alt="" />
          : <img src={`images/user@50.png`} alt="" />
        }
      </div>
      <div className="user-profile">
        <div id={`comment${comment.comment_id && comment.comment_id}`} className="repost-post">
          {comment.user_id === userId && <div className="options-comment">
            <i className="fas fa-ellipsis-v" onClick={() => setShowOptionsComment(!showOptionsComment)}></i>
            {showOptionsComment &&
              <ul className='options' onClick={() => {
                if (!answer) {
                  deleteComment(postId, comment.comment_id)
                } else {
                  deleteReplyComment(idCommentPrincipal, comment.comment_id)
                }
                setShowOptionsComment(!showOptionsComment)
              }}>
                <li>Excluir</li>
              </ul>
            }
          </div>}
          <b>{comment.name}</b>
          <div className="user-comment-post">
            <p>{comment.comment}</p>
          </div>
        </div>

        <div className="comments-actions">
          <i className="fas fa-thumbs-up"><span>{comment.likes} - </span></i>
          <b className={`${!!comment.numberLikes && comment.numberLikes
            .some(userLike => userLike.user_id === userId) && 'activeLike'}`}
            onClick={() => {
              comment
                .numberLikes
                .some(userLike => userLike.user_id === userId)
                ? removeLike(postId, comment.comment_id, userId, answer, idCommentPrincipal)
                : createLikeComment()
            }}>
            Gostei</b>
          {!answer &&
            <span
              className='reply'
              onClick={() => setIsComponentSend(!isComponentSend)}>Responder
            </span>
          }
        </div>
        {isComponentSend && children}
      </div>
    </UserComment>
  )
}

export default connect(null, { deleteComment, deleteReplyComment })(Comment)
