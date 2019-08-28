import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FreindsContainer, Friend } from './styles'

const Friends = ({ friends }) => {
  useEffect(() => {
    renderFriends()
  }, [friends])

  const renderFriends = () => {
    return (
      friends.map(friend => (
        <Link to={`/${friend.username}/${friend.id}`} key={`friend:${friend.id}`}>
          <Friend>
            <div className="friend-img">
              {friend.image_profile_mini
                ? <img src={friend.image_profile_mini} alt="" />
                : <img src={`/images/user@50.png`} alt="" />
              }
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
        <p>Amigos</p>
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
  friends: state.friendsInfo.friends
})

export default connect(mapStateToProps)(Friends)
