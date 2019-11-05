import React, { useState } from 'react'
import { connect } from 'react-redux'
import UserChat from './UserChat'
import Confirm from '../Confirm'
import { cleanPosts } from '../../../reducers/chat/posts/actionsCreators'
import { loadingConversations } from '../../../reducers/chat/conversations/actionsCreators'
import { ContainerList } from './styles'

const ListChat = ({ listConversations, cleanPosts, loadingConversations, setGoback }) => {
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const [deleteUser, setDeleteUser] = useState({})

  const deleteConversation = async () => {
    await cleanPosts(deleteUser)
    loadingConversations()
    setIsShowConfirm(false)
  }

  return (
    <>
      {isShowConfirm &&
        <Confirm
          deleteConversation={deleteConversation}
          setIsShowConfirm={setIsShowConfirm} />
      }
      <ContainerList>
        <div className="content">
          {!listConversations.contacts.length ?
            <div className='add-user'>
              Você não tem amigos para iniciar um bate-papo<br />
            </div>
            :
            <ul className="list-conversas">
              {listConversations.contacts.map((conversation, i) => (
                <UserChat
                  key={i}
                  setGoback={setGoback}
                  userChat={conversation.user}
                  lastUpdate={conversation.updatedAt}
                  idConversation={conversation.idConversation}
                  messagesNotRead={conversation.messagesNotRead}
                  setDeleteUser={setDeleteUser}
                  setIsShowConfirm={setIsShowConfirm}
                />
              ))}
            </ul>
          }
        </div>
      </ContainerList>
    </>
  )
}

const mapStateToProps = state => ({
  listConversations: state.chat.conversations
})

export default connect(mapStateToProps, { cleanPosts, loadingConversations })(ListChat)
