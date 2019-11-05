import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PendingFriends from '../UserInfo/PendingFriends'
import MenuMobile from '../MenuMobile'
import Notification from '../Notification'
import InputSearch from '../InputSearch'
import Chat from '../../Chat'
import { showFriendsPending, showNotifications } from '../../reducers/ui'
import { loadingNotifications } from '../../reducers/notifications/actionsCreators'
import { friendsPending } from '../../reducers/friends/actionsCreators'

import { HeaderContainer } from './styles'

const Header = ({ pendingFriends, notifications, isNotification, isFriendsPending, showNotifications, showFriendsPending, loadingNotifications, friendsPending, userInfo }) => {
  const [hideIcons, setHideIcons] = useState(false)
  useEffect(() => {
    friendsPending()
    loadingNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    localStorage.removeItem('@midiasocial@')
    localStorage.removeItem('@chat-midiasocial@')
    window.location.href = window.location.origin + '/rede-social-mini'
  }

  const numberNotification = () => {
    const number = notifications.filter(noti => !noti.viewed).length
    if (number > 0) {
      return (
        <b>{number}</b>
      )
    }
  }

  return (
    <HeaderContainer>
      <div className="header-content">
        <div className='div'>
          <div className="header-logo">
            <Link to='/'><h2>Rede</h2></Link>
          </div>
          {!hideIcons &&
            <>
              <span className='friends-pending'
                onClick={() => showFriendsPending(!isFriendsPending)}>
                {isFriendsPending &&
                  <PendingFriends showFriendsPending={showFriendsPending} />
                }
                <i className="fas fa-user-friends">
                  {!!pendingFriends.length && <b>{pendingFriends.length}</b>}
                </i>
              </span>
              <span className='notifications'
                onClick={() => showNotifications(!isNotification)}>
                {isNotification &&
                  <Notification showNotifications={showNotifications} />
                }
                <i className="fas fa-bell">
                  {!!notifications.length && numberNotification()}
                </i>
              </span>
              <Link to={`/${userInfo.username}/${userInfo.id}`}>
                <span className='my-perfil'>Meu perfil</span>
              </Link>
            </>
          }
        </div>
        <InputSearch
          inHeader={true}
          hideIcons={hideIcons}
          setHideIcons={setHideIcons} />
        <div className="icon-search" onClick={() => {
          setHideIcons(!hideIcons)
        }}>
          <i className="fas fa-search"></i>
        </div>

        <MenuMobile />
        <div className="logout" onClick={logout}>
          <p>Sair</p>
        </div>
      </div>
    </HeaderContainer>
  )
}

const mapStateToProps = state => ({
  pendingFriends: state.friendsInfo.friendsPending,
  userInfo: state.userInfo,
  notifications: state.notifications,
  isNotification: state.ui.showNotifications,
  isFriendsPending: state.ui.showFriendsPending,
})

export default connect(mapStateToProps, { showFriendsPending, showNotifications, loadingNotifications, friendsPending })(Header)
