import React from 'react'
import { SendCommentContainer } from './styles'

const SendComment = ({ textareaRef, addComment, imageProfile, isAnswer, commentId }) => {
  return (
    <SendCommentContainer answer={isAnswer}>
      <div className="img-user-logged">
        {imageProfile
          ? <img className='img' src={imageProfile} alt="" />
          : <img src={`images/user@50.png`} alt="" />
        }
      </div>
      <form action="">
        <textarea
          ref={textareaRef} rows="2" cols="50"
          placeholder='Escreva um comentário'
          onKeyPress={(e) => addComment(e, { isAnswer, commentId })}
          onInput={(e) => {
            if (textareaRef.current.scrollHeight > textareaRef.current.offsetHeight) textareaRef.current.rows += 1
          }} />
      </form>
    </SendCommentContainer>
  )
}

export default SendComment
