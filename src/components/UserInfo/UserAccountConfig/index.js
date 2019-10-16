import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PreviewImg from '../../PreviewImg'
import { updateImageUser } from '../../../reducers/userInfo/actionsCreators'
import { UserConfigAccount } from './styles'

const UserAccountConfig = ({ updateImageUser, setIsMenuConfigUser, setIsUpdateNameUser, setIsUpdateDescription, isUserConfig }) => {
  const [imageProfile, setImageProfile] = useState(null)
  const [isModalPreview, setIsModalPreviw] = useState(false)
  const containerUserConfigRef = useRef()
  useEffect(() => {
    if (!imageProfile) {
      setIsModalPreviw(false)
    } else {
      setIsModalPreviw(true)
    }
  }, [imageProfile])

  useEffect(() => {
    containerUserConfigRef.current && containerUserConfigRef.current.focus()
  }, [isUserConfig])
  const updateImageProfile = async () => {
    if (imageProfile) {
      const data = new FormData()
      data.append('imageProfile', imageProfile)
      updateImageUser(data)
      setIsMenuConfigUser(false)
    }
  }

  const abortImagePreview = () => {
    setIsModalPreviw(false)
    setIsMenuConfigUser(false)
    setImageProfile('')
  }

  const confirmImagePreview = () => {
    updateImageProfile()
    setIsModalPreviw(false)
    setIsMenuConfigUser()
  }

  return (
    <UserConfigAccount >
      {isModalPreview && <PreviewImg
        confirmImagePreview={confirmImagePreview}
        abortImagePreview={abortImagePreview}
        imagePreview={imageProfile}
      />}
      <input
        type="file"
        id="updateImageUser"
        onChange={({ target: { files } }) => setImageProfile(files[0])}
        hidden />
      {isUserConfig &&
        <>
          <ul tabIndex={0} onBlur={() => setIsMenuConfigUser(false)}
            ref={containerUserConfigRef}>
            <label htmlFor="updateImageUser">
              <li>Trocar foto de perfil</li>
            </label>
            <li onClick={() => { setIsUpdateNameUser(true) }}>
              Alterar nome de usuário
        </li>
            <li onClick={() => {
              setIsUpdateDescription(true)
              setIsMenuConfigUser(false)
            }}
            >Alterar descrição</li>
          </ul>
        </>
      }
    </UserConfigAccount>
  )
}

export default connect(null, { updateImageUser })(UserAccountConfig)
