import React from 'react'
import { connect } from 'react-redux'
import api from '../../../config/api'
import { addNewComment } from '../../../reducers/comments/actionsCreators'
import pathImageDefault, { commentIO, friendsIO } from '../../../config/util'
import { SendCommentContainer } from './styles'

const SendComment = ({ imageProfile, isAnswer, commentId, postId, userInfo, postByUserId, commentByUserId, addNewComment }) => {
  const textareaRef = React.createRef()

  const createNotificationComment = async (userId, comment_id) => {
    if (userInfo.id !== userId) {
      await api.post('/notification', {
        user_id: userId,
        action_id: isAnswer ? 4 : 3,
        post_id: postId,
        comment_id
      })
    }
  }

  const addComment = async (e, { isAnswer, commentId }, type) => {
    const commente = {
      post_id: postId,
      comment_id: commentId,
      comment: '',
      image_comment: 'imagem'
    }
    const commentWhere = isAnswer ? 'post/new/comment/reply' : 'post/new/comment'

    if (e.charCode === 13 || type === 'button') {
      if (textareaRef.current.value.replace(/\s+/g, '') !== '') {
        try {
          const { data } = await api.post(commentWhere, { ...commente, comment: textareaRef.current.value })

          isAnswer
            ? addNewComment(commentId, data, true)
            : addNewComment(postId, data)
          isAnswer
            ? createNotificationComment(commentByUserId, commentId)
            : createNotificationComment(postByUserId, data.comment_id)

          commentIO.emit(isAnswer ? 'newAnswersComment' : 'newComment', data)
          friendsIO.emit('pendingFriends', 'notifications')
        } catch (error) {

        }

        textareaRef.current.value = textareaRef.current.value.replace(/(.|\s|\n)*/g, '')
        return true
      }
    }
  }
  return (
    <SendCommentContainer answer={isAnswer}>
      <div className="img-user-logged">
        <img className='img'
          src={imageProfile ? imageProfile : `${pathImageDefault.pathImageDev}/user@50.png`}
          alt="" />
      </div>
      <form action="">
        <textarea
          name='textarea'
          ref={textareaRef} rows="1" cols="50"
          placeholder='Escreva um comentário'
          onKeyPress={(e) => addComment(e, { isAnswer, commentId })}
          onInput={(e) => {
            if (textareaRef.current.scrollHeight > textareaRef.current.offsetHeight) textareaRef.current.rows += 1
          }} />
        <span>
          <button type='button' onClick={(e) => addComment(e, { isAnswer, commentId }, 'button')}>Enviar</button>
        </span>
      </form>
    </SendCommentContainer>
  )
}

export default connect(null, { addNewComment })(SendComment)
