import React from 'react'
import { UserComment } from './styles'

const Comment = ({ comment, userId, postId, removeLike, addLike, children, answer, idCommentPrincipal }) => {
  return (
    <UserComment answer={answer}>
      <div className="img-user">
        {comment.image_profile_mini
          ? <img className='img' src={`http://localhost:3333/imageProfile/${comment.image_profile_mini}`} alt="" />
          : <img src={`images/user@50.png`} alt="" />
        }
      </div>
      <div className="user-profile">
        <div className="repost-post">
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

export default Comment
