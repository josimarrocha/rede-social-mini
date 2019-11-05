import React, { useState } from 'react'
import { connect } from 'react-redux'
import getHours from '../../../../config/getHours'
import { loadingPosts, changeUserActive } from '../../../../reducers/chat/posts/actionsCreators'
import { updateStatus } from '../../../../reducers/chat/conversations/actionsCreators'
import imageUserDefault from '../../../../assets/images/user@150.png'
import { UserConversation } from './styles'

const UserChat = ({ userChat, loadingPosts, lastUpdate, updateStatus, posts, messagesNotRead, setIsShowConfirm, setDeleteUser, idConversation, changeUserActive, setGoback }) => {
  const [isMenuOptions, setIsMenuOptions] = useState(false)

  const handleClickList = (idConversation) => {
    if (posts[idConversation]) {
      changeUserActive({ ...userChat, idConversation, messagesNotRead })
      return
    }
    loadingPosts({ ...userChat, idConversation, messagesNotRead })
    updateStatus(true)

  }

  return (
    <UserConversation
      onClickCapture={() => {
        setGoback(true)
        handleClickList(idConversation)
      }}>
      <div className="user-image">
        <img src={userChat.imageProfile
          ? userChat.imageProfile
          : imageUserDefault} alt="" />
      </div>
      <div className="user-info">
        <div className="user-name">
          <h4>{userChat.name.length >= 18 ? userChat.name.substring(0, 18) + '...' : userChat.name}</h4>
          <p>{userChat.username}</p>
          {!!messagesNotRead &&
            <span className='messages-not-read'>
              {messagesNotRead}
            </span>}
        </div>
      </div>
      <div className="last-update">
        {lastUpdate && <span>{getHours(lastUpdate, 'list')}</span>}
      </div>

      <div className="btn-user-options"
        onClick={() => {
          setGoback(false)
          setIsMenuOptions(!isMenuOptions)
        }}
        onMouseLeave={() => setIsMenuOptions(false)}>
        <i className="fas fa-ellipsis-v"></i>
        {isMenuOptions && <ul className='user-options'>
          <li onClick={() => {
            setIsShowConfirm(true)
            setDeleteUser({
              idUser: userChat.uuid,
              idConversation
            })
          }}>Excluir mensagens</li>
        </ul>}
      </div>
    </UserConversation>
  )
}

const mapStateToProps = state => ({
  listConversations: state.chat.listConversations,
  userActive: state.chat.messages.userActive,
  posts: state.chat.messages.posts
})

export default connect(mapStateToProps, { loadingPosts, updateStatus, changeUserActive })(UserChat)
