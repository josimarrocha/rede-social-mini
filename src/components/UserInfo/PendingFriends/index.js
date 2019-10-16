import React, { useEffect, useRef } from 'react'
import api from '../../../config/api'
import { connect } from 'react-redux'
import { friendsPending, confirmFriend, showFriends, loadingProfile } from '../../../reducers/friends/actionsCreators'
import pathImageDefault from '../../../config/util'
import { PendingFriendsConatiner, PendingFriendsContent } from './styles'

const PendingFriends = ({ profile, friendsPending, friendsInfo, confirmFriend, showFriends, showFriendsPending }) => {
  const containerRef = useRef()
  useEffect(() => {
    friendsPending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    containerRef.current.focus()
  }, [])

  const confirmFriendship = async (id) => {
    await confirmFriend(id)
    await friendsPending()
    await showFriends(profile.id)
    // loadingProfile(profile.id)
  }
  const removeUser = async (userId) => {
    await api.delete(`/profile/friend/delete/${userId}`)
    await friendsPending()
  }

  return (
    <PendingFriendsConatiner ref={containerRef} tabIndex={0} onBlur={() => setTimeout(() => showFriendsPending(false), 200)}>
      <div className="pending-friends-header">
        <p>Amigos pendentes</p>
      </div>
      <PendingFriendsContent>
        {!friendsInfo.length ?
          <p>Nenhuma amizade pendente</p>
          : friendsInfo.map(friendsPend => (
            <div className="pending-friends" key={`friendPending:${friendsPend.friend_id}`}>
              <div className="img-friend">
                <img src={friendsPend.image_profile_mini ? friendsPend.image_profile_mini : `${pathImageDefault.pathImageDev}/user@50.png`} alt="" />
              </div>
              <div className="pending-friend">
                <p className="friend-name">{friendsPend.name}</p>
                <div className="actions">
                  <button onClick={() => confirmFriendship(friendsPend.friend_id)}>Adicionar</button>
                  <button onClick={() => removeUser(friendsPend.friend_id)}>Remover</button>
                </div>
              </div>
            </div>
          ))}
      </PendingFriendsContent>
    </PendingFriendsConatiner>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  friendsInfo: state.friendsInfo.friendsPending,
  profile: state.friendsInfo.profile
})

export default connect(mapStateToProps, { friendsPending, confirmFriend, showFriends, loadingProfile })(PendingFriends)
