import React from 'react'
import { ContainerImage, UserImgbackground } from './styles'

const ImageBgProfile = ({ visitProfile, imageBackground, idUserLogged, idUser }) => {
  return (
    <ContainerImage>
      {visitProfile && <div className="image-bg">
        <img src={`images/tarn-nguyen-4a52btspyY8-unsplash.jpg`} alt="" />
      </div>}

      <UserImgbackground imageBackground={imageBackground} visitProfile={visitProfile}>
        {!visitProfile && idUserLogged === idUser && <div className="edit-image">
          <i className="far fa-edit"></i>
        </div>}
      </UserImgbackground>
    </ContainerImage>
  )
}

export default ImageBgProfile
