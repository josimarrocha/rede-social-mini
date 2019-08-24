import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PendingFriends from '../UserInfo/PendingFriends'
import MenuMobile from '../MenuMobile'
import InputSearch from '../InputSearch'
import { friendsPendingIo } from '../../reducers/friends/actionsCreators'
import { HeaderContainer } from './styles'
import styles from '../../styles'

const Header = ({ pendingFriends, userInfo, socket, friendsPendingIo }) => {
  const [isModalFriendsPending, setIsModalFriendsPending] = useState(false)
  const [isMenuMobile, setIsMMenuMobile] = useState(true)

  useEffect(() => {
    socket.friends && socket.friends.on('pendingFriends', (data) => {
      friendsPendingIo(data)
    })
    if (window.innerWidth <= styles.containerSmall) {
      setIsMMenuMobile(true)
    } else {
      setIsMMenuMobile(false)
    }
  }, [])

  window.addEventListener('resize', function (e) {
    if (e.path[0].innerWidth <= styles.containerSmall) {
      setIsMMenuMobile(true)
    }
    else {
      setIsMMenuMobile(false)
    }
  })

  return (
    <HeaderContainer>
      <div className="header-content">
        <div>
          <div className="header-logo">
            <Link to='/'><h2>Midia</h2></Link>
          </div>
          <span onClick={() => setIsModalFriendsPending(!isModalFriendsPending)}>
            {isModalFriendsPending &&
              <PendingFriends
                setIsModalFriendsPending={setIsModalFriendsPending}
              />
            }
            <i className="fas fa-user-friends">
              {!!pendingFriends.length && <b>{pendingFriends.filter(item => item.friend_id !== userInfo.id).length}</b>}
            </i>
          </span>
        </div>
        {!isMenuMobile ? <InputSearch /> : <MenuMobile />}
      </div>
    </HeaderContainer>
  )
}

const mapStateToProps = state => ({
  pendingFriends: state.friendsInfo.friendsPending,
  userInfo: state.userInfo,
  socket: state.socket
})

export default connect(mapStateToProps, { friendsPendingIo })(Header)
