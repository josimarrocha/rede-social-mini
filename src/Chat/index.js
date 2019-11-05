import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import UserInfo from './components/InfoUser'
import ListChat from './components/ListChat'
import Posts from './components/Chat'
import { loadingConversations } from '../reducers/chat/conversations/actionsCreators'
import { newMessage } from '../reducers/chat/posts/actionsCreators'
import { urlChat } from '../config/api'

import { ChatContainer, App } from './styles'

const Chat = ({ loadingConversations, newMessage }) => {
  const [goBack, setGoback] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const loadingChat = async () => {
      await loadingConversations()
    }
    loadingChat()
    const sockett = io(urlChat)
    sockett.on('newMessage', async message => {
      newMessage(message)
      setTimeout(() => loadingConversations(), 200)
    })
  }, [])

  return (
    <App showChat={showChat}>
      <div className={`show-chat ${!showChat && 'bottom'}`}
        onClick={() => {
          const body = document.querySelector('html body')
          setShowChat(!showChat)
          if (!showChat && window.innerWidth <= 740) {
            body.style.overflow = 'hidden'
          } else {
            body.style.overflow = 'auto'
          }
        }}>
        <i className={`fas ${showChat ? 'fa-arrow-down' : 'fa-comments'}`} />
      </div>
      <CSSTransition
        in={showChat}
        timeout={300}
        classNames='show'
        unmountOnExit
      >
        <ChatContainer>
          <UserInfo setGoback={setGoback} goBack={goBack} />
          <div className="content-messages">
            <CSSTransition
              in={goBack}
              timeout={400}
              unmountOnExit
              classNames='fade'
            >
              <Posts />
            </CSSTransition>
            <ListChat setGoback={setGoback} />
          </div>
        </ChatContainer>
      </CSSTransition>
    </App>
  )
}

export default connect(null, { loadingConversations, newMessage })(Chat)
