import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PendingFriends from '../UserInfo/PendingFriends'
import MenuMobile from '../MenuMobile'
import Notification from '../Notification'
import InputSearch from '../InputSearch'
import { friendsPendingIo, friendsPending } from '../../reducers/friends/actionsCreators'
import { loadingNotifications } from '../../reducers/notifications/actionsCreators'
import { showFriendsPending, showNotifications } from '../../reducers/ui'
import { HeaderContainer } from './styles'
import styles from '../../styles'

const Header = ({ pendingFriends, socket, notifications, friendsPending, loadingNotifications, ui, showNotifications, showFriendsPending }) => {
  const [isMenuMobile, setIsMMenuMobile] = useState(true)

  useEffect(() => {
    socket.friends && socket.friends.on('friendsPending', (type) => {
      if (type === 'notifications') {
        loadingNotifications()
        return
      }
      friendsPending()
    })
    if (window.innerWidth <= styles.containerSmall) {
      setIsMMenuMobile(true)
    } else {
      setIsMMenuMobile(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  window.addEventListener('resize', function (e) {
    if (e.path[0].innerWidth <= styles.containerSmall) {
      setIsMMenuMobile(true)
    }
    else {
      setIsMMenuMobile(false)
    }
  })

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
        {!isMenuMobile ? <InputSearch inHeader={true} /> : <MenuMobile />}
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
  socket: state.socket,
  notifications: state.notifications,
  ui: state.ui
})

export default connect(mapStateToProps, { friendsPendingIo, friendsPending, loadingNotifications, showFriendsPending, showNotifications })(Header)
