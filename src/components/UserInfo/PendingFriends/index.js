import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { friendsPending, confirmFriend, showFriends, loadingProfile } from '../../../reducers/friends/actionsCreators'
import { PendingFriendsConatiner, PendingFriendsContent } from './styles'

const PendingFriends = ({ loadingProfile, profile, friendsPending, friendsInfo, confirmFriend, showFriends }) => {
  useEffect(() => {
    friendsPending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confirmFriendship = async (id) => {
    await confirmFriend(id)
    await friendsPending()
    await showFriends(profile.id)
    loadingProfile(profile.id)
  }

  return (
    <PendingFriendsConatiner>
      <div className="pending-friends-header">
        <p>Amigos pendentes</p>
      </div>
      <PendingFriendsContent>
        {!friendsInfo.length ?
          <p>Nenhuma amizade pendente</p>
          : friendsInfo.map(friendsPend => (
            <div className="pending-friends" key={`friendPending:${friendsPend.friend_id}`}>
              <div className="img-friend">
                {friendsPend.image_profile_mini
                  ? <img src={`http://localhost:3333/imageProfile/${friendsPend.image_profile_mini}`} alt="" />
                  : <img src={`images/user@50.png`} alt="" />
                }
              </div>
              <div className="pending-friend">
                <p className="friend-name">{friendsPend.name}</p>
                <div className="actions">
                  <button onClick={() => confirmFriendship(friendsPend.friend_id)}>Adicionar</button>
                  <button>Remover</button>
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
