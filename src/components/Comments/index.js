/* eslint-disable array-callback-return */
import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import SendComment from './SendComment'
import {
  showCommentPost,
  addLikeComment,
  removeLikeComment,
  viewMoreComments,
  addNewComment
} from '../../reducers/comments/actionsCreators'
import { ContainerComments } from './styles'

const Comments = ({ showCommentPost, comments, answersComments, postId, userInfo, addLikeComment, removeLikeComment, viewMoreComments, postByUserId }) => {

  const addLike = (comment_id, answer, idCommentPrincipal) => {
    const comment = { post_id: postId, comment_id }
    addLikeComment(comment, answer, idCommentPrincipal)
  }

  const removeLike = (post_id, comment_id, user_id, answer, idCommentPrincipal) => {
    const comment = {
      post_id,
      comment_id,
      user_id
    }
    removeLikeComment(comment, answer, idCommentPrincipal)
  }

  const plusComments = async (page, lastPage, id, type) => {
    if (page < lastPage) {
      page++
      type === 'replies'
        ? await viewMoreComments(page, id, true)
        : await viewMoreComments(page, id, false)
    }
  }

  const renderButtonMoreComments = (page, lastPage, id, func, type, text) => {
    return <span
      onClick={() => func(page, lastPage, id, type)}
      className='more-comments'>
      <b>{text}</b>
    </span>
  }

  const renderCommentsReplies = (commentId) => {
    if (answersComments.hasOwnProperty(commentId)) {
      const { page, lastPage, data } = answersComments[commentId]
      return <div>
        {page !== lastPage &&
          renderButtonMoreComments(page, lastPage, commentId, plusComments, 'replies', 'Ver comentarios anteriores')
        }
        {data.map((replys, i) =>
          <Comment
            key={`replys:${i}`}
            addLike={addLike}
            removeLike={removeLike}
            userId={userInfo.id}
            postId={postId}
            idCommentPrincipal={commentId}
            comment={replys}
            answer={true}
          />
        )}
      </div>
    }
  }

  const renderComments = () => {
    if (comments.hasOwnProperty(postId)) {
      const { page, lastPage, data } = comments[postId]
      return <div>
        {page !== lastPage &&
          renderButtonMoreComments(page, lastPage, postId, plusComments, null, 'Ver comentarios anteriores')
        }
        {data.map((comment, index) =>
          <Comment key={`comment:${index}`}
            addLike={addLike}
            removeLike={removeLike}
            userId={userInfo.id}
            postId={postId}
            comment={comment}
          >
            {+comment.replys > 0 &&
              <span id={`answers:${comment.comment_id}`}
                onClick={() => {
                  showCommentPost(comment.comment_id, true)
                  document.getElementById(`answers:${comment.comment_id}`).textContent = ''
                }}
                className='more-comments'>
                <b>Ver respostas</b>
              </span>
            }
            {renderCommentsReplies(comment.comment_id, comment.replys)}
            <SendComment
              imageProfile={userInfo.image_profile_mini}
              isAnswer={true}
              commentId={comment.comment_id}
              postId={postId}
              userInfo={userInfo}
              postByUserId={postByUserId}
              commentByUserId={comment.user_id}
            />
          </Comment>
        )}
        {/* {+key === postId && page !== lastPage &&
          renderButtonMoreComments(page, lastPage, postId, plusComments, null, 'Ver próximos comentários')
        } */}
      </div>
    }
  }

  return (
    <ContainerComments>
      <div className="comment-content">
        {Object.keys(comments).length > 0 && renderComments()}
      </div>
    </ContainerComments>
  )
}

const mapStateToProps = state => ({
  comments: state.comments.comments,
  answersComments: state.comments.commentsAnswered,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { addNewComment, showCommentPost, addLikeComment, removeLikeComment, viewMoreComments })(Comments)
