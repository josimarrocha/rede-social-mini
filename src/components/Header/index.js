import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PendingFriends from '../UserInfo/PendingFriends'
import MenuMobile from '../MenuMobile'
import Notification from '../Notification'
import InputSearch from '../InputSearch'
import { showFriendsPending, showNotifications } from '../../reducers/ui'
import { loadingNotifications } from '../../reducers/notifications/actionsCreators'
import { friendsPending } from '../../reducers/friends/actionsCreators'

import { HeaderContainer } from './styles'
import styles from '../../styles'

const Header = ({ pendingFriends, notifications, ui, showNotifications, showFriendsPending, loadingNotifications, friendsPending }) => {
  const [isMenuMobile, setIsMMenuMobile] = useState(true)

  useEffect(() => {
    friendsPending()
    loadingNotifications()
    if (window.innerWidth <= styles.containerSmall) {
      setIsMMenuMobile(true)
    } else {
      setIsMMenuMobile(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    localStorage.removeItem('@midiasocial@')
    window.location.reload()
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
        <div>
          <div className="header-logo">
            <Link to='/'><h2>REDE</h2></Link>
          </div>
          <span
            className='friends-pending'
            onClick={() => showFriendsPending()}>
            {ui.showFriendsPending &&
              <PendingFriends />
            }
            <i className="fas fa-user-friends">
              {!!pendingFriends.length && <b>{pendingFriends.length}</b>
              }
            </i>
          </span>
          <span
            className='notifications'
            onClick={() => showNotifications()}>
            {ui.showNotifications &&
              <Notification />
            }
            <i className="fas fa-bell">
              {!!notifications.length && numberNotification()}
            </i>
          </span>
        </div>
        <InputSearch inHeader={true} />
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
  ui: state.ui
})

export default connect(mapStateToProps, { showFriendsPending, showNotifications, loadingNotifications, friendsPending })(Header)
