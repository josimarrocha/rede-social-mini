import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Friends from './Friends'
import UserAccountConfig from './UserAccountConfig'
import ImageBgProfile from '../UserInfo/ImageBgProfile'
import { updateNameUser, updateDescription } from '../../reducers/userInfo/actionsCreators'
import { loadingProfile, showFriends } from '../../reducers/friends/actionsCreators'
import { showUserConfig } from '../../reducers/ui/'
import pathImageDefault, { friendsIO } from '../../config/util'
import api from '../../config/api'
import { UserAccountContainer, UserInfoContainer, UserImg, UserData } from './styles'

const UserInfo = ({ userInfo, profile, updateNameUser, visitProfile, loadingProfile, updateDescription, socket, showFriends, ui, showUserConfig }) => {
  const [isUpdateNameUser, setIsUpdateNameUser] = useState(false)
  const [isUpdateDescription, setIsUpdateDescription] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    setProfileInfo(profile)
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
    showFriends(id)
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
    friendsIO.emit('pendingFriends', id)
  }

  return (
    <UserAccountContainer >
      {profileInfo.hasOwnProperty('id') && <UserInfoContainer>
        {userInfo.id === profile.id &&
          <div className="menu-user-config" tabIndex={0}
            onClick={() => showUserConfig()}
            onBlur={() => showUserConfig()}>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        }
        <ImageBgProfile
          imageBackground={!visitProfile ? userInfo.image_background : profileInfo.image_background}
          idUserLogged={userInfo.id}
          idUser={profileInfo.id}
          visitProfile={false} />

        {ui.showUserConfig &&
          <UserAccountConfig
            setIsMenuConfigUser={showUserConfig}
            setIsUpdateNameUser={setIsUpdateNameUser}
            setIsUpdateDescription={setIsUpdateDescription}
          />
        }

        <UserImg>
          <img src={profileInfo.image_profile
            ? !visitProfile ? userInfo.image_profile : profileInfo.image_profile
            : `${pathImageDefault.pathImageDev}/user@150.png`} alt=""
          />
        </UserImg>
        <UserData>
          <div className="user-info-username">
            {!isUpdateNameUser ? <h3>{userInfo.id === profile.id ? userInfo.name : profileInfo.name}</h3>
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
              {profileInfo.description
                ? profileInfo.description
                : !isUpdateDescription &&
                <>
                  Nenhuma descrição
                   {userInfo.id === profile.id && <span onClick={() => setIsUpdateDescription(true)}>
                    <i className="far fa-edit"></i>Adicionar
                    </span>}
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
          <div className="user-info-email">
            {userInfo.id === profile.id && <p>{userInfo.email}</p>}
          </div>
          <div className="user-info-local">
            <p>Brasil, São Paulo, SP</p>
          </div>

          <div className='profile-status'>
            {profileInfo.isFriend === true && userInfo.id !== profile.id &&
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

            {profileInfo.isFriend === null && userInfo.id !== profile.id &&
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
      </UserInfoContainer>}
      <Friends />
    </UserAccountContainer>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  profile: state.friendsInfo.profile,
  socket: state.socket,
  ui: state.ui
})

export default connect(mapStateToProps, { updateNameUser, loadingProfile, updateDescription, showFriends, showUserConfig })(UserInfo)
