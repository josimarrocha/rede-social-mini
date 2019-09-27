import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import pathImageDefault from '../../../config/util'
import { connect } from 'react-redux'
import { FreindsContainer, Friend } from './styles'

const Friends = ({ friends, friendsPending }) => {
  useEffect(() => {
    renderFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends, friendsPending])

  const renderFriends = () => {
    return (
      friends.map(friend => (
        <Link to={`/${friend.username}/${friend.id}`} key={`friend:${friend.id}`}>
          <Friend>
            <div className="friend-img">
              <img src={friend.image_profile_mini
                ? friend.image_profile_mini
                : `${pathImageDefault.pathImageDev}/user@50.png`} alt=""
              />
            </div>
            <div className="friend-name">
              <p>{friend.name}</p>
            </div>
          </Friend>
        </Link>
      ))
    )
  }

  return (
    <FreindsContainer>
      <div className="friends-header">
        <p>Amigos ({friends.length})</p>
      </div>
      <div className='friends-content'>
        <div>
          {!!friends.length
            ? renderFriends()
            : <p>Nenhum amigo adicionado</p>
          }
        </div>

      </div>
    </FreindsContainer>
  )
}

const mapStateToProps = state => ({
  friends: state.friendsInfo.friends,
  friendsPending: state.friendsInfo.friendsPending,
  userInfo: state.userInfo
})

export default connect(mapStateToProps)(Friends)
