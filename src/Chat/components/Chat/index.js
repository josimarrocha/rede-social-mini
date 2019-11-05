import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import { CSSTransition } from 'react-transition-group'
import Posts from './Posts'
import { updateMessageRead, changeUserActive } from '../../../reducers/chat/posts/actionsCreators'
import { loadingConversations } from '../../../reducers/chat/conversations/actionsCreators'
import SendMessage from './SendMessage'
import { ContainerChat, LineScroll } from './styles'

let positionLine = {}
const Chat = ({ userActive }) => {
  const [urlPreviewImage, setUrlPreviewImage] = useState("")
  const [loadingMessages, setLoadingMessages] = useState(false)
  const containerChatRef = useRef()
  const lineRefTop = useRef()
  const lineRefBottom = useRef()

  useEffect(() => {
    positionLine = {
      top: lineRefTop.current.getBoundingClientRect().bottom,
      bottom: lineRefBottom.current.getBoundingClientRect().top
    }
    return () => {
      changeUserActive({})
    }
  }, [])

  useEffect(() => {
    renderContainerPosts()
  }, [userActive.idConversation])

  const renderContainerPosts = () => {
    return (
      <Posts
        positionLine={positionLine}
        idConversation={userActive.idConversation}
        containerChatRef={containerChatRef}
        setUrlPreviewImage={setUrlPreviewImage}
        setLoadingMessages={setLoadingMessages}
        loadingMessages={loadingMessages}
      />
    )
  }

  return (
    <>
      <CSSTransition
        in={!!urlPreviewImage}
        timeout={300}
        classNames='preview'
        unmountOnExit
      >
        <div className="preview-image">
          <div className="close-preview" onClick={() => setUrlPreviewImage(false)}>
            <i className="fas fa-times"></i>
          </div>
          <figure>
            {urlPreviewImage && <img src={urlPreviewImage} alt="" />}
          </figure>
        </div>
      </CSSTransition>

      <ContainerChat>
        <div className="loader-mensagens">
          <PulseLoader
            loading={loadingMessages}
            color='#7693d2'
          />
        </div>
        {userActive.hasOwnProperty('uuid') && renderContainerPosts()}
        <LineScroll ref={lineRefTop} top={true} />
        <LineScroll ref={lineRefBottom} />

        <SendMessage
          containerChatRef={containerChatRef}
        />
      </ContainerChat>
    </>
  )
}
const mapStateToProps = state => ({
  userActive: state.chat.messages.userActive
})

export default connect(mapStateToProps, { loadingConversations, updateMessageRead, changeUserActive })(Chat)