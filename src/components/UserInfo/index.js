import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import api from '../../config/api'
import { updateNameUser, updateDescription } from '../../reducers/userInfo/actionsCreators'
import { loadingProfile, friendsPendingIo } from '../../reducers/friends/actionsCreators'
import Friends from './Friends'
import UserAccountConfig from './UserAccountConfig'
import { UserAccountContainer, UserInfoContainer, UserImg, UserData, UserImgbackground } from './styles'

const UserInfo = ({ userInfo, profile, updateNameUser, visitProfile, loadingProfile, updateDescription, socket, friendsPendingIo }) => {
  const [isMenuConfigUser, setIsMenuConfigUser] = useState(false)
  const [isUpdateNameUser, setIsUpdateNameUser] = useState(false)
  const [isUpdateDescription, setIsUpdateDescription] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    if (visitProfile) {
      setProfileInfo(profile)
    } else {
      setProfileInfo(userInfo)
    }
    setNameInput(userInfo.username)
  }, [userInfo, profile])

  const updateName = () => {
    if (nameInput !== userInfo.username) {
      updateNameUser(nameInput)
      setIsUpdateNameUser(false)
    }
    setIsUpdateNameUser(false)
  }
  const removeProfile = async id => {
    await api.delete(`/profile/friend/delete/${id}`)
    await loadingProfile(id)
  }

  const descriptionUpdate = () => {
    if (descriptionText !== userInfo.description) {
      updateDescription(descriptionText)
      setIsUpdateDescription(false)
    }
    setIsUpdateDescription(false)
  }

  const addProfile = async (id) => {
    await api.get(`/profile/friend/newFriend/${id}`)
    await loadingProfile(id)
    socket.friends.emit('pendingFriends', id)
  }

  return (
    <UserAccountContainer>
      <UserInfoContainer>
        {!visitProfile &&
          <div className="menu-user-config"
            onClick={() => setIsMenuConfigUser(!isMenuConfigUser)}>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        }
        <UserImgbackground>
        </UserImgbackground>
        {isMenuConfigUser &&
          <UserAccountConfig
            setIsMenuConfigUser={setIsMenuConfigUser}
            setIsUpdateNameUser={setIsUpdateNameUser}
            setIsUpdateDescription={setIsUpdateDescription}
          />
        }

        <UserImg>
          {profileInfo.image_profile
            ? <img src={`http://localhost:3333/imageProfile/${profileInfo.image_profile}`} alt="" />
            : <img src={`http://localhost:3000/images/user@150.png`} alt="" />
          }
        </UserImg>
        <UserData>
          <div className="user-info-username">
            {!isUpdateNameUser ? <h3>{profileInfo.name}</h3>
              : <div>
                <input
                  type="text"
                  defaultValue={userInfo.name}
                  onChange={({ target: { value } }) => setNameInput(value)} />
                <div className="actions">
                  <button onClick={updateName}>
                    <i className="fas fa-check-circle" />Alterar
                  </button>
                  <button onClick={() => setIsUpdateNameUser(false)}>
                    <i className="fas fa-window-close" />Cancelar
                  </button>
                </div>
              </div>
            }

          </div>
          <div className="user-info-describe">
            <p>
              {userInfo.description
                ? userInfo.description
                : !isUpdateDescription && <>
                  Nenhuma descrição
                    <span onClick={() => setIsUpdateDescription(true)}>
                    <i className="far fa-edit"></i>Adicionar
                    </span>
                </>
              }
            </p>
            {isUpdateDescription &&
              <>
                <textarea
                  name=""
                  cols="30"
                  rows="5"
                  placeholder='Digite uma descrição para seu perfil'
                  defaultValue={userInfo.description}
                  onChange={({ target: { value } }) => setDescriptionText(value)}
                />
                <div className="actions">
                  <button onClick={descriptionUpdate}>
                    <i className="fas fa-check-circle" />Alterar
                  </button>
                  <button onClick={() => setIsUpdateDescription(false)}>
                    <i className="fas fa-window-close" />Cancelar
                  </button>
                </div>
              </>
            }
          </div>
          {!visitProfile && <div className="user-info-email">
            <p>{userInfo.email}</p>
          </div>}
          <div className="user-info-local">
            <p>Brasil, São Paulo, SP</p>
          </div>

          <div className='profile-status'>
            {profileInfo.isFriend === true &&
              <>
                <span className='profile-status-friend'>
                  <i className="fas fa-check-circle" /> Amigos
                </span>
                <a href="/" className='profile-rm' onClick={(e) => {
                  e.preventDefault()
                  removeProfile(profileInfo.id)
                }}>Desfazer amizade</a>
              </>
            }

            {profileInfo.isFriend === null &&
              <div className='profile-add'>
                <a href="/" onClick={(e) => {
                  e.preventDefault()
                  addProfile(profileInfo.id)
                }}>
                  <i className="fas fa-user-plus" />Adicionar aos amigos
                </a>
              </div>
            }

            {profileInfo.isFriend === false &&
              <div className='profile-add-cancel'>
                <span href="/">
                  Aguardando solicitação...
              </span>
                <a href="/">
                  Cancelar solicitação
              </a>
              </div>
            }
          </div>
        </UserData>
      </UserInfoContainer>
      <Friends visitProfile={visitProfile} />
    </UserAccountContainer>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  profile: state.friendsInfo.friendProfile,
  socket: state.socket
})

export default connect(mapStateToProps, { updateNameUser, loadingProfile, updateDescription, friendsPendingIo })(UserInfo)
