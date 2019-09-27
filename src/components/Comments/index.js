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

  const addLike = (post_id, comment_id, answer, idCommentPrincipal) => {
    const comment = { post_id, comment_id }
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

  const renderCommentsReplies = (comment_id) => {
    return Object.keys(answersComments).map((key, i) => {
      const { page, lastPage, data } = answersComments[key]
      return <div key={`answerComment:${i}`}>
        {+key === comment_id && page !== lastPage &&
          renderButtonMoreComments(page, lastPage, comment_id, plusComments, 'replies', 'Ver comentarios anteriores')
        }
        {data.map((replys, i) => {
          if (replys.id === comment_id) {
            return <Comment
              key={`replys:${i}`}
              addLike={addLike}
              removeLike={removeLike}
              userId={userInfo.id}
              postId={postId}
              idCommentPrincipal={comment_id}
              comment={replys}
              answer={true}
            />
          }
        })}
      </div>
    })
  }

  const renderButtonMoreComments = (page, lastPage, id, func, type, text) => {
    return <span
      onClick={() => func(page, lastPage, id, type)}
      className='more-comments'>
      <b>{text}</b>
    </span>
  }

  const renderComments = () => {
    return Object.keys(comments).map((key, i) => {
      const { page, lastPage, data } = comments[key]
      return <div key={`postId:${i}`}>
        {+key === postId && page !== lastPage &&
          renderButtonMoreComments(page, lastPage, postId, plusComments, null, 'Ver comentarios anteriores')
        }
        {data.map((comment, index) => {
          if (comment.post_id === postId) {
            return (
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
            )
          }
        })}
        {/* {+key === postId && page !== lastPage &&
          renderButtonMoreComments(page, lastPage, postId, plusComments, null, 'Ver próximos comentários')
        } */}
      </div>
    })
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
