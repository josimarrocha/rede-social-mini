import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Friends from './Friends'
import UserAccountConfig from './UserAccountConfig'
import { updateNameUser, updateDescription } from '../../reducers/userInfo/actionsCreators'
import { loadingProfile, showFriends } from '../../reducers/friends/actionsCreators'
import { showUserConfig } from '../../reducers/ui/'
import { friendsIO } from '../../config/util'
import imageUserDefault from '../../assets/images/user@150.png'
import api from '../../config/api'
import { UserAccountContainer, UserInfoContainer, UserImg, UserData } from './styles'

const UserInfo = ({ userInfo, profile, updateNameUser, visitProfile, loadingProfile, updateDescription, showFriends, isUserConfig, showUserConfig }) => {
  const [isUpdateNameUser, setIsUpdateNameUser] = useState(false)
  const [isUpdateDescription, setIsUpdateDescription] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [profileInfo, setProfileInfo] = useState({})
  const containerUserRef = useRef()

  useEffect(() => {
    setProfileInfo(profile)
    setNameInput(userInfo.username)
    return () => window.removeEventListener('scroll', scroll)
  }, [userInfo, profile])

  const scroll = () => {
    if (window.innerHeight < 700) {
      let containerUser = document.querySelector('.containerUser')
      if (window.scrollY > 100 && containerUser) {
        containerUser.style.transform = 'translateY(-20px)'
      } else if (containerUser) {
        containerUser.style.transform = 'translateY(0px)'
      }
    }
  }

  window.addEventListener('scroll', scroll)

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
    <UserAccountContainer ref={containerUserRef} className='containerUser'>
      {profileInfo.hasOwnProperty('id') &&
        <UserInfoContainer>
          {userInfo.id === profile.id &&
            <div className="menu-user-config"
              onClick={() => showUserConfig(true)}>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          }
          <UserAccountConfig
            setIsMenuConfigUser={showUserConfig}
            setIsUpdateNameUser={setIsUpdateNameUser}
            setIsUpdateDescription={setIsUpdateDescription}
            isUserConfig={isUserConfig}
          />
          <UserImg>
            <img src={userInfo.image_profile
              ? !visitProfile ? userInfo.image_profile : profileInfo.image_profile
              : imageUserDefault} alt=""
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
                  <span>
                    Aguardando solicitação...
              </span>
                  <span className='cancel' onClick={() => removeProfile(profileInfo.id)}>
                    Cancelar solicitação
              </span>
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
  isUserConfig: state.ui.showUserConfig
})

export default connect(mapStateToProps, { updateNameUser, loadingProfile, updateDescription, showFriends, showUserConfig })(UserInfo)
