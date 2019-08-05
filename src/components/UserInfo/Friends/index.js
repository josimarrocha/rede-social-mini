import React from 'react'
import { connect } from 'react-redux'
import { FreindsContainer, Friend } from './styles'

const Friends = ({ friends }) => {
  return (
    <FreindsContainer>
      <div className="friends-header">
        <p>Amigos</p>
      </div>
      <div className="friends-content">
        <div>
          {friends.map(friend => (
            <Friend key={`friend:${friend.id}`}>
              <div className="friend-img">
                {friend.image_profile_mini && <img src={`http://localhost:3333/imageProfile/${friend.image_profile_mini}`} alt="" />}
              </div>
              <div className="friend-name">
                {friend.friend_name && <p>{friend.username}</p>}
              </div>
            </Friend>
          ))}
        </div>

      </div>
    </FreindsContainer>
  )
}

const mapStateToProps = state => ({
  friends: state.initialDataProfile.friends
})

export default connect(mapStateToProps)(Friends)
