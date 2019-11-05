import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Picker } from 'emoji-mart'
import { socket } from '../../../../config/api'
import { loadingConversations } from '../../../../reducers/chat/conversations/actionsCreators'
import 'emoji-mart/css/emoji-mart.css'
import { getAPIChat } from '../../../../config/api'
import { ContainerSend, PreviewImg } from './styles'

const SendMessage = ({ userActive, userInfo, containerChatRef }) => {
  const [messageText, setMessageText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [fileImg, setFileImg] = useState(null)
  const textareaRef = useRef()

  const sendMessage = async () => {
    if (messageText.trim() !== '' || fileImg) {
      const data = new FormData()
      data.append('userId', userActive.uuid)
      data.append('message', messageText)
      data.append('image', fileImg ? fileImg : '')
      await getAPIChat().post('conversation/message', data)
      if (containerChatRef.current) {
        containerChatRef.current.scrollTop = containerChatRef.current.scrollHeight
      }
      setMessageText('')
      setFileImg(null)
      let messageWarning = document.querySelector('.warningMessage')
      if (messageWarning) {
        messageWarning.remove()
      }
    }
  }

  const onChangeTextArea = (e) => {
    setMessageText(e.target.value)
    socket.emit('writing', {
      idUser: userInfo.id,
      idConversation: userActive.idConversation
    })
  }

  const addEmoji = (e) => {
    let emoji = e.native;
    setMessageText(messageText + emoji)
  }

  return (
    <ContainerSend>
      {fileImg && <PreviewImg>
        <div className="header">
          <div className="image-name">
            <p>{fileImg.name}</p>
          </div>
          <div className="close" onClick={() => setFileImg(null)}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="img-content">
          <img src={URL.createObjectURL(fileImg)} alt="" />
        </div>
      </PreviewImg>}
      <div className="message-content">
        {showEmoji &&
          <>
            <div className='close-picker' onClick={() => {
              textareaRef.current.focus()
              setShowEmoji(false)
            }} />
            <Picker
              onSelect={addEmoji}
              set={'google'}
              style={{ position: 'absolute', bottom: '100px', left: 0, zIndex: 25 }}
            />
          </>
        }
        <textarea
          cols="50"
          rows="2"
          ref={textareaRef}
          placeholder='Escreva uma mensagem'
          value={messageText}
          onChange={onChangeTextArea}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              sendMessage()
            }
          }}
        />
      </div>
      <input type="file"
        id="#file"
        hidden
        onChange={({ target: { files } }) => setFileImg(files[0])}
      />

      <div className="icons">
        <i className="far fa-laugh"
          onClick={() => {
            setShowEmoji(!showEmoji)
          }} />
        <label htmlFor="#file">
          <i className="fas fa-image" />
        </label>
      </div>
      <div className="btn-send">
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </ContainerSend>
  )
}

const mapStateToProps = state => ({
  userActive: state.chat.messages.userActive,
  listConversations: state.chat.conversations,
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { loadingConversations })(SendMessage)