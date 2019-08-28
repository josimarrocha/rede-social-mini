import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteComment, deleteReplyComment } from '../../../reducers/comments/actionsCreators'
import { UserComment } from './styles'

const Comment = ({ comment, userId, postId, removeLike, addLike, children, answer, idCommentPrincipal, deleteComment, deleteReplyComment }) => {
  const [showOptionsComment, setShowOptionsComment] = useState(false)
  return (
    <UserComment answer={answer}>
      <div className="img-user">
        {comment.image_profile_mini
          ? <img className='img' src={comment.image_profile_mini} alt="" />
          : <img src={`images/user@50.png`} alt="" />
        }
      </div>
      <div className="user-profile">
        <div className="repost-post">
          <div className="options-comment">
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
          </div>
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
                : addLike(postId, comment.comment_id, answer, idCommentPrincipal)
            }}>
            Gostei</b>
        </div>
        {children}
      </div>
    </UserComment>
  )
}

export default connect(null, { deleteComment, deleteReplyComment })(Comment)
