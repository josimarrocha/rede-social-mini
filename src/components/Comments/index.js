import React, { useEffect, useState } from 'react'
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

const Comments = ({ showCommentPost, comments, answersComments, postId, userInfo, addLikeComment, removeLikeComment, viewMoreComments, emitComment }) => {
  const textareaRef = React.createRef()
  const textareaRef2 = React.createRef()

  const adicionaComment = async (e, { isAnswer, commentId }) => {
    if (e.charCode === 13) {
      if (e.target.value.replace(/\s+/g, '') !== '') {
        const commente = {
          post_id: postId,
          comment_id: commentId,
          comment: e.target.value,
          image_comment: 'imagem'
        }
        if (isAnswer) {
          emitComment.answersComment.emit('newAnswersComment', commente)
        } else {
          emitComment.comment.emit('newComment', commente)
        }
        e.target.value = e.target.value.replace(/(.|\s|\n)*/g, '')
      }
    }
  }

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

  const plusComments = (page, lastPage, postId) => {
    if (page < lastPage) {
      page++
      viewMoreComments(page, postId)
    }
  }

  const plusAnswersComment = async (page, lastPage, comment_id) => {
    if (page < lastPage) {
      page++
      await viewMoreComments(page, comment_id, true)
    }
  }

  const renderCommentsReply = (comment_id, numberReplys) => {
    return Object.keys(answersComments).map((key, i) => {
      const { page, lastPage, data } = answersComments[key]
      return <div key={`answerComment:${i}`}>
        {+key === comment_id && page !== lastPage &&
          renderButtonMoreComments(page, lastPage, comment_id, plusAnswersComment)
        }
        {data.map((replys, i) => {
          if (replys.id === comment_id) {
            return (
              <Comment
                key={`replys:${i}`}
                addLike={addLike}
                removeLike={removeLike}
                userId={userInfo.id}
                postId={postId}
                idCommentPrincipal={comment_id}
                comment={replys}
                answer={true}
              />
            )
          }
        })}
      </div>
    })
  }

  const renderButtonMoreComments = (page, lastPage, postId, func) => {
    return <a href='/'
      onClick={(e) => {
        e.preventDefault()
        func(page, lastPage, postId)
      }}
      className='more-comments'>
      <b>Ver comentarios anteriores</b>
    </a>
  }

  const renderComments = () => {
    return Object.keys(comments).map((key, i) => {
      const { page, lastPage, data } = comments[key]
      return <div key={`postId:${i}`}>
        {+key === postId && page !== lastPage &&
          renderButtonMoreComments(page, lastPage, postId, plusComments)
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
                  <a href='/'
                    id={`answers:${comment.comment_id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      showCommentPost(comment.comment_id, true)
                      document.getElementById(`answers:${comment.comment_id}`).remove()
                    }}
                    className='more-comments'>
                    <b>Ver respostas</b>
                  </a>
                }
                {renderCommentsReply(comment.comment_id, comment.replys)}
                <SendComment
                  addComment={adicionaComment}
                  imageProfile={userInfo.image_profile_mini}
                  textareaRef={textareaRef2}
                  isAnswer={true}
                  commentId={comment.comment_id}
                />
              </Comment>
            )
          }
        })}
      </div>
    })
  }

  return (
    <ContainerComments>
      <div className="comment-content">
        {Object.keys(comments).length > 0 && renderComments()}
        <SendComment
          addComment={adicionaComment}
          imageProfile={userInfo.image_profile_mini}
          textareaRef={textareaRef}
        />
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
