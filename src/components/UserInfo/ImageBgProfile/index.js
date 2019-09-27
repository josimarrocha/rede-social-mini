import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PreviewImage from '../../PreviewImg'
import { updateImageBackground } from '../../../reducers/userInfo/actionsCreators'
import { ContainerImage, UserImgbackground } from './styles'

const ImageBgProfile = ({ visitProfile, imageBackground, idUserLogged, idUser, updateImageBackground }) => {
  const [imgBackground, setImageBackground] = useState()
  const [isModalPreviw, setIsModalPreviw] = useState(false)

  useEffect(() => {
    if (!imgBackground) {
      setIsModalPreviw(false)
    } else {
      setIsModalPreviw(true)
    }

  }, [imgBackground])

  const updateBackground = async () => {
    if (imgBackground) {
      const data = new FormData()
      data.append('imageBackgroundProfile', imgBackground)
      updateImageBackground(data)
      setImageBackground('')
      setIsModalPreviw(false)
    }
  }

  const abortImagePreview = () => {
    setIsModalPreviw(false)

  }

  return (
    <ContainerImage>
      {isModalPreviw && <PreviewImage
        imagePreview={imgBackground}
        confirmImagePreview={updateBackground}
        abortImagePreview={abortImagePreview}
      />
      }
      <input
        type="file"
        id="updateImageBackgroundUser"
        onChange={({ target: { files } }) => setImageBackground(files[0])}
        hidden />
      <UserImgbackground imageBackground={imageBackground} visitProfile={visitProfile}>
        {!visitProfile && idUserLogged === idUser &&
          <label htmlFor="updateImageBackgroundUser">
            <div className="edit-image">
              <i className="far fa-edit"></i>
            </div>
          </label>
        }
      </UserImgbackground>
    </ContainerImage>
  )
}


export default connect(null, { updateImageBackground })(ImageBgProfile)
